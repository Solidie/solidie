import React, { useContext, useEffect, useState } from 'react';

import { request } from 'solidie-materials/request.jsx';
import { __, data_pointer, isEmpty } from 'solidie-materials/helpers.jsx';
import { ContextToast } from 'solidie-materials/toast/toast.jsx';
import { LoadingIcon } from 'solidie-materials/loading-icon/loading-icon.jsx';

import * as style from './selection.module.scss';

import icon_audio from '../../../../images/content-icons/audio.svg';
import icon_video from '../../../../images/content-icons/video.svg';
import icon_image from '../../../../images/content-icons/image.svg';
import icon_app from '../../../../images/content-icons/app.svg';
import icon_3d from '../../../../images/content-icons/3d.svg';
import icon_font from '../../../../images/content-icons/font.svg';
import icon_tutorial from '../../../../images/content-icons/tutorial.svg';
import icon_document from '../../../../images/content-icons/document.svg';
import icon_classified from '../../../../images/content-icons/classified.svg';

const content_icons = {
	audio      : icon_audio,
	video      : icon_video,
	image      : icon_image,
	app        : icon_app,
	'3d'       : icon_3d,
	font       : icon_font,
	tutorial   : icon_tutorial,
	document   : icon_document,
	classified : icon_classified
}


export function Initial({contents: _contents}) {

	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		selected_types: [],
		saving: false
	});

	const toggleSelection=(type)=>{

		const {selected_types=[]} = state;
		const index = selected_types.indexOf(type);
		
		setState({
			...state,
			selected_types: index > -1 ? selected_types.filter(t=>t!==type) : [type, ...selected_types]
		});
	}

	const submit=()=>{

		setState({
			...state,
			saving: true
		});

		request('enableInitialContentType', {content_types: state.selected_types}, resp=>{
			
			if ( resp.success ) {
				window.location.reload();
				return;
			}

			setState({...state, saving: false});
			ajaxToast(resp);
		});
	}

	return <div className={'padding-vertical-40 padding-horizontal-15'.classNames()}>
		<span className={'d-block margin-bottom-10 font-size-18 font-weight-500 color-text'.classNames()}>
			{__('What would you like to showcase?')}
		</span>
		<span className={'d-block font-size-12 color-text-60 margin-bottom-15'.classNames()}>
			You can always configure it in <a 
				target="_blank" 
				href={window[data_pointer]?.permalinks?.settings} >
					settings
			</a>.
		</span>
		
		<div className={'selection'.classNames(style)}>
			{
				Object.keys(_contents).map(type=>{
					return <div key={type} onClick={()=>toggleSelection(type)} className={`${state.selected_types.indexOf(type)>-1 ? 'selected' : ''}`.classNames(style)}>
						<img src={content_icons[type]}/>
						<span>{_contents[type].label}</span>
					</div>
				})
			}
		</div>
		
		<div className={'text-align-right margin-top-20'.classNames()}>
			<button
				className={'button button-primary'.classNames()}
				target='_blank'
				disabled={isEmpty(state.selected_types) || state.saving}
				onClick={submit}
			>
				{__('Start')} <LoadingIcon show={state.saving}/>
			</button>
		</div>
	</div>
}
