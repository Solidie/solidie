import React from "react";

export function VideoPreview({content={}}) {
	return <div className={'d-block'.classNames()}>
		<video 
			style={{width:'auto', maxWidth: '100%', height: 'auto', margin: 'auto'}} 
			poster={content.media?.thumbnail?.file_url}
			className={'border-radius-5'.classNames()}
			controls={true}
			preload="auto"
			loop={true}
		>
			<source src={content.media?.preview?.file_url} type={content.media?.preview?.mime_type}/>
			Your browser does not support the video tag.
		</video>
	</div>
}
