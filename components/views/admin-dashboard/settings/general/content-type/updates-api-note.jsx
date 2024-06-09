import React, { useState } from "react";

import {__, isEmpty, data_pointer} from 'crewhrm-materials/helpers.jsx';
import {Tabs} from 'crewhrm-materials/tabs/tabs.jsx';

function DataTabs({data}) {
	const keys = Object.keys(data);
	const [tab, setTab] = useState(keys[0]);

	return <div style={{width: '370px'}}>
		<div className={'d-inline-block'.classNames()} style={{width: '140px'}}>
			<Tabs
				onNavigate={t=>setTab(t)} 
				active={tab} 
				theme='transparent'
				tabs = {
					keys.map(k=>{
						return {
							id: k,
							label: data[k].label
						}
					})
				}
			/>
		</div>
		<pre className={'color-text-80'.classNames()}>
			{JSON.stringify(data[tab].data, null, 2)}
		</pre>
	</div>
}

export function UpdatesAPINote(api_path) {

	let _path = (api_path || '').trim();
	_path = isEmpty(_path) ? '/solidie/api/' : _path;
	_path = `${_path.indexOf('/')===0 ? '' : '/'}${_path}`;
	_path = `${_path}${_path.lastIndexOf('/')===_path.length-1 ? '' : '/'}`;

	const [expand, setExpand] = useState(false);
	const url = `${window[data_pointer].permalinks.home_url}${_path}`;
	const type = 'POST';

	const data = {
		activate: {
			request: {
				label: __('Request'),
				data: {
					url,
					type,
					data: {
						"license_key" : "purchased-license-key",
						"endpoint"	  : "any_unique_id_string",
						"app_name"	  : "the-app-content-slug",
						"action"	  : "activate-license"
					}
				}
			},
			response: {
				label: __('Response'),
				data: {
					"license_key" : "the-sent-license-key",
					"activated"   : true,
					"icensee"     : "The customer name",
					"expires_on"  : 'Expires date time',
					"plan_name"   : "Purchased plan name",
					"message"     : "Response message",
					"endpoint"    : "The sent endpoint",
				}
			}
		},
		update: {
			request: {
				label: __('Request'),
				data: {
					url,
					type,
					data: {
						"license_key" : "purchased-license-key",
						"endpoint"	  : "any_unique_string",
						"app_name"	  : "the-app-content-slug",
						"action"	  : "update-check"
					}
				}
			},
			response: {
				label: __('Response'),
				data: {
					"content_permalink" : "Purchased content URL",
					"version"           : "latest-version",
					"release_timestamp" : "Release timestamp",
					"changelog"         : "The changelog",
					"download_url"      : "File download URL"
				}
			}
		}
	}

	return <div className={'overflow-auto font-size-13'.classNames()}>
		<span 
			className={'hover-underline cursor-pointer color-text-60'.classNames()}
			onClick={()=>setExpand(!expand)}
		>
			{!expand ? __('See API Request Data Structure') : __('Hide Data')} 
		</span>
		{
			! expand ? null :
			<table 
				className={'table-basic'.classNames()} 
				style={{background: '#fbfbfb'}}
			>
				<tbody>
					<tr>
						<th>
							<strong className={'color-text-60 font-weight-500'.classNames()}>
								{__('License Key Activation')}
							</strong>
						</th>
						<td>
							<DataTabs data={data.activate}/>
						</td>
					</tr>
					<tr>
						<th>
							<strong className={'color-text-60 font-weight-500'.classNames()}>
								{__('Update Check')}
							</strong>
						</th>
						<td>
							<DataTabs data={data.update}/>
						</td>
					</tr>
				</tbody>
			</table>
		}
	</div>
}