import React from 'react';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { applyFilters } from 'crewhrm-materials/hooks.jsx';

export const settings_fields = applyFilters(
	'solidie_setting_fields',
	{
		general: {
			label: __('Solidie Settings'),
			description: __('Configure all the content management, sales and contributor related settings in one place'),
			segments: {
				
			}
		},
	}
);
