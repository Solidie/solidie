import React from "react";

import {__} from 'crewhrm-materials/helpers.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { DoAction } from 'crewhrm-materials/mountpoint.jsx';

import { CategoryEditor } from "./category-editor.jsx";
import { label_class } from "../options/options.jsx";

export function ContentTypeEditor(props) {
	
	const {
		updateWholeSetting, 
		settings, 
		segment: content_type
	} = props;


	const {slug, enable} = settings.contents[content_type];

	const onChange=(name, value)=>{
		updateWholeSetting({
			...settings,
			contents: {
				...settings.contents,
				[content_type]: {
					...settings.contents[content_type],
					[name]: value
				}
			}
		});
	}

	return <div>
		<div
			className={`d-flex flex-direction-row align-items-center padding-vertical-10`.classNames()}
		>
			<div className={'flex-1 margin-bottom-10'.classNames()}>
				<span className={label_class}>
					{__('Base Slug')}
				</span>
			</div>
			<div className={'d-flex flex-1 align-items-center column-gap-10'.classNames()}>
				<TextField
					value={slug}
					onChange={v=>onChange('slug', v)}
				/>
			</div>
		</div>
		<div
			className={`d-flex flex-direction-row align-items-flex-start padding-vertical-10`.classNames()}
		>
			<div className={'flex-1 margin-bottom-10'.classNames()}>
				<span className={label_class}>
					{__('Categories')}
				</span>
			</div>
			<div className={'d-flex flex-1 align-items-center column-gap-10'.classNames()}>
				<CategoryEditor content_type={content_type}/>
			</div>
		</div>
		<DoAction 
			action="single_content_type_settings" 
			payload={{
				content_type,
				onChange,
				content: settings.contents[content_type],
			}}
		/>
	</div>
}
