import React, { useContext, useEffect, useState } from 'react'

import { request } from 'crewhrm-materials/request.jsx';
import { __, data_pointer, sprintf, formatDateTime, isEmpty, getDashboardPath, currency_symbol } from 'crewhrm-materials/helpers.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { Pagination } from 'crewhrm-materials/pagination/pagination.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { Tabs } from 'crewhrm-materials/tabs/tabs.jsx';
import { TableStat } from 'crewhrm-materials/table-stat.jsx';
import { DropDown } from 'crewhrm-materials/dropdown/dropdown.jsx';
import {DropDownStatus} from 'crewhrm-materials/dropdown-status/dropdown-status.jsx';

import style from './inventory.module.scss';
import { getPriceRange } from '../../frontend/gallery/generic-card/generic-card.jsx';

const {readonly_mode, is_admin, is_pro_active} = window[data_pointer];

export const content_statuses = {
	draft: __('Draft'),
	publish: __('Published'), 
	unpublish: __('Unpublished'), 
	pending: __('Pending'), 
	rejected: __('Rejected'),
	banned: __('Banned')
}

const contributors_status = ['publish', 'unpublish'];

export function InventoryWrapper({children, content_label, gallery_permalink, navigate, params={}}) {

	const {content_type} = params;

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
		if ( ! content_type ) {
			const first = enabled_contents[0]?.content_type;
			if ( first ) {
				navigate(getDashboardPath('inventory/'+first), {replace: true});
			} else {
				setState({
					...state, 
					error_message: <div className={'text-align-center padding-vertical-40'.classNames()}>
						<span className={'d-block margin-bottom-10'.classNames()}>
							{__('To showcase your contents, please enable preferred content types first.')}
						</span>
						<a 
							href={window[data_pointer]?.permalinks?.settings} 
							className={'button button-primary button-outlined button-small'.classNames()}
							target='_blank'
						>
							{__('Go to Settings')}
						</a>
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

	return <div style={{maxWidth: '1200px', margin: 'auto'}}>
		<div>
			<strong className={"d-flex align-items-center column-gap-8 color-text padding-vertical-10 position-sticky top-0".classNames()}>
				<span className={'font-size-24 font-weight-600 letter-spacing-3'.classNames()}>
					{__('Inventory')} {content_label ? <> - <a href={gallery_permalink} target='_blank' className={'hover-underline'.classNames()}>{content_label}</a></> : null}
				</span>
			</strong>

			{
				enabled_contents.length < 2 ? null :
				<Tabs 
					theme="transparent"
					tabs={enabled_contents} 
					active={content_type} 
					onNavigate={tab=>navigate(getDashboardPath('inventory/'+tab))}/>
			}
		</div>
		
		{children}
	</div>
}

export function Inventory({navigate, params={}}) {

	const {content_type} = params;
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
		if ( ! window.confirm('Sure to delete? All the linked data also will be deleted permanently.') ) {
			return;
		}

		request('deleteContent', {content_id}, resp=>{
			if (!resp.success) {
				ajaxToast(resp);
			} else {
				fetchContents();
			}
		});
	}

	const changeContentStatus=(content_id, status)=>{

		if ( ! window.confirm(__('Sure to change status?')) ) {
			return;
		}

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

	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	const _content_label = _content.label || __('Content');
	
	return <InventoryWrapper 
		content_label={_content_label} 
		content_type={content_type}
		gallery_permalink={state.gallery_permalink}
		navigate={navigate}
		params={params}
	>
		<div className={'d-flex align-items-center margin-top-10 margin-bottom-10'.classNames()}>
			<div className={'flex-1'.classNames()}>
				<Link to={getDashboardPath(`inventory/${content_type}/editor/new`)}>
					<span className={'font-weight-500 cursor-pointer hover-underline'.classNames()}>
						<i className={'ch-icon ch-icon-add-circle'.classNames()}></i> {sprintf(__('Add New %s'), _content_label)} 
					</span>
				</Link>
			</div>
			
			<div className={'d-flex align-items-center column-gap-10'.classNames()}>
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
			className={'table'.classNames(style) + 'table'.classNames()} 
			style={{background: 'rgb(128 128 128 / 3.5%)'}}
		>
			<thead>
				<tr>
					<th>{__('Title')}</th>
					{!is_admin ? null : <th className={'white-space-nowrap'.classNames()}>{__('Contributor')}</th>}
					<th className={'white-space-nowrap'.classNames()}>{__('Category')}</th>
					{!is_pro_active ? null : <th>{__('Price')}</th>}
					<th>{__('Status')}</th>
					<th>{__('Created')}</th>
				</tr>
			</thead>
			<tbody>
				{
					state.contents.map((content, idx) =>{
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
						const status_readonly = !is_admin ? contributors_status.indexOf(content_status)===-1 : content_status=='unpublish';
						
						// Get price range
						const price_range = getPriceRange(plans, true);
						const {
							min:{sale_price: min_price},
							max: {sale_price: max_price},
							packs=[]
						} = price_range;

						return <tr key={content_id}>
							<td data-th={__('Content')} style={{paddingTop: '20px', paddingBottom: '20px'}}>
								<div className={'d-flex column-gap-15'.classNames()}>
									{
										!thumbnail_url ? null :
										<div>
											<img 
												src={thumbnail_url} 
												style={{width: '30px', height: 'auto', borderRadius: '2px'}}/>
										</div>
									}
									
									<div className={'flex-1'.classNames()}>
										<a href={content_permalink} target='_blank' className={"d-block font-size-14 font-weight-600".classNames()}>
											{content_title}
										</a>
										<div className={'actions'.classNames(style) + 'd-flex align-items-center column-gap-10 margin-top-10'.classNames()}>
											<Link 
												className={'action'.classNames(style) + 'cursor-pointer d-inline-flex align-items-center column-gap-8'.classNames()} 
												title={__('Edit')}
												to={getDashboardPath(`inventory/${content_type}/editor/${content_id}/`)}
											>
												<i className={'ch-icon ch-icon-edit-2 font-size-15'.classNames()}></i>
											</Link>
											
											{
												!is_admin ? null :
												<>
													<span className={'color-text-lighter'.classNames()}>|</span>
													<span
														className={'action'.classNames(style) + 'cursor-pointer d-inline-flex align-items-center column-gap-8'.classNames()}
														title={__('Delete')}
														onClick={()=>!readonly_mode && deleteContent(content_id)}
													>
														<i className={'ch-icon ch-icon-trash color-error font-size-15'.classNames()}></i>
													</span>
												</>
											}
											
											<span className={'color-text-lighter'.classNames()}>|</span>
											<span className={'d-inline-flex align-items-center column-gap-8'.classNames()}>
												<a 
													className={'action'.classNames(style) + 'cursor-pointer ch-icon ch-icon-download font-size-15'.classNames()} 
													title={__('Download')}
													href={release?.download_url || '#'}
												></a>
												<span className={'font-size-14 color-text-light'.classNames()}>
													{download_count}
												</span>
											</span>
										</div>
									</div>
								</div>
							</td>

							{
								!is_admin ? null :
								<td data-th={__('Contributor')}>
									<div className={'d-flex align-items-center column-gap-8'.classNames()}>
										<img src={avatar_url} style={{width: '25px', borderRadius: '50%', overflow: 'hidden'}}/>
										<span>
											{display_name}
										</span>
									</div>
								</td>
							}

							<td data-th={__('Category')}>
								{category_name || <>&nbsp;</>}
							</td>
							
							{
								!is_pro_active ? null :
								<td data-th={__('Price')}>
									<div>
										{
											monetization !== 'paid' ? __('Free') :
											<>
												<div className={'white-space-nowrap'.classNames()}>
													{currency_symbol}{min_price} {max_price>min_price ? <> - {currency_symbol}{max_price}</> : null}
												</div>

												{
													! packs.length ? null :
													<div className={'margin-top-10'.classNames()}>
														<strong className={'d-block'.classNames()}>
															{__('Supported Bundles:')}
														</strong>
														<ul>
															{
																packs.map(plan=>{
																	const {plan_name} = plan?.plan || {};
																	return !plan_name ? null : <li key={plan.variation_id}>
																		{plan_name}
																	</li>
																})}
														</ul>
													</div>
												}
											</>
										}
									</div>
								</td>
							}
							
							<td data-th={__('Status')}>
								<div className={'d-flex align-items-center column-gap-10'.classNames()}>
									<DropDownStatus
										placeholder={__('Select Status')}
										value={content_status}
										onChange={v=>changeContentStatus(content_id, v)}
										disabled={status_readonly || state.changing_status_for}
										options={
											Object.keys(content_statuses).filter(s=>s!='draft' && (is_admin ? s!='unpublish' : contributors_status.indexOf(s)>-1)).map(status=>{
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
								{formatDateTime(created_at)}
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
				<div className={'d-flex justify-content-end'.classNames()}>
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
