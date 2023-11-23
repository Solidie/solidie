import React, {createContext, useEffect, useState} from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import {ErrorBoundary} from 'crewhrm-materials/error-boundary.jsx';
import { data_pointer } from "crewhrm-materials/helpers.jsx";

import { AppPreview } from "./app/index.jsx";

export const ContextSingleData = createContext();

const preview_renderers = {
	app: AppPreview
}

const _content = {
	content_id: 1,
	thumbnail_url :  "http://localhost:10008/wp-content/uploads/2023/10/pexels-riccardo-bertolo-4245826-scaled.jpg",
	content_title :  "Beautiful Sunset",
	like_count :  150,
	comment_count :  25,
	uploader_name :  "JohnDoe123",
	mime_type: 'image/jpeg',
	content_type: 'app',
	uploader_avatar_url :  "https://example.com/profile_pic1.jpg"
}

function SingleWrapper() {
	const {content_slug} = useParams();

	const [state, setState] = useState({
		fetching: false,
		content: _content
	});

	const getContent=()=>{
		
	}

	useEffect(()=>{

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

export function SingleContent() {
	const {settings={}, home_path} = window[data_pointer];
	const {contents={}} = settings;

	return <BrowserRouter>
		<Routes>
			{
				Object.keys(contents).map(type=>{
					let {slug} = contents[type];
					return <Route key={slug} path={home_path+':content_type/:content_slug/'} element={<SingleWrapper/>}/>
				})
			}
		</Routes>
	</BrowserRouter>
}
