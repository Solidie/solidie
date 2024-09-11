import React from "react";

import {addFilter} from 'solidie-materials/hooks.jsx';
import {mountExternal} from 'solidie-materials/render-external.jsx';
import {MountPoint} from 'solidie-materials/mountpoint.jsx';
import {__, data_pointer} from 'solidie-materials/helpers.jsx';

import { Inventory } from "../modules/inventory/index.jsx";
import { ContentEditor } from "../modules/inventory/editor/ContentEditor.jsx";

addFilter(
	'solidie_pro_fe_dashboard_menus',
	function (menus=[]) {

		// Do not show inventory page if public contribution is disabled
		if ( ! window[data_pointer].contribution?.enabled ) {
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
					<MountPoint>
						<Inventory {...data}/>
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
					<MountPoint>
						<ContentEditor {...data}/>
					</MountPoint>
				)
			}
		});

		return menus;
	}
);
