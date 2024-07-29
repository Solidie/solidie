import React from "react";

import { AudioPlayer, AudioPlayersWrapper } from "solidie-materials/audio-player/audio-player.jsx";
import { MetaData } from "../../single/meta-data/meta-data.jsx";

export function Audio({contents=[]}) {
	return <AudioPlayersWrapper>
		{contents.map(content=>{
			const {content_id} = content;

			return <div key={content_id} className={'margin-bottom-15'.classNames()}>
				<AudioPlayer 
					id={content.content_id}
					src={content.media?.preview?.file_url} 
					permalink={content.content_permalink}
					title={content.content_title}
					thumbnail={content.media.thumbnail?.file_url}
				>
					<div>
						<MetaData 
							content={content} 
							is_overlayer={true}
							show_price_download={true}
						/>
					</div>
				</AudioPlayer>
			</div>
		})}
	</AudioPlayersWrapper>
}
