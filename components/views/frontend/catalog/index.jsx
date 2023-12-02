import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";

import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { __, data_pointer } from "crewhrm-materials/helpers.jsx";
import { Conditional } from "crewhrm-materials/conditional.jsx";
import { RadioCheckbox } from "crewhrm-materials/radio-checkbox.jsx";
import { ErrorBoundary } from "crewhrm-materials/error-boundary.jsx";

import { Image } from "./image/image.jsx";
import { Video } from "./video/video.jsx";
import { Audio } from "./audio/audio.jsx";

import style from './index.module.scss';
import { GenericCard } from "./generic-card/generic-card.jsx";

const _image = {
	content_id: 1,
	thumbnail_url :  "http://localhost:10008/wp-content/uploads/2023/10/pexels-riccardo-bertolo-4245826-scaled.jpg",
	content_title :  "Beautiful Sunset",
	like_count :  150,
	comment_count :  25,
	uploader_name :  "JohnDoe123",
	mime_type: 'image/jpeg',
	uploader_avatar_url :  "https://example.com/profile_pic1.jpg"
};

const _video = {
	content_id: 1,
	thumbnail_url :  "http://localhost:10008/wp-content/uploads/2023/10/video-1080p.mp4",
	content_title :  "Beautiful Sunset",
	like_count :  150,
	comment_count :  25,
	uploader_name :  "JohnDoe123",
	mime_type: 'video/mp4',
	uploader_avatar_url :  "https://example.com/profile_pic1.jpg"
};

const _audio = {
	content_id: 1,
	thumbnail_url :  "http://localhost:10008/wp-content/uploads/2023/09/friendly-melody-14015.mp3",
	content_title :  "Beautiful Sunset",
	like_count :  150,
	comment_count :  25,
	uploader_name :  "JohnDoe123",
	mime_type: 'audio/mp3',
	uploader_avatar_url :  "https://example.com/profile_pic1.jpg"
};

const content_array = {
	image: Array(10).fill(_image).map((content, index)=>{
		return {
			...content,
			content_id: content.content_id+index
		}
	}),
	video:  Array(10).fill(_video).map((content, index)=>{
		return {
			...content,
			content_id: content.content_id+index
		}
	}),
	audio:  Array(10).fill(_audio).map((content, index)=>{
		return {
			...content,
			content_id: content.content_id+index
		}
	}),
	app: Array(10).fill(_image).map((content, index)=>{
		return {
			...content,
			content_id: content.content_id+index
		}
	}),
}

const renderers = {
	video: Video,
	audio: Audio,
	image: Image,

	app: GenericCard,
	'3d': GenericCard,
	document: GenericCard,
	tutorial: GenericCard
}

const filters = [
	{
		label: __('Category'),
		type: 'checkbox',
		options: [
			{
				id: 1,
				label: 'Cat 1'
			},
			{
				id: 2,
				label: 'Cat 1'
			},
			{
				id: 3,
				label: 'Cat 1'
			}
		]
	},
	{
		label: __('Sort By'),
		type: 'radio',
		options: [
			{
				id: 'popularity',
				label: __( 'Popularity' )
			},
			{
				id: 'newest',
				label: __( 'New Arrival' )
			},
			{
				id: 'cost',
				label: __( 'Cost Efficient' )
			}
		]
	}
];

export function getPath(path) {
	let _path = (window[data_pointer].is_admin ? '/' : window[data_pointer].home_path) + path;
	return _path.replace(/\/+/g, '/');
}

function CatalogLayout(props) {
	const {settings={}} = window[data_pointer];
	const {contents={}} = settings;
	const {content_type_slug} = useParams();
	const navigate = useNavigate();
	
	let content_type;
	for ( let k in contents ) {
		if (contents[k].slug===content_type_slug) {
			content_type = k;
			break;
		} else {
			console.log(contents[k].slug, content_type_slug);
		}
	}

	const [state, setState] = useState({
		contents:[], 
		fetching: false,
		filters:{
			page: 1,
			sort: 'popular'
		}
	});

	const getContents=()=>{

		setState({
			...state, 
			fetching: true
		});

		request('getContentList', {...state.filters/* , content_type */}, resp=>{
			let {contents=[]} = resp?.data || {};
			setState({...state, fetching: false, contents});
		});
	}

	useEffect(()=>{
		getContents();
	}, [content_type_slug]);

	const RenderComp = renderers[content_type];

	return <div className={'catalog'.classNames(style)}>
		<div className={'d-flex align-items-center position-sticky border-1 border-radius-8 b-color-tertiary margin-bottom-15'.classNames()}>
			<div className={'border-right-1 b-color-tertiary'.classNames()}>
				<DropDown
					value={content_type}
					onChange={v=>navigate(getPath(v+'/'))}
					variant="borderless"
					clearable={false}
					options={Object.keys(contents).map(c=>{
						let {label, slug} = contents[c];
						return {
							id: c,
							label: label || slug
						}
					})}/>
			</div>

			{/* Search field */}
			<div className={'flex-1 padding-horizontal-15'.classNames()}>
				<input type='text' className={"text-field-flat overflow-hidden text-overflow-ellipsis".classNames()}/>
			</div>

			{/* Search Button */}
			<div className={'align-self-stretch'.classNames()}>
				<button className={'margin-0 padding-vertical-0 padding-horizontal-30 height-p-100 d-block'.classNames()}>
					Search
				</button>
			</div>
		</div>
		
		<div className={'content'.classNames(style)}>
			<div className={'sidebar'.classNames(style) + 'position-sticky'.classNames()}>
				{filters.map((filter, i)=>{
					const {label, options=[], type} = filter;

					return <div key={i} className={'margin-bottom-15'.classNames()}>
						<strong className={'d-block font-weight-500 font-size-15'.classNames()}>
							{label}
						</strong>

						<Conditional show={type=='checkbox' || type=='radio'}>
							<RadioCheckbox type={type} options={options}/>
						</Conditional>
					</div>
				})}
			</div>
			
			<div className={'list'.classNames(style)}>
				{
					RenderComp ? 
						<ErrorBoundary>
							<RenderComp contents={content_array[content_type] || []}/>
						</ErrorBoundary> : 
						<>Something went wrong. Renderer component not found.</>
				}
			</div>
		</div>
	</div>
}

export function Catalog() {

	const {home_path} = window[data_pointer];

	return <BrowserRouter>
		<Routes>
			<Route path={home_path+':content_type_slug/'} element={<CatalogLayout/>}/>
		</Routes>
	</BrowserRouter>
}
