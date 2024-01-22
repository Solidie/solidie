import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { __, data_pointer, filterObject, isEmpty, parseParams } from "crewhrm-materials/helpers.jsx";
import { Conditional } from "crewhrm-materials/conditional.jsx";
import { RadioCheckbox, checkBoxRadioValue } from "crewhrm-materials/radio-checkbox.jsx";
import { ErrorBoundary } from "crewhrm-materials/error-boundary.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";
import { Pagination } from "crewhrm-materials/pagination/pagination.jsx";

import {getPath} from 'solidie-materials/helpers.jsx';

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
	font: GenericCard,
	document: GenericCard,
	tutorial: GenericCard
}

const filters = [
	{
		label: __('Sort'),
		type: 'radio',
		name: 'order_by',
		options: [
			{
				id: 'trending',
				label: __( 'Trending' )
			},
			{
				id: 'newest',
				label: __( 'New Arrival' )
			}
		]
	}
];

function GalleryLayout({categories={}}) {
	const {settings={}} = window[data_pointer];
	const {contents={}} = settings;
	const {content_type_slug} = useParams();
	const navigate = useNavigate();
	
    const [searchParam, setSearchParam] = useSearchParams();
    const queryParams = parseParams(searchParam);
    const current_page = parseInt( queryParams.page || 1 );

	// Decode category IDs
	queryParams.category_ids = (queryParams.category_ids || '').split(',').filter(c=>c);
	queryParams.order_by = queryParams.order_by || 'trending';

	let content_type;
	for ( let k in contents ) {
		if (contents[k].slug===content_type_slug) {
			content_type = k;
			break;
		}
	}

	const [state, setState] = useState({
		contents:[], 
		segmentation: null,
		fetching: true,
		no_more: false,
	});

	const setFilter=(name, value)=>{

		const filters = typeof name === 'object' ? name : {
            ...queryParams,
            page: 1,
            [name]: value
        };

		if ( ! isEmpty( filters.category_ids ) ) {
			filters.category_ids = filters.category_ids.join(',');
		}
		
        setState({
            ...state,
            no_more: false
        });

        // Push the filters to search param
        setSearchParam(new URLSearchParams(filterObject(filters, (v) => v)).toString());
	}

	const getContents=(clear_list=false)=>{

		setState({
			...state, 
			fetching: true,
			contents: clear_list ? [] : state.contents
		});

		request('getContentList', {filters:{page: 1, ...queryParams, content_type}}, resp=>{
			const {data:{contents=[], segmentation}} = resp;
			setState({...state, fetching: false, contents, segmentation});
		});
	}

	useEffect(()=>{
		getContents(true);
	}, [content_type_slug]);

	useEffect(()=>{
		getContents();
	}, [searchParam])

	function CatList({categories=[], level=0}) {
		return categories.map(category=>{
			const {category_id, category_name, children=[]} = category;
			return <div key={category_id} style={{paddingLeft: level > 0 ? '10px' : 0}}>
				<label
					className={`d-inline-flex align-items-center column-gap-10 cursor-pointer`.classNames()}
				>
					<input
						type='checkbox'
						checked={(queryParams.category_ids || []).indexOf(category_id.toString())>-1}
						value={category_id}
						onChange={(e) => setFilter('category_ids', checkBoxRadioValue(e, queryParams.category_ids || []))}
					/>
					
					<span>{category_name}</span>
				</label>
				{children.length ? <CatList categories={children} level={level+1}/> : null}
			</div>
		});
	}

	const RenderComp = renderers[content_type];
	const content_options = Object.keys(contents).map(c=>{
		let {label, slug, enable} = contents[c];
		if ( enable === true ) {
			return {
				id: slug || c,
				label: label || slug
			}
		} else {
			return null
		}
	}).filter(content=>content!==null);

	return <div className={'gallery'.classNames(style)}>
		<div className={'d-flex align-items-center position-sticky border-1 border-radius-8 b-color-tertiary margin-bottom-15'.classNames()}>
			<div 
				className={'border-right-1 b-color-tertiary'.classNames()} 
				style={content_options.length<2 ? {width: 0, visibility: 'hidden'} : {}}
			>
				<DropDown
					value={contents[content_type]?.slug}
					onChange={v=>navigate(getPath(v+'/'))}
					variant="borderless"
					clearable={false}
					options={content_options}/>
			</div>

			{/* Search field */}
			<div className={'flex-1 padding-horizontal-15'.classNames()}>
				<input 
					type='text' 
					className={"text-field-flat overflow-hidden text-overflow-ellipsis".classNames()}
					value={queryParams.search || ''}
					onChange={e=>setFilter('search', e.currentTarget.value)}/>
			</div>

			{/* Search Button */}
			<div className={'align-self-stretch'.classNames()}>
				<button className={'margin-0 padding-vertical-0 padding-horizontal-30 height-p-100 d-block'.classNames()}>
					{__('Search')}
				</button>
			</div>
		</div>
		
		<div className={'content'.classNames(style)}>
			<div className={'sidebar'.classNames(style) + 'position-sticky'.classNames()}>
				
				{
					isEmpty( categories[content_type] ) ? null :
						<div className={'margin-bottom-15'.classNames()}>
							<strong className={'d-block font-weight-500 font-size-15'.classNames()}>
								{__('Categories')}
							</strong>
							<CatList categories={categories[content_type]}/>
						</div>
				}
				
				{filters.map((filter, i)=>{
					const {label, options=[], type, name} = filter;

					return <div key={i} className={'margin-bottom-15'.classNames()}>
						<strong className={'d-block font-weight-500 font-size-15'.classNames()}>
							{label}
						</strong>

						<Conditional show={type=='checkbox' || type=='radio'}>
							<RadioCheckbox 
								type={type} 
								options={options}
								value={queryParams[name]}
								onChange={val=>setFilter(name, val)}/>
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
							{
								(state.segmentation?.page_count || 0) < 2 ? null :
									<>
										<br/>
										<div className={'d-flex justify-content-center'.classNames()}>
											<div>
												<Pagination
													onChange={(page) => setFilter('page', page)}
													pageNumber={current_page}
													pageCount={state.segmentation.page_count}/>
											</div>
										</div>
									</>
							}
						</ErrorBoundary> : null
				}
			
				<LoadingIcon center={true} show={state.fetching}/>
			</div>
		</div>
	</div>
}

export function Gallery(props) {

	const {home_path} = window[data_pointer];

	return <BrowserRouter>
		<Routes>
			<Route path={home_path+':content_type_slug/'} element={<GalleryLayout {...props}/>}/>
			<Route path={home_path+':content_type_slug/:content_slug/'} element={<SingleWrapper {...props}/>}/>
		</Routes>
	</BrowserRouter>
}
