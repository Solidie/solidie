import React from 'react';

export function GenericPreview({content={}, settings={}}){

	const {thumbnail=true} = settings;

	return !thumbnail ? null : <div className={"width-p-100 height-p-100 color-text-50 d-flex justify-content-center margin-bottom-15".classNames()}>
		<img 
			style={{width:'auto', maxWidth: '100%', height: 'auto', maxHeight: '400px', margin: 'auto'}} 
			src={content.media?.thumbnail?.file_url}
			className={'d-block border-radius-5'.classNames()}/>
	</div>
}
