import React from 'react';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { applyFilters } from 'crewhrm-materials/hooks.jsx';

export const settings_fields = applyFilters(
	'solidie_setting_fields',
	{
		general: {
			label: __('General'),
			description: __(
				'Configure general settings'
			),
			segments: {
				careers: {
					label: __('Job Listing Page'),
					icon: 'ch-icon ch-icon-bill',
					sections: {
						careers_settings:{
							label: __('Job Listing Page'),
							description: __('Configure careers page features and application submission'),
							separator: true,
							vertical: false,
							fields: [
								{
									name: 'careers_page_id',
									label: __('Job Listing Page'),
									type: 'dropdown',
									options: 'pages',
									placeholder: __('Select Page')
								}
							]
						}
					}
				}
			}
		},
		contributor: {
			label: __('Contributor'),
			description: __(
				'Control contributors behaviors'
			),
			segments: {
				profile: {
					label: __('Company Info'),
					icon: 'ch-icon ch-icon-building-4',
					sections: {
						basic_info: {
							label: __('Company Info'),
							description: __('Set your company informations'),
							separator: false,
							vertical: true,
							fields: [
								{
									name: 'company_name',
									label: __('Company Name'),
									type: 'text',
									required: true,
									placeholder: __('ex. ABC')
								},
							]
						},
					}
				},
			}
		},
	}
);
