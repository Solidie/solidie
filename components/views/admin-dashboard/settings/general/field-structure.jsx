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
							placeholder: __('Free'),
							direction: 'row'
						},
						{
							name: 'free_download_description',
							label: __('Free download description'),
							type: 'textarea',
							placeholder: __('This content is eligible to download for free'),
							direction: 'row'
						}
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
