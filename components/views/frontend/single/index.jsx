import React, {createContext, useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {ErrorBoundary} from 'solidie-materials/error-boundary.jsx';
import { __, data_pointer, getBack } from "solidie-materials/helpers.jsx";
import { request } from "solidie-materials/request.jsx";
import { applyFilters } from "solidie-materials/hooks.jsx";
import { RenderExternal } from "solidie-materials/render-external.jsx";
import { InitState } from "solidie-materials/init-state.jsx";
import { RenderMedia } from "solidie-materials/render-media/render-media.jsx";

import { GenericPreview } from "./previews/generic.jsx";
import { ImagePreview } from "./previews/image.jsx";
import { VideoPreview } from "./previews/video.jsx";
import { AudioPreview } from "./previews/audio.jsx";
import { Comments } from "./comments/comments.jsx";
import { MetaData } from "./meta-data/meta-data.jsx";
import { content_statuses } from "../../modules/inventory/index.jsx";

import style from './single.module.scss';
import { getPageTitle } from "../gallery/index.jsx";

export const ContextSingleData = createContext();

const swapObjectKey=(obj, target_key, replace_key)=>{
	
	const new_ob = {};

	for ( let k in obj ) {
		new_ob[ obj[k][target_key] ] = {...obj[k], [replace_key]: k}
	}

	return new_ob;
}

const {permalinks={}, settings: {contents={}}} = window[data_pointer];
const contents_by_slug = swapObjectKey(contents, 'slug', 'content_type');

const preview_renderers = {
	image: ImagePreview,
	video: VideoPreview,
	audio: AudioPreview,
	other: GenericPreview,
}

function FreeDownlod( props ) {

	const {
		content:{content_type, content_permalink, release={}}={}, 
		settings : {
			free_download_label, 
			free_download_description
		}
	} = props;


	const is_tutorial = content_type === 'tutorial';
	const access_url  = is_tutorial ? content_permalink+'0/' : (release?.download_url || '#');

	return <div className={'border-1 b-color-material-20 border-radius-5 padding-horizontal-15 padding-vertical-20'.classNames()}>
		<strong className={'d-block font-size-16 color-text-80 font-weight-600 margin-bottom-8'.classNames()}>
			{free_download_label}
		</strong>
		<span className={'d-block  font-size-14 margin-bottom-20 font-weight-400 color-text-60'.classNames()}>
			{free_download_description}
		</span>
		
		<a 
			href={access_url} 
			className={'button button-primary button-outlined button-full-width'.classNames()}
		>
			<span 
				className={'d-inline-flex align-items-flex-end column-gap-15'.classNames()}
			>
				<span style={{lineHeight: '23px'}}>
					{is_tutorial ? __('Start Learning') : __('Download')}
				</span>
				<span>
					<i className={`sicon ${is_tutorial ? 'sicon-book-open' : 'sicon-download'} font-size-14`.classNames()}></i>
				</span>
			</span>
		</a>
	</div>
}

export function SingleWrapper() {

	const {content_slug, content_type_slug} = useParams();

	const [state, setState] = useState({
		fetching: false,
		settings: {},
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
					content={}, 
					settings={},
					message=__('Something went wrong')
				}
			} = resp;

			setState({
				...state,
				settings,
				content: success ? content : {},
				error_message: success ? null : message
			});
		});
	}

	const updateReactions=(reactions)=>{		
		setState({
			...state,
			content: {
				...state.content,
				reactions
			}
		});
	}

	useEffect(()=>{
		getContent();
	}, [content_slug]);

	useEffect(()=>{
		if( window.Prism ) {
			window.Prism.highlightAll();
		}
	}, [state.content]);

	const {content_type} = contents_by_slug[content_type_slug] || {};
	const PreviewComp = preview_renderers[content_type] || preview_renderers.other;

    if ( state.fetching || state.error_message ) {
        return <InitState 
			fetching={state.fetching} 
			error_message={<>
				<p>
					{state.error_message}
				</p>
				<Link
					to={permalinks.gallery[content_type]}
					onClick={getBack}
					className={'button button-primary button-outlined button-small'.classNames()}
				>
					{__('Back to Gallery')}
				</Link>
			</>}
		/>
    }

	const {media={}, content_title, content_status} = state.content || {};
	const {sample_images=[]} = media || {};
	
	return <div className={'single'.classNames(style)} data-cylector="content-single-page">
		<Helmet>
			<title>
				{getPageTitle(content_title)}
			</title>
		</Helmet>

		<div className={'margin-bottom-15'.classNames()}>
			<Link
				to={permalinks.gallery[content_type]}
				onClick={getBack}
				className={'d-flex align-items-center column-gap-8 color-text-60 interactive'.classNames()}
			>
				<i className={'sicon sicon-arrow-left font-size-16'.classNames()}></i>
				<span className={'font-size-14'.classNames()}>
					{__('Back')}
				</span>
			</Link>
		</div>

		<div className={'margin-bottom-15'.classNames()}>
			<strong className={'d-block font-size-24 color-text margin-bottom-5'.classNames()}>
				{content_title} {content_status!='publish' ? <i>[{content_statuses[content_status] || content_status}]</i> : null}
			</strong>
			<MetaData 
				content={state.content}
				settings={state.settings}
				updateReactions={updateReactions}/>
		</div>
		
		<div className={'d-flex column-gap-15 row-gap-15'.classNames() + 'content-wrapper'.classNames(style)}>
			<div className={'flex-1'.classNames()}>
				<div>
					<ErrorBoundary>
						<PreviewComp content={state.content} settings={state.settings}/>
					</ErrorBoundary>
				</div>

				<div dangerouslySetInnerHTML={{__html: state.content?.content_description || ''}}></div>

				{
					!sample_images.length ? null : 
					<div>
						<strong className={'d-block font-size-18 font-weight-500'.classNames()}>
							{__('Samples')}:
						</strong>
						<RenderMedia media={sample_images}/>
					</div>
				}

				{
					(!state.content?.content_id || state.content?.reactions?.comment_count===null) ? null : 
					<Comments content={state.content}/>
				}
			</div>
			
			<div className={'pricing'.classNames(style) + 'd-flex flex-direction-column row-gap-15'.classNames()}>
				<div>
					<RenderExternal 
						component={applyFilters('free_download_button', FreeDownlod, state.content)}
						payload={{
							content: state.content, 
							settings: state.settings
						}}
					/>
				</div>
			</div>
		</div>
	</div>
}
