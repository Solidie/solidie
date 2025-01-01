import React, { useContext, useState } from 'react'

import { request } from 'solidie-materials/request.jsx';
import { confirm } from 'solidie-materials/prompts.jsx';
import { __, data_pointer, sprintf, formatDate, formatTime, getDashboardPath, currency_symbol } from 'solidie-materials/helpers.jsx';
import { ContextToast } from 'solidie-materials/toast/toast.jsx';
import { LoadingIcon } from 'solidie-materials/loading-icon/loading-icon.jsx';
import { Pagination } from 'solidie-materials/pagination/pagination.jsx';
import { TableStat } from 'solidie-materials/table-stat.jsx';
import { Options } from "solidie-materials/dropdown/dropdown.jsx";
import {DropDownStatus} from 'solidie-materials/dropdown-status/dropdown-status.jsx';
import { ToolTip } from 'solidie-materials/tooltip.jsx';

import { getPriceRange } from '../../../frontend/gallery/generic-data.jsx';

import * as style from './inventory.module.scss';

const {
	readonly_mode, 
	is_admin, 
	is_pro_active, 
	settings:{
		general:{
			public_contribution_deletion
		}={}
	}={}
} = window[data_pointer];

export const content_statuses = {
	draft: __('Draft'),
	publish: __('Published'), 
	unpublish: __('Unpublished'), 
	pending: __('Pending'), 
	rejected: __('Rejected'),
}

export const bulk_types = ['image', 'audio', 'video'];

const status_hints = {
	draft: __('The content is not yet published'),
	publish: __('The content is published and is live'), 
	unpublish: __('The content has been unpublished'), 
	pending: __('The content is pending for review'), 
	rejected: __('The content has been rejected, need to fix inappropriate stuffs.'),
}

const contributors_status = ['publish', 'unpublish'];

const getContentActions = content=>{

	const actions = [
		{
			id: 'edit', 
			label: __('Edit'),
			icon: 'sicon sicon-edit-2 color-material'.classNames()
		},
	];

	// Add delete option for admin or if public deletion enabled
	if ( is_admin || public_contribution_deletion ) {
		actions.push({
			id: 'delete', 
			label: __('Delete'),
			icon: 'sicon sicon-trash color-error'.classNames()
		});
	}

	// Add download option if download link available
	if ( content.release?.download_url ) {
		actions.push({
			id: 'download', 
			label: __('Download'),
			icon: 'sicon sicon-download color-success'.classNames()
		});
	}

	// Add release manager URL if it is app
	if (content.content_type==='app') {
		actions.push({
			id: 'release', 
			label: __('Releases'),
			icon: 'sicon sicon-hierarchy'.classNames()
		});
	}

	// Add lesson manager URL if it is tutorial
	if (content.content_type==='tutorial') {
		actions.push({
			id: 'tutorial', 
			label: __('Lessons'),
			icon: 'sicon sicon-book-open'.classNames()
		});
	}

	return actions;
}

export function InventoryTable({navigate, content_type, contents=[], fetchContents, segmentation, fetching, filterState, setFilter, updateContents}) {

	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		changing_status_for: null,
	});

	const deleteContent=(content_id)=>{
		
		confirm(
			__('Sure to delete?'),
			__('All the associated data also will be deleted permanently.'),
			()=>{
				request('deleteContent', {content_id}, resp=>{
					if (!resp.success) {
						ajaxToast(resp);
					} else {
						fetchContents();
					}
				});
			}
		);
	}

	const changeContentStatus=(content_id, status)=>{

		confirm(
			__('Sure to change status?'),
			()=>{
				setState({
					...state,
					changing_status_for: content_id
				});
				
				request('changeContentStatus', {content_id, status, is_admin}, resp=>{

					ajaxToast(resp);

					setState({
						...state,
						changing_status_for: null,
					});

					if (resp.success) {
						updateContents(contents.map(c=>c.content_id==content_id ? {...c, content_status: status} : c));
					}
				});
			}
		);
	}

	const onActionClick=(action, content)=>{

		const {
			content_type, 
			content_id, 
			release
		} = content;
		
		switch(action) {

			case 'edit' :
				navigate(getDashboardPath(`inventory/${content_type}/editor/${content_id}/`));
				break;

			case 'delete': 
				if ( !readonly_mode ) {
					deleteContent(content_id);
				}
				break;

			case 'download' : 
				window.location.assign(release?.download_url);
				break;

			case 'release' :
				navigate(getDashboardPath(`inventory/${content_type}/editor/${content_id}/release-manager/`));
				break;

			case 'tutorial' :
				navigate(getDashboardPath(`inventory/${content_type}/editor/${content_id}/lessons/`));
				break;
		}
	}

	function Link({children, className, title, to}) {
		return <a 
			className={className} 
			title={title} 
			href={to}
			onClick={e=>{
				e.preventDefault(); 
				navigate(to);
			}}
		>
			{children}
		</a>
	}

	const _contents      = window[data_pointer]?.settings?.contents || {};
	const _content_label = _contents[content_type]?.label || __('Content');
	const is_classified  = content_type === 'classified';
	const download_label = content_type === 'tutorial' ? __('Reads') : ( content_type === 'classified' ? __('Views') : __('Downloads') );
	
	return <>
		<table 
			className={'table'.classNames(style) + 'table '.classNames()} 
		>
			<thead>
				<tr>
					<th>ID</th>
					<th>{__('Title')}</th>
					{!is_admin ? null : <th className={'white-space-nowrap'.classNames()}>{__('Contributor')}</th>}
					<th className={'white-space-nowrap'.classNames()}>{__('Category')}</th>
					{
						is_classified ? null :
						<>
							<th>{__('Price')}</th>
							{(!is_pro_active || content_type=='app') ? null : <th>{__('Bundled In')}</th>}
						</>
					}
					<th>{download_label}</th>
					<th>{__('Status')}</th>
					<th>{__('Created')}</th>
					<th></th>
				</tr>
			</thead>
			<tbody className={'font-size-14'.classNames()}>
				{
					contents.map((content) =>{
						let {
							content_id, 
							content_title, 
							content_permalink, 
							media, 
							created_at, 
							content_status, 
							category_name,
							product_id,
							download_count,
							lesson_count = 0,
							contributor:{
								display_name, 
								avatar_url
							},
							release,
							product:{
								monetization='free',
								plans=[],
							}={},
						} = content;

						const thumbnail_url = media?.thumbnail?.file_url;
						const status_readonly = 'draft' == content_status || ( is_admin ? 'unpublish'==content_status : contributors_status.indexOf(content_status)===-1 );
						
						// Get price range
						const price_range = getPriceRange(plans, true);
						const {
							min:{sale_price: min_price},
							max: {sale_price: max_price},
							packs=[]
						} = price_range;

						return <tr key={content_id}>
							<td data-th={__('ID')} className={'white-space-nowrap font-size-14'.classNames()}>
								{content_id}
							</td>
							<td data-th={__('Content')} style={{paddingTop: '20px', paddingBottom: '20px'}}>
								<div className={'d-flex align-items-center column-gap-15'.classNames()}>
									{
										!thumbnail_url ? null :
										<div>
											<img 
												src={thumbnail_url} 
												style={{
													width: '50px', 
													height: '30px', 
													borderRadius: '2px',
													objectFit: 'cover',
													objectPosition: 'center'
												}}/>
										</div>
									}
									
									<div className={'flex-1'.classNames()} style={{maxWidth: '260px'}}>
										<a href={content_permalink} target='_blank' className={"d-block font-size-14 font-weight-600 color-text-80 interactive".classNames()}>
											{content_title}
										</a>
										{
											content_type!=='tutorial' ? null :
											<span className={'font-size-13 color-text-50'.classNames()}>
												Lesson: <strong>{lesson_count}</strong>
											</span>
										}
									</div>
								</div>
							</td>

							{
								!is_admin ? null :
								<td data-th={__('Contributor')}>
									<div className={'d-flex align-items-center column-gap-8'.classNames()}>
										<img src={avatar_url} style={{width: '25px', borderRadius: '50%', overflow: 'hidden'}}/>
										<span className={'color-text-70'.classNames()}>
											{display_name}
										</span>
									</div>
								</td>
							}

							<td data-th={__('Category')}>
								<span className={'color-text-70'.classNames()}>
									{category_name || <>&nbsp;</>}
								</span>
							</td>
							
							{
								is_classified ? null :
								<>
									<td data-th={__('Price')}>
										{
											!is_pro_active ? 
												<div className={'cursor-pointer'.classNames()}>
													<ToolTip tooltip={
														<a 
															className={'color-material font-weight-600 font-size-14'.classNames()} 
															href='https://solidie.com/' 
															target='_blank'
														>
															<i>Upgrade to Pro</i>
														</a>
													}>
														N\A
													</ToolTip>
												</div>
												:
												<div className={'color-text-70'.classNames()}>
													{
														monetization !== 'paid' ? __('Free') :
														<>
															{
																isNaN(min_price) ? null :
																<div className={'d-flex align-items-center column-gap-8'.classNames()}>
																	<span className={'font-weight-600 white-space-nowrap'.classNames()}>
																		{currency_symbol}{min_price}
																	</span>
																	{
																		!(max_price>min_price) ? null : 
																		<>
																			<span className={'color-text-50 white-space-nowrap'.classNames()}>
																				to
																			</span>
																			<span className={'font-weight-600 white-space-nowrap'.classNames()}>
																				{currency_symbol}{max_price}
																			</span>
																		</>
																	}
																</div>
															}
														</>
													}
												</div>
										}
									</td>
									{
										(!is_pro_active || content_type=='app') ? null :
										<td data-th={__('Bundled In')}>
											{
												(monetization !== 'paid' || !packs.length) ? null :
													<div className={'d-flex flex-direction-column row-gap-8'.classNames()}>
														{
															packs.map(plan=>{
																const {plan_name} = plan?.plan || {};
																return !plan_name ? null : 
																<div key={plan.variation_id}>
																	<div 
																		className={'bg-color-material-3 border-1 b-color-material-20 d-inline-block font-size-13'.classNames()} 
																		style={{padding: '4px 17px', borderRadius: '50px'}}
																	>
																		{plan_name}
																	</div>
																</div>
															})
														}
													</div>
											}
										</td>
									}
								</>
							}
					
							<td data-th={download_label}>
								<span className={'color-text-70'.classNames()}>
									{download_count}
								</span>
							</td>

							<td data-th={__('Status')}>
								<div 
									className={'d-flex align-items-center column-gap-10'.classNames()}
									title={status_hints[content_status] || null}
								>
									<DropDownStatus
										value={content_status}
										onChange={v=>changeContentStatus(content_id, v)}
										disabled={status_readonly || state.changing_status_for}
										options={
											Object
												.keys(content_statuses)
												.filter(s=>is_admin || status_readonly || contributors_status.indexOf(s)>-1)
												.map(status=>{
												return {
													id: status,
													label: content_statuses[status]
												}
											})
										}
									/>
									<LoadingIcon show={state.changing_status_for==content_id}/>
								</div>
							</td>
							<td data-th={__('Created')}>
								<div>
									<span className={'d-block font-size-14 font-weight-400 color-text-70 margin-bottom-5'.classNames()}>
										{formatDate(created_at)}
									</span>
									<span className={'d-block font-size-13 font-weight-400 color-text-50'.classNames()}>
										{formatTime(created_at)}
									</span>
								</div>
							</td>
							<td data-th={__('Action')}>
								<div className={'d-flex justify-content-flex-end'.classNames()}>
									<div>
										<Options
											onClick={(action) => onActionClick(action, content)}
											options={getContentActions(content)}
										>
											<i
												className={'sicon sicon-more color-text-50 font-size-20 cursor-pointer d-inline-block'.classNames()}
											></i>
										</Options>
									</div>
								</div>
							</td>
						</tr>
					})
				}
				<TableStat 
					empty={!contents.length} 
					loading={fetching}
					message={
						<div className={'padding-vertical-40 text-align-center'.classNames()}>
							<strong className={'d-block font-size-14 margin-bottom-20'.classNames()}>
								{sprintf(__('No %s found'), _content_label)}
							</strong>
							<Link to={getDashboardPath(`inventory/${content_type}/editor/new`)} className={'button button-primary button-small'.classNames()}>
								{__('Add New')}
							</Link>
						</div> 
					}/>
			</tbody>
		</table>
		{
			(segmentation?.page_count || 0) < 2 ? null :
			<>
				<br/>
				<div className={'d-flex justify-content-center'.classNames()}>
					<Pagination
						onChange={(page) => setFilter('page', page)}
						pageNumber={filterState.page}
						pageCount={segmentation.page_count}
					/>
				</div>
			</>
		}
	</>
}
