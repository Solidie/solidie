import React, { useState, useEffect, useRef, createContext } from "react";
import {Helmet} from "react-helmet";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { DropDown } from "solidie-materials/dropdown/dropdown.jsx";
import { request } from "solidie-materials/request.jsx";
import { __, data_pointer, filterObject, isEmpty, parseParams, getLocalValue, setLocalValue, getFlag } from "solidie-materials/helpers.jsx";
import { ErrorBoundary } from "solidie-materials/error-boundary.jsx";
import { LoadingIcon } from "solidie-materials/loading-icon/loading-icon.jsx";
import { Pagination } from "solidie-materials/pagination/pagination.jsx";
import { applyFilters } from "solidie-materials/hooks.jsx";
import { TextField } from "solidie-materials/text-field/text-field.jsx";

import { SingleWrapper } from "../single/index.jsx";
import { Image } from "./image/image.jsx";
import { Video } from "./video/video.jsx";
import { Audio } from "./audio/audio.jsx";
import { Sidebar } from "./sidebar.jsx";
import { Tutorial } from "../tutorial/tutorial.jsx";
import { GenericCard } from "./generic/generic-card.jsx";

import style from './index.module.scss';

const {page_path} = window[data_pointer];

export const renderers = {
	audio: Audio,
	video: Video,
	image: Image,
	other: GenericCard
}

const sorting_list = {
	order_by: {
		section_label: __('Sort'),
		selection_type: 'radio',
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
};

const {settings={}, bloginfo: {name: site_title}={}} = window[data_pointer];

export const ContextGallery = createContext();

export const getPageTitle=(...segments)=>{
	return [...segments, site_title].filter(s=>!isEmpty(s)).join(' - ');
}

function excludeEmptyCats( cats ) {
	return cats.filter(cat=>cat.content_count).map(cat=>{
		return {
			...cat,
			children: excludeEmptyCats(cat.children || [])
		}
	})
}

function GalleryLayout({resources={}}) {

	// Collect data
	const {categories={}, content_countries={}} = resources;
	const {contents={}} = settings;
	const {content_type_slug} = useParams();
	const navigate = useNavigate();
	
	const reff_wrapper = useRef();
	const [is_mobile, setMobile] = useState(false);
	const [state, setState] = useState({
		contents:[], 
		segmentation: null,
		fetching: true,
		no_more: false,
	});

	// Prepare query paramas and determine current page
    const [searchParam, setSearchParam] = useSearchParams();
    const queryParams = parseParams(searchParam);
    const current_page = parseInt( queryParams.page || 1 );

	// Decode category IDs collected from query params
	queryParams.category_ids = (queryParams.category_ids || '').split(',').map(id=>parseInt(id)).filter(c=>c);

	// Get all the enabled content types for dropdown
	const content_options = Object.keys(contents).map(c=>{
		let {label, slug, enable} = contents[c];
		if ( enable === true ) {
			return {
				id: slug || c,
				label: label || slug,
				content_type: c
			}
		} else {
			return null
		}
	}).filter(content=>content!==null);

	// Set default opened content type
	let content_type = getLocalValue('selected_gallery_type', content_options[0]?.content_type);

	// If any with the slug, then replace the content_type
	for ( let k in contents ) {
		if (contents[k].slug===content_type_slug) {
			content_type = k;
			break;
		}
	}

	// Determine renderer and geolocation filter
	const RenderComp = renderers[content_type] || renderers.other;
	const country_keys = Object.keys(content_countries[content_type] || {});
	queryParams.country_code = queryParams.country_code || getLocalValue( 'gallery_country_code' ) || country_keys[0];

	// Store 
	if ( !content_countries[content_type]?.[queryParams.country_code] ) {
		queryParams.country_code = country_keys[0];
		queryParams.state_code = null;
	}
	setLocalValue('gallery_country_code', queryParams.country_code);

	const setLayout=()=>{
		if ( reff_wrapper?.current ) {
			setMobile(reff_wrapper.current.offsetWidth<697);
		}
	}

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

		const payload = {
			filters:{
				page: 1, 
				order_by: 'newest', 
				...queryParams, 
				content_type
			}, 
			is_gallery: true
		}

		request('getContentList', payload, resp=>{
			const {data:{contents=[], segmentation}} = resp;
			setState({
				...state, 
				fetching: false, 
				contents, 
				segmentation
			});
		});
	}

	const updateReactions=(content_id, reactions)=>{
		const {contents=[]} = state;
		setState({
			...state,
			contents: contents.map(c=>c.content_id==content_id ? {...c, reactions} : c)
		});
	}

	const getFiltersForClassified=()=>{
		const fields = {}

		if ( country_keys.length >= 2 ) {
			fields.country_code = {
				section_label: __('Country'),
				selection_type: 'dropdown',
				options: country_keys.map(code=>{
					return {
						id: code,
						label: <>{getFlag(code)} {content_countries[content_type][code].country_name}</>
					}
				})
			}
		}

		if ( !isEmpty(content_countries[content_type]?.[queryParams.country_code]?.states) ) {
			fields.state_code = {
				section_label: __('State'),
				selection_type: 'dropdown',
				options: content_countries[content_type][queryParams.country_code].states
			}
		}
		
		return fields;
	}

	useEffect(()=>{
		getContents(true);
	}, [content_type_slug]);

	useEffect(()=>{
		getContents();
	}, [searchParam]);

	useEffect(()=>{
		// Set responsive layout and register event
		setLayout();
		window.addEventListener('resize', setLayout);
		return ()=>window.removeEventListener('resize', setLayout);
	}, [state.contents.map(c=>c.content_id)]);

	return isEmpty( content_options ) ? <div className={'color-error text-align-center'.classNames()}>
		{__('No content type is enabled')}
	</div>
	:
	<ContextGallery.Provider value={{updateContentReactions: updateReactions}}>
		<Helmet>
			<title>
				{getPageTitle(contents[content_type]?.label)}
			</title>
		</Helmet>
		<div className={'gallery'.classNames(style)}>
			<div 
				ref={reff_wrapper} 
				className={`content ${is_mobile ? 'mobile' : ''}`.classNames(style)}
			>
				<Sidebar
					filters={queryParams}
					setFilter={setFilter}
					is_mobile={is_mobile}
					filterList={
						applyFilters(
							'gallery_sidebar_filter_list',
							{
								...(content_type==='classified' ? getFiltersForClassified() : {}),
								category_ids: {
									section_label: __('Category'),
									selection_type: 'checkbox',
									options: excludeEmptyCats( categories[content_type] || [] )
								},
								...(content_type!=='classified' ? sorting_list : {})
							},
							resources,
							content_type
						)
					}
				/>

				<div 
					className={'list'.classNames(style)}
					data-cylector={`content-list-wrapper-${content_type}`}
				>
					<div 
						className={
							'd-flex column-gap-15 align-items-center flex-direction-row flex-wrap-wrap justify-content-flex-end'.classNames() +
							'filter'.classNames(style)
						}
						style={{rowGap: '15px'}}
					>
						<div 
							style={content_options.length<2 ? {width: 0, visibility: 'hidden'} : {}}
						>
							<DropDown
								value={contents[content_type]?.slug}
								clearable={false}
								transparent={true}
								options={content_options}
								onChange={slug=>{
									navigate(`/${page_path}/${slug}/`);
									setLocalValue('selected_gallery_type', Object.keys(contents).find(key=>contents[key].slug==slug));
								}}
								style={{width: '130px'}}
							/>
						</div>

						{/* Search field */}
						<div className={'d-flex align-items-center'.classNames()}>
							<div className={'flex-1'.classNames()} data-cylector="content-search">
								<TextField 
									value={queryParams.search || ''}
									type="search" 
									placeholder="Search.."
									onChange={v=>setFilter('search', v)}
									style={{width: '140px'}}
								/>
							</div>
						</div>
					</div>
					
					<div className={'items-parent'.classNames(style)}>
						{
							(!state.fetching && !state.contents.length) ? 
								<div className={'text-align-center'.classNames()} style={{padding: '140px 0'}}>
									<span className={'d-block font-size-16 font-weight-500'.classNames()}>
										{__('No result!')}
									</span>
								</div> : null
						}

						{
							!state.contents.length ? null :
							<ErrorBoundary>
								
								<RenderComp contents={state.contents} is_mobile={is_mobile}/>
								
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
							</ErrorBoundary>
						}
					
						{
							!state.fetching ? null :
							<div style={!state.contents.length ? {padding: '140px 0'} : {}}>
								<LoadingIcon center={true} show={state.fetching}/>
							</div>
						}
					</div>
					
				</div>
			</div>
		</div>
	</ContextGallery.Provider>
}

function LessonWrapper() {

	const {content_slug, content_type_slug} = useParams();
	const {pathname} = useLocation();
	const sub_paths = pathname.slice(`/${page_path}/${content_type_slug}/${content_slug}/`.length);
	
	return <Tutorial 
		content_slug={content_slug}
		path={sub_paths.split('/').filter(p=>p).join('/')}
	/>
}

export function Gallery(props) {

	return <BrowserRouter>
		<Routes>
			<Route path={`/${page_path}/:content_type_slug?/`} element={<GalleryLayout {...props}/>}/>
			<Route path={`/${page_path}/:content_type_slug/:content_slug/`} element={<SingleWrapper {...props}/>}/>
			<Route path={`/${page_path}/:content_type_slug/:content_slug/*`} element={<LessonWrapper {...props}/>}/>
		</Routes>
	</BrowserRouter>
}
