import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { request } from "crewhrm-materials/request.jsx";
import { __, data_pointer, filterObject, isEmpty, parseParams, getPath } from "crewhrm-materials/helpers.jsx";
import { ErrorBoundary } from "crewhrm-materials/error-boundary.jsx";
import { LoadingIcon } from "crewhrm-materials/loading-icon/loading-icon.jsx";
import { Pagination } from "crewhrm-materials/pagination/pagination.jsx";
import { applyFilters } from "crewhrm-materials/hooks.jsx";

import { GenericCard } from "./generic-card/generic-card.jsx";
import { SingleWrapper } from "../single/index.jsx";

import { Image } from "./image/image.jsx";
import { Video } from "./video/video.jsx";
import { Audio } from "./audio/audio.jsx";

import style from './index.module.scss';
import { Sidebar } from "./sidebar.jsx";
import { Tutorial } from "../tutorial/tutorial.jsx";
import { createContext } from "react";

const renderers = {
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

export const ContextGallery = createContext();

function GalleryLayout({resources={}}) {
	const {categories={}} = resources;
	const {settings={}} = window[data_pointer];
	const {contents={}} = settings;
	const {content_type_slug} = useParams();
	const navigate = useNavigate();
	
    const [searchParam, setSearchParam] = useSearchParams();
    const queryParams = parseParams(searchParam);
    const current_page = parseInt( queryParams.page || 1 );

	// Decode category IDs
	queryParams.category_ids = (queryParams.category_ids || '').split(',').map(id=>parseInt(id)).filter(c=>c);

	let content_type;
	for ( let k in contents ) {
		if (contents[k].slug===content_type_slug) {
			content_type = k;
			break;
		}
	}

	const reff_wrapper = useRef();
	const [is_mobile, setMobile] = useState(false);

	const [state, setState] = useState({
		contents:[], 
		segmentation: null,
		fetching: true,
		no_more: false,
	});

	const setLayout=()=>{
		if ( reff_wrapper?.current ) {
			setMobile(reff_wrapper.current.offsetWidth<560);
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

		request('getContentList', {filters:{page: 1, ...queryParams, content_type}}, resp=>{
			const {data:{contents=[], segmentation}} = resp;
			setState({...state, fetching: false, contents, segmentation});
		});
	}

	const updateReactions=(content_id, reactions)=>{
		const {contents=[]} = state;
		setState({
			...state,
			contents: contents.map(c=>c.content_id==content_id ? {...c, reactions} : c)
		});
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
	}, []);

	const RenderComp = renderers[content_type] || renderers.other;
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

	return <ContextGallery.Provider value={{updateContentReactions: updateReactions}}>
		<div className={'gallery'.classNames(style)}>
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
				<div className={'flex-1 d-flex align-items-center padding-horizontal-15'.classNames()}>
					<div className={'flex-1'.classNames()}>
						<input 
							type='text' 
							className={"text-field-flat overflow-hidden text-overflow-ellipsis".classNames()}
							value={queryParams.search || ''}
							onChange={e=>setFilter('search', e.currentTarget.value)}/>
					</div>
					<div>
						<i className={'ch-icon ch-icon-search-normal-1 font-size-16'.classNames()}></i>
					</div>
				</div>
			</div>
			
			<div ref={reff_wrapper} className={`content ${is_mobile ? 'mobile' : ''}`.classNames(style)}>
				<Sidebar
					filters={queryParams}
					setFilter={setFilter}
					is_mobile={is_mobile}
					filterList={
						applyFilters(
							'gallery_sidebar_filter_list',
							{
								category_ids: {
									section_label: __('Category'),
									selection_type: 'checkbox',
									options: categories[content_type] || []
								},
								...sorting_list
							},
							resources,
							content_type
						)
					}
				/>

				<div className={'list'.classNames(style)}>
					{
						(!state.fetching && !state.contents.length) ? 
							<div className={'text-align-center'.classNames()}>
								{__('No result!')}
							</div> : null
					}

					{
						!state.contents.length ? null :
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
						</ErrorBoundary>
					}
				
					<LoadingIcon center={true} show={state.fetching}/>
				</div>
			</div>
		</div>
	</ContextGallery.Provider>
}

function LessonWrapper() {

	const {home_path} = window[data_pointer];

	const {content_slug, content_type_slug} = useParams();
	const {pathname} = useLocation();
	const sub_paths = pathname.slice(`${home_path}${content_type_slug}/${content_slug}/`.length);
	
	return <Tutorial 
		content_slug={content_slug}
		path={sub_paths.split('/').filter(p=>p).join('/')}
	/>
}

export function Gallery(props) {

	const {home_path} = window[data_pointer];

	return <BrowserRouter>
		<Routes>
			<Route path={home_path+':content_type_slug/'} element={<GalleryLayout {...props}/>}/>
			<Route path={home_path+':content_type_slug/:content_slug/'} element={<SingleWrapper {...props}/>}/>
			<Route path={home_path+':content_type_slug/:content_slug/*'} element={<LessonWrapper {...props}/>}/>
		</Routes>
	</BrowserRouter>
}
