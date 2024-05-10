import React, { useState } from "react";

import {__} from 'crewhrm-materials/helpers.jsx';

export function UpdatesAPINote() {
	
	const [expand, setExpand] = useState(false);

	return <div>
		<span 
			className={'hover-underline cursor-pointer'.classNames()}
			onClick={()=>setExpand(!expand)}
		>
			{!expand ? __('See API Request Data Structure') : __('Hide Data')} 
		</span>
		{
			! expand ? null :
			<table className={'table-basic'.classNames()}>
				<tbody>
					<tr>
						<th>
							{__('License Key Activation')}
						</th>
						<td>
							<strong>
								{__('Post Data:')}
							</strong>
							<pre>
								{JSON.stringify(
									{
										"license_key" : "purchased-license-key",
										"endpoint"	  : "any_unique_id_string",
										"app_name"	  : "the-app-content-slug",
										"action"	  : "activate-license"
									},
									null,
									2
								)}
							</pre>

							<br/>
							<strong>
								{__('Response Data:')}
							</strong>
							<pre>
								{JSON.stringify(
									{
										"license_key" : "the-sent-license-key",
										"activated"   : true,
										"icensee"     : "The customer name",
										"expires_on"  : 'Expires date time',
										"plan_name"   : "Purchased plan name",
										"message"     : "Response message",
										"endpoint"    : "The sent endpoint",
									},
									null,
									2
								)}
							</pre>
						</td>
					</tr>
					<tr>
						<th>
							{__('Update Check')}
						</th>
						<td>
							<strong>
								{__('Post Data')}
							</strong>
							<pre>
								{JSON.stringify(
									{
										"license_key" : "purchased-license-key",
										"endpoint"	  : "any_unique_string",
										"app_name"	  : "the-app-content-slug",
										"action"	  : "update-check"
									},
									null,
									2
								)}
							</pre>

							<br/>
							<strong>
								{__('Response Data')}
							</strong>
							<pre>
								{JSON.stringify(
									{
										"content_permalink" : "The url to the purchased content",
										"version"           : "latest-version",
										"release_timestamp" : "Unix release timestamp",
										"changelog"         : "The changelog",
										"download_url"      : "Release file download URL"
									},
									null,
									2
								)}
							</pre>
						</td>
					</tr>
				</tbody>
			</table>
		}
	</div>
}