import React, { useContext, useEffect, useState } from "react";

import { data_pointer, __ } from "crewhrm-materials/helpers.jsx";
import { DangerouslySet } from "crewhrm-materials/dangerously-set.jsx";
import { TextField } from "crewhrm-materials//text-field/text-field.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { Options } from "crewhrm-materials/dropdown/dropdown.jsx";

import style from './comment.module.scss';

export function Comments({content_id}) {

	const {ajaxToast} = useContext(ContextToast);
	
	const {
		user:{id: user_id},
		home_url
	} = window[data_pointer];

	const [state, setState] = useState({
		fetching: false,
		submitting: false,
		new_comment: '',
		show_load_more: true,
		comments: [],
		show_in_mobile: false
	});

	const submitComment=()=>{

		setState({
			...state,
			submitting: true
		});

		request('createUpdateComment', {comment_content: state.new_comment, content_id}, resp=>{
			
			const {success, data:{comment}} = resp;

			const _success = success && comment;

			setState({
				...state,
				submitting: false,
				new_comment: _success ? '' : state.new_comment,
				comments: _success ? mergeComments([{...comment, highlight: true}], true) : state.comments
			});

			if ( ! _success ) {
				ajaxToast(resp);
			}
		});
	}

	const mergeComments=(new_comments, at_first=false)=>{

		const comments = [...state.comments];

		for ( let i=0; i<new_comments.length; i++ ) {
			const new_comment = new_comments[i];
			const index = comments.findIndex(c=>c.comment_id==new_comment.comment_id);

			if ( index > -1 ) {
				comments[index] = {...comments[index], ...new_comment}
			} else {
				comments[at_first ? 'unshift' : 'push'](new_comment);
			}
		}

		return comments;
	}

	const fetchComments=()=>{

		// Avoid if another fetching is in progress
		if ( state.fetching ) {
			return;
		}

		const payload = {
			content_id, 
			last_id: state.comments[state.comments.length - 1]?.comment_id || 0
		}

		setState({
			...state,
			fetching: true
		});

		request('fetchComments', payload, resp=>{
			
			const {data:{comments=[]}} = resp;

			setState({
				...state,
				comments: mergeComments(comments),
				fetching: false,
				show_load_more: comments.length>0
			});
		});
	}

	const onActionClick=(action, comment_id)=>{

		switch( action ) {
			
			case 'edit' :
				
				break;

			case 'delete' :
				if ( ! window.confirm(__('Sure to delete the comment?')) ) {
					return;
				}

				request('deleteComment', {comment_id}, resp=>{
					
					ajaxToast(resp);

					if ( resp.success ) {
						setState({
							...state,
							comments: state.comments.filter(c=>c.comment_id!=comment_id)
						});
					}
				});
				break;
		}
	}

	useEffect(()=>{
		fetchComments();
	}, []);
	
	return <div className={`comments-wrapper ${state.show_in_mobile ? 'show-in-mobile' : ''}`.classNames(style)}> 
		<strong 
			className={'d-flex align-items-center column-gap-8 padding-vertical-15 margin-top-10'.classNames() + 'comments-control'.classNames(style)}
			onClick={()=>setState({...state, show_in_mobile: !state.show_in_mobile})}
		>
			{__('Comments')}
			<i className={'ch-icon ch-icon-arrow-right'.classNames() + 'commnents-arrow'.classNames(style)}></i>
		</strong>
		<div className={`comments`.classNames(style)}>
			{
				!user_id ? <div className={"comment-box".classNames(style)}>
					<a href={`${home_url}/my-account/?redirect_to=${window.location.href}`}>
						{__('Log in to comment')}
					</a>
				</div>
				:
				<div className={"comment-box".classNames(style)}>
					<TextField 
						type='textarea' 
						placeholder={__("Write your comment")} 
						onChange={new_comment=>setState({...state, new_comment})}
						disabled={state.fetching || state.submitting}
						value={state.new_comment}
					/>
						
					<button 
						className={'button button-primary button-small'.classNames()}
						onClick={submitComment}
						disabled={state.fetching || state.submitting || ! /\S+/.test(state.new_comment || '')}
					>
						{__('Submit')} <LoadingIcon show={state.submitting}/>
					</button>
				</div>
			}
			
			{
				state.comments.map(comment=>{
					
					const {
						comment_id, 
						user_id: commenter_id,
						comment_content, 
						avatar_url, 
						display_name, 
						comment_date, 
						highlight
					} = comment;


					const comment_actions = [
						/* {
							id: 'edit', 
							label: __('Edit'),
							show: user_id == commenter_id
						}, */
						{
							id: 'delete', 
							label: __('Delete'),
							show: user_id == commenter_id
						}
					].filter(a=>a.show ? true : false);


					return <div 
						key={comment_id} 
						className={`comment ${highlight ? 'highlight' : ''}`.classNames(style) + 'd-flex'.classNames()}
					>
						<div className={'flex-1'.classNames()}>
							<div className={"commenter".classNames(style)}>
								<div className={"avatar".classNames(style)}>
									<img src={avatar_url}/>
								</div>
								<div className={"name-date".classNames(style)}>
									<strong>
										{display_name}
									</strong>
									<span>
										{comment_date}
									</span>
								</div>
							</div>
							<div>
								<DangerouslySet>
									{comment_content}
								</DangerouslySet>
							</div>
						</div>

						{
							!comment_actions.length ? null :
							<div className={'action-dots'.classNames(style)}>
								<Options
									onClick={(action) => onActionClick(action, comment_id)}
									options={comment_actions}
								>
									<i
										className={'ch-icon ch-icon-more color-text-light font-size-20 cursor-pointer d-inline-block'.classNames()}
									></i>
								</Options>
							</div>
						}
					</div>
				})
			}

			{
				!state.show_load_more ? null :
				<div className={'text-align-center padding-vertical-20'.classNames()}>
					<span 
						className={'cursor-pointer hover-underline'.classNames()}
						onClick={fetchComments}
					>
						{__('More Comments')} <LoadingIcon show={state.fetching}/>
					</span>
				</div>
			}
		</div>
	</div>
}
