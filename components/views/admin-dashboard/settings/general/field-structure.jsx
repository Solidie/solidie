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
					label: __('Frontend Dashboard'),
					icon: 'ch-icon ch-icon-bill',
					sections: {
						careers_settings:{
							label: __('Frontend Dashboard'),
							description: __('Frontend dashboard configurations'),
							separator: true,
							vertical: false,
							fields: [
								{
									name: 'frontend_dashboard_path',
									label: __('The path'),
									type: 'text',
									hint: __('Set the relative path to frontend dashboard'),
									placeholder: __('Select Page')
								}
							]
						}
					}
				},
				contributor: {
					label: __('Contributor'),
					icon: 'ch-icon ch-icon-bill',
					sections: {
						contributor_settings:{
							label: __('Contributor'),
							description: __('Contributor settings'),
							separator: true,
							vertical: true,
							fields: [
								{
									name: 'contribution_enabled',
									label: __('Enable contribution'),
									type: 'switch',
									hint: __('Enabling this will allow users to submit their contents'),
									placeholder: __('Select Page')
								},
								{
									name: 'contribution_monetizations',
									label: __('Contributor contents monetizations'),
									type: 'checkbox',
									options: [
										{id: 'free', label: __('Free')}, 
										{id: 'paid', label: __('Paid')}
									],
									hint: __('Select the monetization model they can choose'),
									placeholder: __('Select Page')
								}
							]
						}
					}
				}
			}
		},
	}
);
