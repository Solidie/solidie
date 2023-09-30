import React from "react";
import { AudioPlayer } from "../../../../materials/audio-player/audio-player.jsx";

export function AudioCatalog({contents=[]}) {
	return <div>
		{contents.map(content=>{
			const {content_id} = content;

			return <div key={content_id} className={'d-flex align-items-center box-shadow-thin'.classNames()}>
				<AudioPlayer className={'flex-1'.classNames()}/>
				<div className={'d-flex align-items-center'.classNames()}>
					Cart
				</div>
			</div>
		})}
	</div>
}
