import React from "react";
import { AudioPlayer } from "../../../../materials/audio-player/audio-player.jsx";

export function AudioPreview({content={}}) {
	return <div>
		<AudioPlayer
			src={content.media?.preview?.file_url} 
			title={content.content_title}
			thumbnail={content.media.thumbnail?.file_url}
			height={80}/>
	</div>
}
