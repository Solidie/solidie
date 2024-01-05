import React, {createContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {ErrorBoundary} from 'crewhrm-materials/error-boundary.jsx';
import { __ } from "crewhrm-materials/helpers.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { applyFilters } from "crewhrm-materials/hooks.jsx";
import { RenderExternal } from "crewhrm-materials/render-external.jsx";
import { InitState } from "crewhrm-materials/init-state.jsx";

import { GenericPreview } from "./previews/generic.jsx";
import { ImagePreview } from "./previews/image.jsx";
import { VideoPreview } from "./previews/video.jsx";
import { AudioPreview } from "./previews/audio.jsx";

export const ContextSingleData = createContext();

const preview_renderers = {
	app: GenericPreview,
	image: ImagePreview,
	video: VideoPreview,
	audio: AudioPreview,
}

function FreeDownlod( props ) {
	const {content} = props;
	return <div className={'border-1 b-color-tertiary border-radius-5 padding-15'.classNames()}>
		<a 
			href={(content?.releases || [])[0]?.download_url} 
			className={'button button-primary button-outlined button-full-width'.classNames()}
		>
			{__('Download')}
		</a>
	</div>
}

export function SingleWrapper() {
	const {content_slug} = useParams();

	const [state, setState] = useState({
		fetching: false,
		content: {},
		error_message: null
	});

	const getContent=()=>{

		setState({
			...state, 
			fetching: true
		});

		request('getSingleContent', {content_slug}, resp=>{
			const {success, data:{content, message=__('Something went wrong')}} = resp;

			setState({
				...state,
				content: success ? content : {},
				error_message: success ? null : message
			});
		});
	}

	useEffect(()=>{
		getContent();
	}, [content_slug]);

	const PreviewComp = preview_renderers[state.content?.content_type];

    if ( state.fetching || state.error_message ) {
        return <InitState 
				fetching={state.fetching} 
				error_message={state.error_message} />

    }
	
	return <div>
		<div>
			<strong className={'d-block font-size-24 color-text'.classNames()}>
				{state.content.content_title}
			</strong>
		</div>
		
		<div className={'d-flex column-gap-15'.classNames()}>
			<div className={'flex-1'.classNames()}>
				<div>
					{
						PreviewComp ? 
							<ErrorBoundary>
								<PreviewComp content={state.content}/>
							</ErrorBoundary> : null
					}
				</div>
				<div>
					{state.content?.content_description}
				</div>
			</div>
			
			<div style={{width: '300px'}}>
				<RenderExternal 
					component={applyFilters('free_download_button', FreeDownlod, state.content)}
					payload={{content: state.content}}/>
			</div>
		</div>
	</div>
}
