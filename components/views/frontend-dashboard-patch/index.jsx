import React from "react";

import {addFilter} from 'crewhrm-materials/hooks.jsx';
import {mountExternal} from 'crewhrm-materials/render-external.jsx';
import {MountPoint} from 'crewhrm-materials/mountpoint.jsx';
import {__} from 'crewhrm-materials/helpers.jsx';

import { Inventory } from "../modules/inventory/index.jsx";
import { ContentEditor } from "../modules/inventory/ContentEditor.jsx";

addFilter(
	'solidie_pro_fe_dashboard_menus',
	function (menus=[]) {
		menus.splice(1, 0, {
			id: 'menu-inventory',
			path: 'inventory/:content_type?/',
			path_default: 'inventory',
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
			id: 'menu-content-editor',
			show_menu: false,
			path: 'inventory/:content_type/editor/:content_id',
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
