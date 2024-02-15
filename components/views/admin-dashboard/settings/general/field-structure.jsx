import React from 'react';
import { __, data_pointer } from 'crewhrm-materials/helpers.jsx';
import { applyFilters } from 'crewhrm-materials/hooks.jsx';

const _contents = window[data_pointer].settings?.contents || {};

const conte_dropdown = Object.keys(_contents).map(content_type=>{
	const {enable, label} = _contents[content_type];
	return ! enable ? null : {
		id: content_type,
		label: label
	}
}).filter(f=>f);

const reaction_modes = [
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

export const settings_fields = applyFilters(
	'solidie_setting_fields',
	{
		general: {
			label: __('Solidie Settings'),
			description: __('Configure all the content management, sales and contributor related settings in one place'),
			segments: {
				gallery: {
					label: __('Gallery'),
					description: __('Gallery and single page settings'),
					fields: [
						{
							name: 'enable_comment_for',
							label: __('Enable comment for'),
							type: 'checkbox',
							direction: 'column',
							options: conte_dropdown
						},
						{
							name: 'show_contributor_info_for',
							label: __('Show contributor info for'),
							type: 'checkbox',
							direction: 'column',
							options: conte_dropdown
						},
						{
							name: 'reaction_mode',
							label: __('Feedback Mode'),
							type: 'radio',
							direction: 'column',
							options: reaction_modes
						},
						{
							name: 'enable_dislike',
							label: __('Woud you like to show dislike too?'),
							type: 'switch',
							direction: 'column',
							placeholder: __('Enable dislike'),
							when: ['reaction_mode', 'like' ]
						},
						{
							name: 'enable_reaction_for',
							label: __('Enable reaction for'),
							type: 'checkbox',
							direction: 'column',
							options: conte_dropdown,
							when: ['reaction_mode', 'in_array', ['like', 'rating']]
						},
					]
				}
			}
		},
	}
);
