import React, { useState, useContext } from "react";
import { Rating as RatingComp } from 'react-simple-star-rating'

import {request} from 'crewhrm-materials/request.jsx';
import {ContextToast} from 'crewhrm-materials/toast/toast.jsx';
import { __, data_pointer } from "crewhrm-materials/helpers.jsx";
import { ShareModal } from "crewhrm-materials/share-modal.jsx";

import style from './meta.module.scss';
import { ContextGallery } from "../../gallery";

const {user:{id: is_logged_in}, readonly_mode} = window[data_pointer];
const readonly = !is_logged_in || readonly_mode;

function LikeDislike({content={}, applyReaction, is_overlayer}) {

	const {reactions={}} = content;
	const {my_reaction=null, like_count, dislike_count} = reactions.like;

	const liked    = my_reaction===1;
	const disliked = my_reaction===0;

	const color_class = is_overlayer ? 'color-white' : 'color-text-light';

	return <div className={'d-flex align-items-center column-gap-8'.classNames() + `like-wrapper ${is_overlayer ? 'white' : ''}`.classNames(style)}>
		<span>
			<span className={`${color_class}`.classNames()}>
				{like_count || 0}
			</span> 
			&nbsp;
			<i 
				className={`ch-icon ${liked ? 'ch-icon-thumbs-up color-secondary' : `ch-icon-thumbs-o-up ${color_class}`} font-size-14 cursor-pointer`.classNames()}
				onClick={()=>applyReaction(liked ? -1 : 1)}
			></i>
		</span>

		{
			(dislike_count===null || dislike_count===undefined) ? null :
			<>
				<span 
					className={`${color_class}`.classNames()} 
					style={{fontSize: '9px'}}
				>
					|
				</span>
				<span>
					<i 
						className={`ch-icon ${disliked ? 'ch-icon-thumbs-down color-secondary' : 'ch-icon-thumbs-o-down color-text-light'} font-size-14 cursor-pointer`.classNames()}
						onClick={()=>applyReaction(disliked ? -1 : 0)}
					></i>&nbsp;
					<span className={`${color_class}`.classNames()}>
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

export function MetaData({content={}, is_overlayer, updateReactions}) {
	
	const gallery_context = useContext(ContextGallery);
	const {updateContentReactions} = gallery_context || {};
	
	const {contributor, reactions={}, content_id} = content;
	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		submiting: false
	});

	const [showSharer, setShowSharer] = useState(false);

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

				if (updateReactions) {
					updateReactions(reactions);
				}

				if ( updateContentReactions ) {
					updateContentReactions(content_id, reactions);
				}
			}

			setState({
				...state,
				submiting: false
			});
		});
	}

	return <div 
		className={
			'd-flex align-items-center flex-wrap-wrap flex-direction-row row-gap-10 column-gap-15 white-space-nowrap'.classNames()
		}
		 
		onClick={e=>{
			e.preventDefault();
			e.stopPropagation();
		}}
	>
		{
			(is_overlayer || !contributor) ? null :
			<div className={'d-inline-flex align-items-center column-gap-10'.classNames()}>
				<img 
					src={contributor.avatar_url} 
					style={{width: '22px', height: '22px', borderRadius: '50%'}}
				/>
				<span className={`font-size-14 ${is_overlayer ? 'color-white text-shadow-thin' : 'color-text-light'}`.classNames()}>
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
					is_overlayer={is_overlayer}
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

		{
			isNaN(reactions.comment_count) ? null :
			<div className={`${is_overlayer ? 'color-white text-shadow-thin' : 'color-text'}`.classNames()}>
				<i 
					className={`ch-icon ch-icon-message font-size-14 cursor-pointer ${is_overlayer ? 'color-white color-hover-tertiary' : 'color-text color-hover-text-light'}`.classNames()}
				></i>
				&nbsp;
				{reactions.comment_count}
			</div>
		}

		{
			is_overlayer ? null :
			<div>
				{!showSharer ? null : <ShareModal url={content.content_permalink} closeModal={()=>setShowSharer(false)}/>}
				<i 
					className={`ch-icon ch-icon-share1 font-size-14 cursor-pointer ${is_overlayer ? 'color-white color-hover-tertiary text-shadow-thin' : 'color-text color-hover-text-light'}`.classNames()}
					onClick={()=>setShowSharer(true)}
				></i>
			</div>
		}

		{
			!window[data_pointer].is_pro_active ? null :
			<div>
				<i 
					title={__('Save for later')}
					className={`ch-icon ${content.reactions?.wishlisted ? 'ch-icon-minus-cirlce' : 'ch-icon-add-circle'} font-size-14 cursor-pointer ${is_overlayer ? 'color-white color-hover-tertiary text-shadow-thin' : 'color-text color-hover-text-light'}`.classNames()}
					onClick={()=>applyReaction(content.reactions?.wishlisted ? -1 : 1, 'wishlist')}
				></i>
			</div>
		}
	</div>
}
