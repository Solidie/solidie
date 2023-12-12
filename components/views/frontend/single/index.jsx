import React, {createContext, useEffect, useState} from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import {ErrorBoundary} from 'crewhrm-materials/error-boundary.jsx';
import { __, data_pointer } from "crewhrm-materials/helpers.jsx";
import { request } from "crewhrm-materials/request.jsx";

import { AppPreview } from "./app/index.jsx";

export const ContextSingleData = createContext();

const preview_renderers = {
	app: AppPreview
}

export function SingleWrapper() {
	const {content_slug} = useParams();

	const [state, setState] = useState({
		fetching: false,
		content: null,
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
				content: success ? content : null,
				error_message: success ? null : message
			});
		});
	}

	useEffect(()=>{
		getContent();
	}, [content_slug]);

	const PreviewComp = preview_renderers[state.content?.content_type];

	return <div>
		<strong className={'d-block font-size-25 color-text'.classNames()}>
			{state.content.content_title}
		</strong>
		<div className={'d-flex column-gap-15'.classNames()}>
			<div className={'flex-1'.classNames()}>
				{
					PreviewComp ? 
						<ErrorBoundary>
							<PreviewComp content={state.content}/>
						</ErrorBoundary> :
						<>Something went wrong</>
				}
			</div>
			<div style={{width: '300px'}}>
				Plans here
			</div>
		</div>
	</div>
}
