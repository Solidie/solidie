import React, { useState, useContext } from "react";
import { Rating as RatingComp } from 'react-simple-star-rating'

import {request} from 'crewhrm-materials/request.jsx';
import {ContextToast} from 'crewhrm-materials/toast/toast.jsx';
import { data_pointer } from "crewhrm-materials/helpers.jsx";
import { ShareModal } from "crewhrm-materials/share-modal.jsx";

import style from './meta.module.scss';

const {user:{id: is_logged_in}, readonly_mode} = window[data_pointer];
const readonly = !is_logged_in || readonly_mode;

function LikeDislike({content={}, applyReaction}) {

	const {reactions={}} = content;
	const {my_reaction=null, like_count, dislike_count} = reactions.like;

	const liked    = my_reaction===1;
	const disliked = my_reaction===0;

	return <div className={'d-flex align-items-center column-gap-8'.classNames() + 'like-wrapper'.classNames(style)}>
		<span>
			<span className={'color-text-light'.classNames()}>{like_count || 0}</span>&nbsp;
			<i 
				className={`ch-icon ${liked ? 'ch-icon-thumbs-up color-secondary' : 'ch-icon-thumbs-o-up color-text-light'} font-size-14 cursor-pointer`.classNames()}
				onClick={()=>applyReaction(liked ? -1 : 1)}
			></i>
		</span>

		{
			(dislike_count===null || dislike_count===undefined) ? null :
			<>
				<span className={'color-text-light'.classNames()} style={{fontSize: '9px'}}>|</span>
				<span>
					<i 
						className={`ch-icon ${disliked ? 'ch-icon-thumbs-down color-secondary' : 'ch-icon-thumbs-o-down color-text-light'} font-size-14 cursor-pointer`.classNames()}
						onClick={()=>applyReaction(disliked ? -1 : 0)}
					></i>&nbsp;
					<span className={'color-text-light'.classNames()}>
						{dislike_count}
					</span>
				</span>
			</>
		}
	</div>
}

function Rating({content={}, applyReaction}) {

	const {reactions:{rating={}}} = content;
	const {my_reaction=0, average=0, rating_count} = rating;

	return <div className={'d-flex align-items-center'.classNames()}>
		<RatingComp
			initialValue={my_reaction || average}
			onClick={applyReaction}
			readonly={readonly}
			size={19}
			fillColor={my_reaction ? window[data_pointer].colors.secondary : undefined}
			style={{height: '25px'}}
		/>&nbsp;
		{
			!rating_count ? null :
			<span className={'font-size-14 color-text-light'.classNames()}>
				({average}/{rating_count})
			</span>
		}
	</div>
}

function Sharer({content:{content_permalink}}) {
	
	const [show, setShow] = useState(false);

	return <div>
		{!show ? null : <ShareModal url={content_permalink} closeModal={()=>setShow(false)}/>}
		<i 
			className={`ch-icon ch-icon-share1 color-text-light font-size-14 cursor-pointer`.classNames()}
			onClick={()=>setShow(true)}
		></i>
	</div>
}

export function MetaData({content={}, updateReactions}) {
	
	const {contributor, reactions={}, content_id} = content;
	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		submiting: false
	});

	const applyReaction=(reaction, reaction_type)=>{
		if ( state.submiting || readonly ) {
			return;
		}

		setState({
			...state,
			submiting: true
		});

		request('reactToContent', {content_id, reaction, reaction_type}, resp=>{
			const {success, data:{reactions={}}} = resp;

			if ( ! success ) {
				ajaxToast(resp);
			} else {
				updateReactions(reactions);
			}

			setState({
				...state,
				submiting: false
			});
		});
	}

	return <div 
		className={
			'd-flex align-items-center flex-wrap-wrap flex-direction-row row-gap-10 column-gap-15'.classNames()
		}
	>
		{
			!contributor ? null :
			<div className={'d-inline-flex align-items-center column-gap-10'.classNames()}>
				<img 
					src={contributor.avatar_url} 
					style={{width: '22px', height: '22px', borderRadius: '50%'}}
				/>
				<span className={'font-size-14 color-text-light'.classNames()}>
					{contributor.display_name}
				</span>
			</div>
		}
		
		{
			! reactions.like ? null : 
			<div>
				<LikeDislike 
					content={content} 
					applyReaction={v=>applyReaction(v, 'like')}
					submiting={state.submiting}
				/>
			</div>
		}

		{
			!reactions.rating ? null : 
			<div>
				<Rating 
					content={content}
					applyReaction={v=>applyReaction(v, 'rating')}
					submiting={state.submiting}
				/>
			</div>
		}

		<div>
			{<Sharer content={content}/>}
		</div>
	</div>
}