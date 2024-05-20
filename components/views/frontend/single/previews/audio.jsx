import React from "react";

import { AudioPlayer, AudioPlayersWrapper } from "crewhrm-materials/audio-player/audio-player.jsx";

export function AudioPreview({content={}}) {
	return <AudioPlayersWrapper>
		<div>
			<AudioPlayer
				id={content.content_id}
				src={content.media?.preview?.file_url} 
				title={content.content_title}
				thumbnail={content.media.thumbnail?.file_url}
				height={80}/>
		</div>
	</AudioPlayersWrapper> 
}
