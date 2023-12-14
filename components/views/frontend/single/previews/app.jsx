import React from 'react';

export function AppPreview({content}){
	return <div className={"width-p-100 height-p-100 text-tertiary flex justify-center".classNames()}>
		<img src={content.thumbnail_url} className={'d-block width-auto height-auto margin-auto'.classNames()}/>
	</div>
}
