import React from 'react';

export function GenericPreview({content={}}){
	const {media={}} = content;
	return <div className={"width-p-100 height-p-100 text-tertiary flex justify-center".classNames()}>
		<img 
			style={{width:'auto', maxWidth: '100%', height: 'auto', margin: 'auto'}} 
			src={content.media?.thumbnail?.file_url}
			className={'d-block border-radius-5'.classNames()}/>
	</div>
}
