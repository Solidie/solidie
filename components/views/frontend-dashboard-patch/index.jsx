import React from "react";

import {addFilter} from 'crewhrm-materials/hooks.jsx';
import {mountExternal} from 'crewhrm-materials/render-external.jsx';
import {MountPoint} from 'crewhrm-materials/mountpoint.jsx';
import {__, data_pointer} from 'crewhrm-materials/helpers.jsx';

import { Inventory } from "../modules/inventory/index.jsx";
import { ContentEditor } from "../modules/inventory/ContentEditor.jsx";

addFilter(
	'solidie_pro_fe_dashboard_menus',
	function (menus=[]) {

		// Do not show inventory page if public contribution is disabled
		if ( ! window[data_pointer].public_contribution_enabled ) {
			return menus;
		}

		menus.splice(1, 0, {
			path: 'inventory/',
			full_path: 'inventory/:content_type?/',
			text: __('Inventory'),
			icon: '',
			component: function(el, data) {
				mountExternal(
					'inventory_dashboard',
					el,
					data.session,
					<MountPoint>
						<Inventory is_frontend={true} {...data.payload}/>
					</MountPoint>
				)
			}
		},
		{
			show_menu: false,
			path: 'inventory-edit/',
			full_path: 'inventory/:content_type/editor/:content_id/:segment?/:segment_id?/',
			text: __('Content Editor'),
			icon: '',
			component: function(el, data) {
				mountExternal(
					'inventory_dashboard_edit',
					el,
					data.session,
					<MountPoint>
						<ContentEditor is_frontend={true} {...data.payload}/>
					</MountPoint>
				)
			}
		});

		return menus;
	}
);
