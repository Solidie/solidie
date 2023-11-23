import React, { useContext } from "react";

import {chunkArray} from '../image/image.jsx';
import { ColCounter, ContextColCounter } from "../../../../materials/col-counter.jsx";

import style from './video.module.scss';

export function VideoLayout({contents=[]}) {

	const {column_count=3} = useContext(ContextColCounter);
	const _contents = chunkArray(contents, column_count);

	return <div className={'d-flex column-gap-5'.classNames()}>
		{
			_contents.map((video, index)=>{
				return <div className={'flex-1 d-flex flex-direction-column row-gap-5'.classNames()} key={index}>
					{
						video.map(content=>{
							const {thumbnail_url, mime_type, content_id} = content;
							return <div key={content_id} className={'position-relative cursor-pointer'.classNames() + 'single-video'.classNames(style)}>
								<video className={'d-block width-p-100 height-auto'.classNames()} controls={false}>
									<source src={thumbnail_url} type={mime_type}/>
									Your browser does not support the video tag.
								</video>
								<div className={'position-absolute left-0 top-0 right-0 bottom-0 d-flex flex-direction-column justify-content-space-between'.classNames() + 'details'.classNames(style)}>
									<div className={'d-flex align-items-center justify-content-end'.classNames()}>
										top
									</div>
									<div>
										bott
									</div>
								</div>
							</div>
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
