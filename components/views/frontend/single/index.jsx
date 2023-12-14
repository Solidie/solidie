import React, {createContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {ErrorBoundary} from 'crewhrm-materials/error-boundary.jsx';
import { __ } from "crewhrm-materials/helpers.jsx";
import { request } from "crewhrm-materials/request.jsx";

import { AppPreview } from "./previews/app.jsx";
import { ImagePreview } from "./previews/image.jsx";
import { VideoPreview } from "./previews/video.jsx";

export const ContextSingleData = createContext();

const preview_renderers = {
	app: AppPreview,
	image: ImagePreview,
	video: VideoPreview
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
				<div className={'border-1 b-color-tertiary border-radius-5 padding-15'.classNames()}>
					<a 
						href={(state.content?.releases || [])[0]?.download_url} 
						className={'button button-primary button-outlined button-full-width'.classNames()}
					>
						{__('Download')}
					</a>
				</div>
			</div>
		</div>
	</div>
}
