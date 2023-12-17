import React from "react";

export function ImagePreview({content}) {
	return <div className={'d-block'.classNames()}>
		<img 
			style={{width:'auto', maxWidth: '100%', height: 'auto', margin: 'auto'}} 
			src={content.media?.thumbnail?.file_url}
			className={'d-block border-radius-5'.classNames()}/>
	</div>
}
