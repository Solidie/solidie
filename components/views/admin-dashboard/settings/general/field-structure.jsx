import React from 'react';
import { __ } from 'solidie-materials/helpers.jsx';
import { applyFilters } from 'solidie-materials/hooks.jsx';

const bucket_when = ['do_space_enable', '==', true];

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
							hint: <small className={'font-size-13'.classNames()}>
								Add <code className={'font-size-13'.classNames()}>[solidie_content_gallery]</code> in the page to support other contents
							</small>
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
						{
							name: 'enable_content_sitemap',
							label: __('Enable content sitemap'),
							placeholder: __('Enable'),
							hint: __('Applicable if search engine visibility is turned on'),
							type: 'switch',
							direction: 'row'
						},
					]
				},
				cloudstorage: {
					label: __('Cloud Storage'),
					description: __('Currently we support only Digital Ocean Space'),
					separator: false,
					fields: [
						{
							name: 'do_space_enable',
							label: __('Enable Digital Ocean Space'),
							type: 'switch',
							placeholder: __('Enable'),
							direction: 'row'
						},
						{
							name: 'do_space_bucket_name',
							label: __('Bucket Name'),
							type: 'text',
							direction: 'row',
							when: bucket_when
						},
						{
							name: 'do_space_bucket_region',
							label: __('Bucket Region'),
							type: 'text',
							direction: 'row',
							when: bucket_when
						},
						{
							name: 'do_space_access_key',
							label: __('Access Key'),
							type: 'text',
							direction: 'row',
							when: bucket_when
						},
						{
							name: 'do_space_secret_key',
							label: __('Secret Key'),
							type: 'text',
							direction: 'row',
							when: bucket_when
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
