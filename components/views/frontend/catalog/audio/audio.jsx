import React from "react";
import { AudioPlayer } from "../../../../materials/audio-player/audio-player.jsx";

export function Audio({contents=[]}) {
	return <div>
		{contents.map(content=>{
			const {content_id} = content;

			return <div key={content_id} className={'margin-bottom-15'.classNames()}>
				<AudioPlayer />
			</div>
		})}
	</div>
}