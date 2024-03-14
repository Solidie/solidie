import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ColCounter, ContextColCounter } from "crewhrm-materials/col-counter.jsx";

import {chunkArray} from '../image/image.jsx';
import style from './video.module.scss';
import { MetaData } from "../../single/meta-data/meta-data.jsx";

export function ImageVideoDetails({content={}}) {

	const {
		content_title,
		release={},
		is_free=true,
		content_id
	} = content;

	return <div className={'position-absolute left-0 top-0 right-0 bottom-0 d-flex flex-direction-column justify-content-space-between'.classNames() + 'details'.classNames(style)}>
		<div className={'d-flex align-items-center justify-content-flex-end padding-10'.classNames()}>
			<div>
				<MetaData 
					content={content} 
					is_overlayer={true}
				/>
			</div>
		</div>
		<div className={'d-flex align-items-center column-gap-15 padding-10'.classNames()}>
			<div className={'flex-1 d-flex align-items-center column-gap-10'.classNames()}>
				<strong className={'font-size-16 font-weight-500 color-white text-shadow-thin line-clamp'.classNames()}>
					{content_title}
				</strong>
			</div>
			<div>
				{
					is_free ? 
						<span 
							className={'ch-icon ch-icon-download font-size-16 color-white color-hover-tertiary cursor-pointer text-shadow-thin'.classNames()}
							onClick={e=>{
								e.preventDefault();
								e.stopPropagation();
								if (release?.download_url) {
									window.location.assign(release?.download_url)
								}
							}}
						></span>
					:
					<div>

					</div>
				}
			</div>
		</div>
	</div>
}

export function VideoLayout({contents=[]}) {

	const {column_count=3} = useContext(ContextColCounter);
	const _contents = chunkArray(contents, column_count);

	const togglePlayback=(e, play)=>{
		e.currentTarget[play ? 'play' : 'pause']();
	}

	return <div className={'d-flex column-gap-5'.classNames()}>
		{
			_contents.map((video, index)=>{
				return <div className={'flex-1 d-flex flex-direction-column row-gap-5'.classNames()} key={index}>
					{
						video.map(content=>{
							
							const {
								media={}, 
								content_id, 
								content_permalink,
							} = content;

							return <Link key={content_id} to={content_permalink}>
								<div className={'position-relative cursor-pointer'.classNames()}>
									<video 
										className={'d-block width-p-100 height-auto'.classNames()} 
										controls={false} 
										poster={media.thumbnail?.file_url}
										onMouseOver={e=>togglePlayback(e, true)}
										onMouseOut={e=>togglePlayback(e, false)}
										loop={true}
										preload="auto"
									>
										<source src={media.preview?.file_url} type={media.preview?.mime_type}/>
										Your browser does not support the video tag.
									</video>
									<ImageVideoDetails content={content}/>
								</div>
							</Link>
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
