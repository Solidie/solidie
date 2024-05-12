import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ColCounter, ContextColCounter } from "crewhrm-materials/col-counter.jsx";

import {chunkArray} from '../image/image.jsx';
import style from './video.module.scss';
import { MetaData } from "../../single/meta-data/meta-data.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { DownloadOrPrice } from "../generic-card/generic-card.jsx";

export function ImageVideoDetails({content={}}) {

	const { content_title } = content;

	return <div className={'position-absolute left-0 top-0 right-0 bottom-0 d-flex flex-direction-column justify-content-space-between'.classNames() + 'details'.classNames(style)}>
		<div className={'d-flex align-items-center justify-content-flex-end padding-10'.classNames() + 'gradient-top'.classNames(style)}>
			<div className={'padding-bottom-30'.classNames()}>
				<MetaData 
					content={content} 
					is_overlayer={true}
				/>
			</div>
		</div>
		<div className={'padding-top-30'.classNames() + 'gradient-bottom'.classNames(style)}>
			<div className={'d-flex align-items-center column-gap-15 padding-10'.classNames()}>
				<div className={'flex-1 d-flex align-items-center column-gap-10'.classNames()}>
					<strong className={'font-size-16 font-weight-500 color-white text-shadow-thin line-clamp'.classNames()}>
						{content_title}
					</strong>
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
	}, [state.mouse_over])

	return <Link 
		key={content_id} 
		to={content_permalink}
		className={'border-radius-5 overflow-hidden'.classNames()}
		data-cylector="content-single"
	>
		<div 
			className={'position-relative cursor-pointer'.classNames()}
			onMouseOver={()=>setState({...state, mouse_over: true})}
			onMouseOut={()=>setState({...state, mouse_over: false})}
		>
			<video 
				ref={vid_ref}
				className={'d-block width-p-100 height-auto'.classNames()} 
				controls={false} 
				poster={media.thumbnail?.file_url}
				loop={true}
				preload="auto"
			>
				<source src={media.preview?.file_url} type={media.preview?.mime_type}/>
				Your browser does not support the video tag.
			</video>
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

	return <div className={'d-flex column-gap-5'.classNames()}>
		{
			_contents.map((video, index)=>{
				return <div className={'flex-1 d-flex flex-direction-column row-gap-5'.classNames()} key={index}>
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
