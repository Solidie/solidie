import React from "react";

import { AudioPlayer, AudioPlayersWrapper } from "solidie-materials/audio-player/audio-player.jsx";

import { MetaData } from "../../single/meta-data/meta-data.jsx";
import { ContentTags } from "../generic-data.jsx";

export function Audio({contents=[]}) {
	return <AudioPlayersWrapper>
		{contents.map(content=>{

			const {
				content_id, 
				content_title, 
				content_permalink,
				media={},
				meta: {
					content_tags=''
				}
			} = content;

			return <div key={content_id} className={'margin-bottom-15'.classNames()}>
				<AudioPlayer 
					id={content_id}
					src={media?.preview?.file_url} 
					permalink={content_permalink}
					title={content_title}
					thumbnail={media?.thumbnail?.file_url}
					footer={<ContentTags tags={content_tags} is_overlayer={true}/>}
				>
					<div className={'d-flex flex-direction-column align-items-flex-end row-gap-10'.classNames()}>
						<div>
							<MetaData 
								content={content} 
								is_overlayer={true}
								show={['price', 'reaction']}
							/>
						</div>
					</div>
				</AudioPlayer>
			</div>
		})}
	</AudioPlayersWrapper>
}
