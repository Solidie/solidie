import React from "react";

import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';
import { DoAction } from 'crewhrm-materials/mountpoint.jsx';

import { CategoryEditor } from "./category-editor.jsx";
import { OptionFields, label_class } from "../options/options.jsx";

const reaction_types = [
	{
		id: 'like',
		label: __('Like')
	},
	{
		id: 'rating',
		label: __('Rating')
	},
	{
		id: 'none',
		label: __('None')
	}
];

const fields = [
	{
		name: 'slug',
		label: __('Base Slug'),
		type: 'text',
	},
	{
		name: 'show_thumbnail',
		label: __('Show thumbnail in single page'),
		type: 'switch',
		placeholder: __('Enable'),
		supports: ['app', '3d', 'document', 'font', 'tutorial']
	},
	{
		name: 'enable_comment',
		label: __('Enable commenting'),
		type: 'switch',
		placeholder: __('Enable')
	},
	{
		name: 'show_contributor_info',
		label: __('Show contributor info'),
		type: 'switch',
		placeholder: __('Enable')
	},
	{
		name: 'reaction_type',
		label: __('Reaction Type'),
		type: 'radio',
		options: reaction_types
	},
	{
		name: 'enable_dislike',
		label: __('Would you like to show dislike too?'),
		type: 'switch',
		placeholder: __('Enable dislike'),
		when: ['reaction_type', 'like' ]
	},
	{
		name: 'enable_sharing',
		label: __('Show share option'),
		type: 'switch',
		placeholder: __('Enable')
	},
	(
		!window[data_pointer].is_pro_active ? null :
		{
			name: 'enable_wishlist',
			label: __('Show wishlist option'),
			type: 'switch',
			placeholder: __('Enable')
		}
	)
].filter(o=>o);

export function ContentTypeEditor(props) {
	
	const {
		updateWholeSetting, 
		settings, 
		segment: content_type,
		className=''
	} = props;

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

	return <div className={className}>
		<OptionFields 
			fields={fields.filter(f=>!f.supports || f.supports.indexOf(content_type)>-1)} 
			settings={settings.contents[content_type]}
			onChange={onChange}
		/>
		<div
			className={`d-flex flex-direction-column align-items-flex-start padding-vertical-10`.classNames()}
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
