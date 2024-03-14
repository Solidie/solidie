import React from "react";

import { AudioPlayer } from "crewhrm-materials/audio-player/audio-player.jsx";
import { MetaData } from "../../single/meta-data/meta-data";

export function Audio({contents=[]}) {
	return <div>
		{contents.map(content=>{
			const {content_id} = content;

			return <div key={content_id} className={'margin-bottom-15'.classNames()}>
				<AudioPlayer 
					src={content.media?.preview?.file_url} 
					permalink={content.content_permalink}
					title={content.content_title}
					thumbnail={content.media.thumbnail?.file_url}
				>
					<MetaData 
						content={content} 
						is_overlayer={true}
					/>
				</AudioPlayer>
			</div>
		})}
	</div>
}