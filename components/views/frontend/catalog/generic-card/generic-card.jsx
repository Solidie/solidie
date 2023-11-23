import React from "react";

import {ResponsiveLayout} from 'crewhrm-materials/responsive-layout.jsx';
import {Conditional} from 'crewhrm-materials/conditional.jsx';
import {isEmpty} from 'crewhrm-materials/helpers.jsx';
import {Ratio} from 'crewhrm-materials/responsive-layout.jsx';

import style from './generic.module.scss';

export function GenericCard({contents=[]}) {
	return <div className={'generic-card'.classNames(style)}>
		<Conditional show={isEmpty(contents)}>
			<div>
				Result Empty
			</div>
		</Conditional>

		<ResponsiveLayout columnWidth={300}>
			{contents.map(content=>{
				const {content_id, thumbnail_url, content_title} = content;

				return <div key={content_id} className={'d-flex flex-direction-column justify-content-space-between border-radius-5'.classNames()} style={{boxShadow: '1px 1px 4px #0000002e'}}>
					<div>
						<Ratio x={16} y={9}>
							<div className={'width-p-100 height-p-100'.classNames() + 'thumbnail'.classNames(style)} style={{backgroundImage: 'url('+thumbnail_url+')'}}>
							</div>
						</Ratio>

						<div className={'padding-vertical-15 padding-horizontal-20'.classNames()}>
							<strong className={'d-block font-size-17 font-weight-400 color-text'.classNames()}>
								{content_title}
							</strong>
						</div>
					</div>
					<div className={'border-top-1 padding-vertical-15 padding-horizontal-20'.classNames()} style={{borderColor: '#0000001e'}}>
						Cart
					</div>
				</div>
			})}
		</ResponsiveLayout>
	</div> 
}