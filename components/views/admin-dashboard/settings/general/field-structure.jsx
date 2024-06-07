import React from 'react';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { applyFilters } from 'crewhrm-materials/hooks.jsx';

export const settings_fields = applyFilters(
	'solidie_setting_fields',
	{
		general: {
			label: __('General Settings'),
			description: __('Configure all the content management, sales and contributor related settings in one place'),
			segments: {
				general: {
					label: __('General'),
					description: __('Global Settings Applied to the Entire Plugin'),
					separator: false,
					fields: [
						{
							name: 'pagination_contents_per_page',
							label: __('Contents per page'),
							type: 'number',
							min: 1,
							direction: 'row'
						},
						{
							name: 'color_scheme_materials',
							label: __('Materials Color'),
							hint: __('Set color for materials like button, radio, checkbox etc.'),
							type: 'color',
							direction: 'row'
						},
						{
							name: 'color_scheme_texts',
							label: __('Texts Color'),
							hint: __('Set color for all the independent texts'),
							type: 'color',
							direction: 'row'
						},
						{
							name: 'color_scheme_lines',
							label: __('Lines Color'),
							hint: __('Set color for all the borders, separator lines etc.'),
							type: 'color',
							direction: 'row'
						},
					]
				},
				gallery: {
					label: __('Gallery'),
					description: __('Gallery and single page settings'),
					separator: false,
					fields: [
						{
							name: 'gallery_page_id',
							label: __('Gallery Page'),
							type: 'dropdown',
							options: 'pages',
							placeholder: __('Select Page'),
							direction: 'row',
							hint: <small className={'font-size-13'.classNames()}>Add <code className={'font-size-13'.classNames()}>[solidie_content_gallery]</code> in the page to support other contents</small>
						},
						{
							name: 'free_download_label',
							label: __('Free download label'),
							type: 'text',
							direction: 'row'
						},
						{
							name: 'free_download_description',
							label: __('Free download description'),
							type: 'textarea',
							direction: 'row'
						},
					]
				}
			}
		},
		contents: {
			label: __('Content Types'),
			description: __('Configure the content types to showcase'),
			segments: {
				
			}
		},
	}
);
