import React, {createContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {ErrorBoundary} from 'crewhrm-materials/error-boundary.jsx';
import { __ } from "crewhrm-materials/helpers.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { applyFilters } from "crewhrm-materials/hooks.jsx";
import { RenderExternal } from "crewhrm-materials/render-external.jsx";
import { InitState } from "crewhrm-materials/init-state.jsx";
import { DangerouslySet } from "crewhrm-materials/dangerously-set.jsx";
import { RenderMedia } from "crewhrm-materials/render-media/render-media.jsx";

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
	const {content, free_content_plan_label, free_content_plan_description} = props;
	return <div className={'border-1 b-color-tertiary border-radius-5 padding-horizontal-15 padding-vertical-20'.classNames()}>
		<strong className={'d-block font-size-15 color-text font-weight-500 margin-bottom-15'.classNames()}>
			{free_content_plan_label}
		</strong>
		<span className={'d-block'.classNames()}>
			{free_content_plan_description}
		</span>
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
			const {
				success, 
				data:{
					content, 
					free_content_plan_label,
					free_content_plan_description,
					message=__('Something went wrong')
				}
			} = resp;

			setState({
				...state,
				free_content_plan_label,
				free_content_plan_description,
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

	const {sample_images=[]} = state.content?.media || {};
	
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
					<DangerouslySet>
						{state.content?.content_description || ''}
					</DangerouslySet>
				</div>

				{
					!sample_images.length ? null : 
					<div>
						<strong className={'d-block font-size-18 font-weight-500'.classNames()}>
							{__('Samples')}:
						</strong>
						<RenderMedia media={sample_images}/>
					</div>
				}
			</div>
			
			<div style={{width: '300px'}}>
				<RenderExternal 
					component={applyFilters('free_download_button', FreeDownlod, state.content)}
					payload={{
						content: state.content, 
						free_content_plan_label: state.free_content_plan_label,
						free_content_plan_description: state.free_content_plan_description
					}}/>
			</div>
		</div>
	</div>
}
