import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ColCounter, ContextColCounter } from "solidie-materials/col-counter.jsx";

import { ImageVideoDetails } from "../video/video.jsx";

import * as style from './image.module.scss';

export function chunkArray(contents=[], column_length){
	
	let new_array = Array(column_length).fill([]);

	let last_index = column_length - 1;
	let col_index = 0;
		
	for ( let i=0; i<contents.length; i++ ) {
		const content = contents[i];
		new_array[col_index] = [...new_array[col_index], content];
		col_index = col_index >= last_index ? 0 : col_index+1;
	}

	return new_array;
}

export function ImageLayout({contents=[]}) {

	const {column_count=3} = useContext(ContextColCounter);
	const _contents = chunkArray(contents, column_count);

	return <div className={'d-flex column-gap-15'.classNames()}>
		{
			_contents.map((images, index)=>{

				return <div className={'flex-1 d-flex flex-direction-column row-gap-15'.classNames()} key={index}>
					{
						images.map(content=>{
							
							const {
								media={}, 
								content_id, 
								content_permalink,
								content_title
							} = content;

							return <Link 
								key={content_id} 
								to={content_permalink}
								className={'image-single'.classNames(style)}
								data-cylector="content-single"
							>
								<div className={'position-relative cursor-pointer border-radius-8'.classNames()}>
									<img 
										alt={`Content Thumbnail - ${content_title}`}
										className={'d-block width-p-100 height-auto'.classNames()} src={media.thumbnail?.file_url}
									/>
									<div className={'meta'.classNames(style)}>
										<ImageVideoDetails content={content}/>
									</div>
								</div>
							</Link>
						})
					}
				</div>
			})
		}
	</div>
}

export function Image({contents=[]}) {
	return <ColCounter columnWidth={250}>
		<ImageLayout contents={contents}/>
	</ColCounter>
}
