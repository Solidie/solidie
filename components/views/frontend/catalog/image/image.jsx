import React, { useContext } from "react";

import { ColCounter, ContextColCounter } from "crewhrm-materials/col-counter.jsx";

import style from './image.module.scss';
import { Link } from "react-router-dom";

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

	return <div className={'d-flex column-gap-5'.classNames()}>
		{
			_contents.map((images, index)=>{

				return <div className={'flex-1 d-flex flex-direction-column row-gap-5'.classNames()} key={index}>
					{
						images.map(content=>{
							const {media={}, content_id, content_slug, content_url} = content;
							return <Link key={content_id} to={content_url}>
								<div className={'position-relative cursor-pointer'.classNames() + 'single-image'.classNames(style)}>
									<img className={'d-block width-p-100 height-auto'.classNames()} src={media.thumbnail?.file_url}/>
									{/* <div className={'position-absolute left-0 top-0 right-0 bottom-0 d-flex flex-direction-column justify-content-space-between'.classNames() + 'details'.classNames(style)}>
										<div className={'d-flex align-items-center justify-content-end'.classNames()}>
											top
										</div>
										<div>
											bott
										</div>
									</div> */}
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
