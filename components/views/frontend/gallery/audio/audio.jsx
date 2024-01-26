import React from "react";
import { AudioPlayer } from "solidie-materials/audio-player/audio-player.jsx";

export function Audio({contents=[]}) {
	return <div>
		{contents.map(content=>{
			const {content_id} = content;

			return <div key={content_id} className={'margin-bottom-15'.classNames()}>
				<AudioPlayer 
					src={content.media?.preview?.file_url} 
					permalink={content.content_permalink}
					title={content.content_title}
					thumbnail={content.media.thumbnail?.file_url}/>
			</div>
		})}
	</div>
}