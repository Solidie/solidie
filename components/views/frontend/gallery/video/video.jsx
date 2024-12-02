import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { ColCounter, ContextColCounter } from "solidie-materials/col-counter.jsx";

import {chunkArray} from '../image/image.jsx';
import { MetaData } from "../../single/meta-data/meta-data.jsx";
import { DownloadOrPrice } from "../generic-data.jsx";

import style from './video.module.scss';

export function ImageVideoDetails({content={}}) {

	const { content_title } = content;

	return <div className={'position-absolute left-0 top-0 right-0 bottom-0 d-flex flex-direction-column justify-content-space-between'.classNames() + 'details'.classNames(style)}>
		<div className={'d-flex flex-direction-column align-items-flex-end row-gap-10 padding-10'.classNames()}>
			<MetaData 
				content={content} 
				is_overlayer={true}
				show={['wishlist']}
			/>
		</div>
		<div className={'gradient-bottom'.classNames(style)}>
			<div className={'d-flex align-items-center column-gap-15 padding-10'.classNames()}>
				<div className={'flex-1 column-gap-10 font-size-16 font-weight-500 color-white text-shadow-thin line-clamp'.classNames()}>
					{content_title}
				</div>
				<div>
					<DownloadOrPrice content={content} is_overlayer={true}/>
				</div>
			</div>
		</div>
	</div>
}

export function VideoSingle({content}) {

	const {
		media={}, 
		content_id, 
		content_permalink,
	} = content;

	const vid_ref = useRef();

	const [state, setState] = useState({
		mouse_over: false
	});

	useEffect(()=>{
		vid_ref.current[state.mouse_over ? 'play' : 'pause']();
	}, [state.mouse_over]);

	const poster = media.thumbnail?.file_id ? media.thumbnail?.file_url : null;

	return <Link 
		key={content_id} 
		to={content_permalink}
		className={'border-radius-5 overflow-hidden'.classNames()}
		data-cylector="content-single"
	>
		<div 
			className={'position-relative cursor-pointer  border-radius-8'.classNames() + 'video-wrapper'.classNames(style)}
			onMouseOver={()=>setState({...state, mouse_over: true})}
			onMouseOut={()=>setState({...state, mouse_over: false})}
		>
			<video 
				ref={vid_ref}
				className={'d-block width-p-100 height-auto'.classNames()} 
				controls={false} 
				loop={true}
				muted={true}
				preload="auto"
			>
				<source src={media.preview?.file_url} type={media.preview?.mime_type}/>
				Your browser does not support the video tag.
			</video>
			
			{
				!poster ? null :
				<div 
					className={
						'position-absolute left-0 top-0 right-0 bottom-0'.classNames() + 
						'poster'.classNames(style)
					}
					style={{
						backgroundImage: `url(${poster})`
					}}
				></div>
			}

			{
				!state.mouse_over ? null :
				<ImageVideoDetails content={content}/>
			}
		</div>
	</Link>
}

export function VideoLayout({contents=[]}) {

	const {column_count=3} = useContext(ContextColCounter);
	const _contents = chunkArray(contents, column_count);

	return <div className={'d-flex column-gap-15'.classNames()}>
		{
			_contents.map((video, index)=>{
				return <div className={'flex-1 d-flex flex-direction-column row-gap-15'.classNames()} key={index}>
					{
						video.map(content=>{
							return <VideoSingle key={content.content_id} content={content}/>
						})
					}
				</div>
			})
		}
	</div>
}

export function Video({contents}) {
	// We can use same component for iamge and video as the layout and functionalities are mostly similar
	return <ColCounter columnWidth={250}>
		<VideoLayout contents={contents}/>
	</ColCounter>
}
