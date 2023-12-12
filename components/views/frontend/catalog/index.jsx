import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";

import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { __, data_pointer } from "crewhrm-materials/helpers.jsx";
import { Conditional } from "crewhrm-materials/conditional.jsx";
import { RadioCheckbox } from "crewhrm-materials/radio-checkbox.jsx";
import { ErrorBoundary } from "crewhrm-materials/error-boundary.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";

import { GenericCard } from "./generic-card/generic-card.jsx";
import { SingleWrapper } from "../single/index.jsx";

import { Image } from "./image/image.jsx";
import { Video } from "./video/video.jsx";
import { Audio } from "./audio/audio.jsx";

import style from './index.module.scss';

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
		fetching: true,
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

		request('getContentList', {...state.filters, content_type}, resp=>{
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
					(!state.fetching && !state.contents.length) ? 
						<div className={'text-align-center'.classNames()}>
							{__('No result!')}
						</div> : null
				}

				{
					(RenderComp && state.contents.length) ? 
						<ErrorBoundary>
							<RenderComp contents={state.contents}/>
						</ErrorBoundary> : null
				}
			
				<LoadingIcon center={true} show={state.fetching}/>
			</div>
		</div>
	</div>
}

export function Catalog() {

	const {home_path} = window[data_pointer];

	return <BrowserRouter>
		<Routes>
			<Route path={home_path+':content_type_slug/'} element={<CatalogLayout/>}/>
			<Route path={home_path+':content_type_slug/:content_slug/'} element={<SingleWrapper/>}/>
		</Routes>
	</BrowserRouter>
}
