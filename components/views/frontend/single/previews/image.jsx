import React from "react";

export function ImagePreview({content}) {
	
	const {file_id, file_url} = content.media?.thumbnail || {};

	return (!file_id || !file_url) ? null : <div className={'d-block'.classNames()}>
		<img 
			style={{width:'auto', maxWidth: '100%', height: 'auto', margin: 'auto'}} 
			src={content.media?.thumbnail?.file_url}
			className={'d-block border-radius-5'.classNames()}/>
	</div>
}
