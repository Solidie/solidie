import React from "react";

function LikeDislike() {

	
	return <div className={'d-flex align-items-center column-gap-10'.classNames()}>
		<span>23 <i className={'ch-icon ch-icon-thumbs-o-up'.classNames()}></i></span>

	</div>
}

function Rating() {

}

export function MetaData({content={}}) {
	
	const {contributor, reactions={}} = content;

	return <div className={'d-flex align-items-center flex-wrap-wrap flex-direction-row column-gap-20 row-gap-10'.classNames()}>
		<div className={'flex-1'.classNames()}>
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
		</div>
		
		<div className={'d-flex align-items-center'.classNames()}>
			{
				! reactions.like ?null : 
				<div>
					<LikeDislike content={content}/>
				</div>
			}

			{
				(!reactions.rating || reactions.like) ? null : 
				<div>
					<Rating content={content}/>
				</div>
			}
		</div>
	</div>
}