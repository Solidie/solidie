import React from "react";

import { AudioPlayer, AudioPlayersWrapper } from "solidie-materials/audio-player/audio-player.jsx";
import { MetaData } from "../../single/meta-data/meta-data.jsx";

export function Audio({contents=[]}) {
	return <AudioPlayersWrapper>
		{contents.map(content=>{

			const {
				content_id, 
				content_title, 
				content_permalink,
				media={}
			} = content;

			return <div key={content_id} className={'margin-bottom-15'.classNames()}>
				<AudioPlayer 
					id={content_id}
					src={media?.preview?.file_url} 
					permalink={content_permalink}
					title={content_title}
					thumbnail={media?.thumbnail?.file_url}
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
