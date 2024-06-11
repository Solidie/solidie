import React, { useContext, useEffect, useState } from "react";

import { data_pointer, __, sprintf, formatDateTime } from "crewhrm-materials/helpers.jsx";
import { TextField } from "crewhrm-materials//text-field/text-field.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { Options } from "crewhrm-materials/dropdown/dropdown.jsx";

import style from './comment.module.scss';

const {readonly_mode} = window[data_pointer];

export function Comments({content={}}) {

	const {content_id, reactions: {comment_count}={}} = content;
	const {ajaxToast} = useContext(ContextToast);
	
	const {
		user:{id: user_id},
		permalinks:{home_url}
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

		if ( readonly_mode ) {
			return;
		}

		switch( action ) {
			
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
			onClick={()=>setState({
				...state, 
				show_in_mobile: !state.show_in_mobile
			})}
		>
			{comment_count>1 ? sprintf(__('%s Comments'), comment_count) : sprintf(__('%s Comment'), comment_count)}
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
					<div className={'margin-bottom-15'.classNames()}>
						<TextField 
							type='textarea' 
							placeholder={__("Write your comment")} 
							onChange={new_comment=>setState({...state, new_comment})}
							disabled={state.fetching || state.submitting}
							value={state.new_comment}
						/>
					</div>
					
					<div>
						<button 
							className={'button button-primary button-small'.classNames()}
							onClick={submitComment}
							disabled={readonly_mode || state.fetching || state.submitting || ! /\S+/.test(state.new_comment || '')}
						>
							{__('Submit')} <LoadingIcon show={state.submitting}/>
						</button>
					</div>
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
							<div className={'d-flex align-items-center column-gap-15 margin-bottom-8'.classNames()}>
								<div>
									<img 
										src={avatar_url} 
										style={{
											width: '50px', 
											height: '50px', 
											borderRadius: '50%'
										}}
									/>
								</div>
								<div className={'flex-1'.classNames()}>
									<strong className={'d-block font-weight-600 font-size-18 color-text-80'.classNames()}>
										{display_name}
									</strong>
									<span className={'d-block font-weight-600 font-size-14 color-text-50'.classNames()}>
										{formatDateTime(comment_date)}
									</span>
								</div>
							</div>
							<div dangerouslySetInnerHTML={{__html: comment_content}}></div>
						</div>

						{
							!comment_actions.length ? null :
							<div className={'action-dots'.classNames(style)}>
								<Options
									onClick={(action) => onActionClick(action, comment_id)}
									options={comment_actions}
								>
									<i
										className={'ch-icon ch-icon-more color-text-50 font-size-20 cursor-pointer d-inline-block'.classNames()}
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
						{__('Load More..')} <LoadingIcon show={state.fetching}/>
					</span>
				</div>
			}
		</div>
	</div>
}
