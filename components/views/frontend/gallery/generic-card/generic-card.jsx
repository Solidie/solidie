import React from "react";

import {ResponsiveLayout} from 'crewhrm-materials/responsive-layout.jsx';
import {Ratio} from 'crewhrm-materials/responsive-layout.jsx';

import style from './generic.module.scss';
import { Link } from "react-router-dom";

export function GenericCard({contents=[]}) {
	return <div className={'generic-card'.classNames(style)}>
		<ResponsiveLayout columnWidth={300}>
			{contents.map(content=>{
				const {content_id, content_permalink, media={}, content_title} = content;

				return <div key={content_id} className={'d-flex flex-direction-column justify-content-space-between border-radius-5'.classNames()} style={{boxShadow: '1px 1px 4px #0000002e'}}>
					<div>
						<Ratio x={16} y={9}>
							<Link 
								to={content_permalink}
								className={'d-block width-p-100 height-p-100 cursor-pointer'.classNames() + 'thumbnail'.classNames(style)} 
								style={{backgroundImage: 'url('+media?.thumbnail?.file_url+')'}}/>
						</Ratio>

						<div className={'padding-vertical-15 padding-horizontal-20'.classNames()}>
							<Link to={content_permalink} className={'d-block font-size-17 font-weight-400 color-text cursor-pointer'.classNames()}>
								{content_title}
							</Link>
						</div>
					</div>
					{/* <div className={'border-top-1 padding-vertical-15 padding-horizontal-20'.classNames()} style={{borderColor: '#0000001e'}}>
						This is footer
					</div> */}
				</div>
			})}
		</ResponsiveLayout>
	</div> 
}