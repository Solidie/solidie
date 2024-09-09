import React, { useContext, useEffect, useState } from 'react'

import { request } from 'solidie-materials/request.jsx';
import { confirm } from 'solidie-materials/prompts.jsx';
import { __, data_pointer, sprintf, formatDate, formatTime, getDashboardPath, currency_symbol, getLocalValue, setLocalValue } from 'solidie-materials/helpers.jsx';
import { ContextToast } from 'solidie-materials/toast/toast.jsx';
import { LoadingIcon } from 'solidie-materials/loading-icon/loading-icon.jsx';
import { Pagination } from 'solidie-materials/pagination/pagination.jsx';
import { TextField } from 'solidie-materials/text-field/text-field.jsx';
import { TableStat } from 'solidie-materials/table-stat.jsx';
import { DropDown, Options } from "solidie-materials/dropdown/dropdown.jsx";
import {DropDownStatus} from 'solidie-materials/dropdown-status/dropdown-status.jsx';

import { getPriceRange } from '../../frontend/gallery/generic-card/generic-card.jsx';
import style from './inventory.module.scss';
import { ToolTip } from 'solidie-materials/tooltip.jsx';

const {
	readonly_mode, 
	is_admin, 
	is_pro_active, 
	settings:{
		general:{
			public_contribution_deletion
		}
	}
} = window[data_pointer];

export const content_statuses = {
	draft: __('Draft'),
	publish: __('Published'), 
	unpublish: __('Unpublished'), 
	pending: __('Pending'), 
	rejected: __('Rejected'),
	banned: __('Banned')
}

const status_hints = {
	draft: __('The content is not yet published'),
	publish: __('The content is published and is live'), 
	unpublish: __('The content has been unpublished'), 
	pending: __('The content is pending for review'), 
	rejected: __('The content has been rejected, need to fix inappropriate stuffs.'),
	banned: __('The content is banned and will be deleted soon if inappropriate stuffs are not removed in a week.')
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

function Initial({contents: _contents}) {

	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		selected_type: null,
		saving: false
	});

	const submit=()=>{

		setState({
			...state,
			saving: true
		})

		request('enableInitialContentType', {content_type: state.selected_type}, resp=>{
			
			if ( resp.success ) {
				window.location.reload();
				return;
			}

			setState({...state, saving: false});
			ajaxToast(resp);
		});
	}

	return <div className={'padding-vertical-40'.classNames()}>
		<span className={'d-block margin-bottom-10 font-size-18 font-weight-500 color-text'.classNames()}>
			{__('What would you like to showcase?')}
		</span>
		<span className={'d-block font-size-12 color-text-60 margin-bottom-15'.classNames()}>
			You can always configure it in <a 
				target="_blank" 
				href={window[data_pointer]?.permalinks?.settings} >
					settings
			</a>.
		</span>
		<div className={'d-flex align-items-center column-gap-8'.classNames()}>
			<div style={{width: '300px'}}>
				<DropDown
					value={state.selected_type}
					options={Object.keys(_contents).map(type=>{return {id: type, label: _contents?.[type]?.label}})}
					onChange={v=>setState({...state, selected_type: v})}
					label={__('Select One')}
				/>
			</div>
			<div>
				<button
					className={'button button-primary'.classNames()}
					target='_blank'
					disabled={!state.selected_type || state.saving}
					onClick={submit}
				>
					{__('Start')} <LoadingIcon show={state.saving}/>
				</button>
			</div>
		</div>
	</div>
}

function InventoryWrapper({children, content_type, content_label, gallery_permalink, navigate, params={}}) {

	const _contents = window[data_pointer]?.settings?.contents || {};
	const enabled_contents = 
		Object.keys(_contents)
		.map(c=>{
			return _contents[c].enable ? {..._contents[c], content_type:c} : null
		})
		.filter(c=>c)
		.map(c=>{
			return {...c, id: c.content_type}
		});

	const [state, setState] = useState({
		error_message: null
	});

	useEffect(()=>{
		if ( ! content_type || !enabled_contents.find(c=>c.content_type==content_type) ) {
			const first = enabled_contents[0]?.content_type;
			if ( first ) {
				navigate(getDashboardPath('inventory/'+first), {replace: true});
			} else {
				setState({
					...state, 
					error_message: <div 
						className={'d-flex align-items-center justify-content-center bg-color-white border-radius-8'.classNames()}
						style={{padding: '140px 0'}}
					>
						{
							is_admin ? <Initial contents={_contents}/> :
							<div className={'text-align-center padding-vertical-40'.classNames()}>
								<span className={'d-block margin-bottom-10 font-size-16 color-text'.classNames()}>
									{__('No content type is enabled.')}
								</span>
								<span className={'d-block margin-bottom-10 font-size-14 color-text-70'.classNames()}>
									{__('Please contact the site administrator.')}
								</span>
							</div>
						}
					</div> 
				});
			}
		} else if( ! enabled_contents.find(e=>e.content_type===content_type)?.enable ) {
			setState({
				...state, 
				error_message: <div className={'text-align-center padding-vertical-40'.classNames()}>
						<span className={'d-block margin-bottom-10'.classNames()}>
							{sprintf(__('The content type \'%s\' is not found or maybe disabled meanwhile'), content_type)}
						</span>
						<a href={window[data_pointer]?.permalinks?.settings} className={'button button-primary button-outlined button-small'.classNames()}>
							{__('Check Content Types')}
						</a>
					</div>
			});
		}
	}, [content_type]);

	if ( state.error_message ) {
		return <div>
			<div>
				<strong className={"d-flex align-items-center column-gap-8 color-text padding-vertical-10 position-sticky top-0".classNames()}>
					<span className={'font-size-24 font-weight-600 letter-spacing-3'.classNames()}>
						{__('Inventory')}
					</span>
				</strong>
			</div>
			{state.error_message}
		</div>
	}

	return children;
}

export function Inventory({navigate, params={}}) {

	const {content_type = getLocalValue('selected_inventory_type')} = params;
	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		fetching: false,
		changing_status_for: null,
		contents: [],
		segmentation: null,
		gallery_permalink: null,
		content_type: content_type
	});

	const filterStateInitial = {
		page: 1,
		search: '',
		content_status: ''
	}
	const [filterState, setFilterState] = useState(filterStateInitial);

	const setFilter=(name, value)=>{
		setFilterState({
			...filterState,
			page: name=='search' ? 1 : filterState.page,
			[name]: value
		});
	}

	const fetchContents=(variables={})=>{
		setState({
			...state,
			fetching: true,
			...variables
		});

		const payload = {
			...filterState, 
			content_type, 
			segmentation: true, 
			order_by: 'newest'
		}

		request( 'getContentList', {filters: payload, is_contributor_inventory: !is_admin}, resp=>{
			const {
				success, 
				data: {
					segmentation = {}, 
					contents=[],
					gallery_permalink
				}
			} = resp;

			setState({
				...state,
				contents,
				fetching: false,
				segmentation,
				gallery_permalink
			});
		} );
	}

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
						contents: resp.success ? state.contents.map(c=>c.content_id==content_id ? {...c, content_status: status} : c) : state.contents
					});
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

	useEffect(()=>{
		if ( content_type ) {
			fetchContents({
				content_type,
				contents: state.content_type!=content_type ? [] : state.contents
			});
		}
	}, [content_type, filterState]);

	useEffect(()=>{
		setFilterState(filterStateInitial);
	}, [content_type]);

	const _contents = window[data_pointer]?.settings?.contents || {};
	const enabled_contents = 
		Object.keys(_contents)
		.map(c=>{
			return _contents[c].enable ? {..._contents[c], content_type:c} : null
		})
		.filter(c=>c)
		.map(c=>{
			return {...c, id: c.content_type}
		});

	const _content_label = _contents[content_type]?.label || __('Content');
	
	return <InventoryWrapper 
		content_label={_content_label} 
		content_type={content_type}
		gallery_permalink={state.gallery_permalink}
		navigate={navigate}
		params={params}
	>
		<div className={'d-flex align-items-center justify-content-space-between flex-wrap-wrap column-gap-15 row-gap-15 margin-top-10 margin-bottom-10'.classNames()}>
			
			<div className={'d-flex align-items-center column-gap-8'.classNames()}>
				<a 
					href={state.gallery_permalink}
					className={"d-flex align-items-center column-gap-8 color-text-90 interactive padding-vertical-10 position-sticky top-0".classNames()}
					target='_blank'
				>
					<span className={'font-size-24 font-weight-600 letter-spacing-3'.classNames()}>
						{sprintf(__('%s Inventory'), _content_label || '')}
					</span>
				</a>

				<Link 
					to={getDashboardPath(`inventory/${content_type}/editor/new`)}
					className={'sicon sicon-add-circle font-size-24 color-material'.classNames()}
				/>
			</div>
			
			<div className={'d-flex align-items-center column-gap-10'.classNames()}>
				{
					enabled_contents.length < 2 ? null :
					<div>
						<DropDown
							placeholder={__('Content Type')}
							value={content_type}
							clearable={false}
							options={enabled_contents}
							onChange={type=>{
								navigate(getDashboardPath(`inventory/${type}`));
								setLocalValue('selected_inventory_type', type);
							}}
						/>
					</div>
				}
				
				<div>
					<DropDown
						placeholder={__('Status')}
						onChange={v=>setFilter('content_status', v)}
						value={filterState.content_status}
						options={Object.keys(content_statuses).map(status=>{
							return {
								id: status,
								label: content_statuses[status]
							}
						})}
					/>
				</div>
				<div>
					<TextField
						placeholder={__('Enter Keyword')}
						onChange={key=>setFilter('search', key)}
						value={filterState.search}
						type='search'
					/>
				</div>
			</div>
		</div>

		<table 
			className={'table'.classNames(style) + 'table '.classNames()} 
		>
			<thead>
				<tr>
					<th>{__('Title')}</th>
					{!is_admin ? null : <th className={'white-space-nowrap'.classNames()}>{__('Contributor')}</th>}
					<th className={'white-space-nowrap'.classNames()}>{__('Category')}</th>
					<th>{__('Price')}</th>
					{(!is_pro_active || content_type=='app') ? null : <th>{__('Bundled In')}</th>}
					{content_type == 'tutorial' ? null : <th>{__('Downloads')}</th>}
					<th>{__('Status')}</th>
					<th>{__('Created')}</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{
					state.contents.map((content) =>{
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
														!min_price ? null :
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

							{
								content_type == 'tutorial' ? null :
								<td data-th={__('Downloads')}>
									<span className={'color-text-70'.classNames()}>
										{download_count}
									</span>
								</td>
							}
							
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
					empty={!state.contents.length} 
					loading={state.fetching}
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
			(state.segmentation?.page_count || 0) < 2 ? null :
			<>
				<br/>
				<div className={'d-flex justify-content-center'.classNames()}>
					<Pagination
						onChange={(page) => setFilter('page', page)}
						pageNumber={filterState.page}
						pageCount={state.segmentation.page_count}
					/>
				</div>
			</>
		}
	</InventoryWrapper>
}
