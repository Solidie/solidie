import React from "react";

import {__, data_pointer, purgeBasePath} from 'solidie-materials/helpers.jsx';
import { DoAction } from 'solidie-materials/mountpoint.jsx';

import { CategoryEditor } from "./category-editor.jsx";
import { OptionFields, label_class } from "../options/options.jsx";
import { UpdatesAPINote } from "./updates-api-note.jsx";

const {is_pro_active} = window[data_pointer];

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
		name: 'label',
		label: __('Content Type Label'),
		type: 'text'
	},
	{
		name: 'slug',
		label: __('Base Slug'),
		type: 'text',
		modifier: purgeBasePath,
		hint2: v=>{
			return <small>
				<a 
					href={`${window[data_pointer].permalinks.gallery_root}${v}/`} 
					target='_blank'
					className={'color-material-80 font-size-13 interactive'.classNames()}
				>
					{window[data_pointer].permalinks.gallery_root}<strong>{v}</strong>/
				</a>
			</small>
		}
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
		label: __('Show dislike option too?'),
		type: 'switch',
		placeholder: __('Enable dislike'),
		when: ['reaction_type', 'like' ]
	},
	{
		name: 'supported_countries',
		multiple: true,
		label: __('Supported Country'),
		type: 'dropdown',
		placeholder: __('Select Country'),
		options: 'countries',
		supports: ['classified'],
	},
	(
		!is_pro_active ? null :
		{
			name: 'api_path',
			label: __('Update API Path'),
			type: 'text',
			placeholder: 'e.g app-updates-api',
			hint2: UpdatesAPINote,
			supports: ['app'],
			direction: 'column',
			modifier: purgeBasePath
		}
	),
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
			className={`align-items-flex-start padding-vertical-10`.classNames()}
		>
			<div className={'margin-bottom-10'.classNames()}>
				<span className={label_class}>
					{__('Categories')}
				</span>
			</div>
			<div>
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
