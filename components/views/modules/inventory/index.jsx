import React, { useContext, useEffect, useState } from 'react'

import { request } from 'crewhrm-materials/request.jsx';
import { __, data_pointer, sprintf, formatDate, isEmpty } from 'crewhrm-materials/helpers.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { Pagination } from 'crewhrm-materials/pagination/pagination.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';

import { Tabs } from 'solidie-materials/tabs/tabs.jsx';
import { TableStat } from 'solidie-materials/table-stat.jsx';
import { getDashboardPath } from 'solidie-materials/helpers.jsx';

import table_style from 'solidie-materials/styles/table.module.scss';
import style from './inventory.module.scss';

const {readonly_mode, is_admin} = window[data_pointer];

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
						<a href={window[data_pointer]?.permalinks?.settings} className={'button button-primary button-outlined button-small'.classNames()}>
							{__('Go to Content Types')}
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

	return <div>
		<div>
			<strong className={"d-flex align-items-center column-gap-8 color-text padding-vertical-10 position-sticky top-0".classNames()}>
				<span className={'font-size-24 font-weight-600 letter-spacing-3'.classNames()}>
					{__('Inventory')} {content_label ? <> - <a href={gallery_permalink} target='_blank' className={'hover-underline'.classNames()}>{content_label}</a></> : null}
				</span>
			</strong>

			{
				enabled_contents.length < 2 ? null :
				<Tabs 
					tabs={enabled_contents} 
					active={content_type} 
					onChange={tab=>navigate(getDashboardPath('inventory/'+tab))}/>
			}
		</div>
		
		{
			content_type!=='tutorial' ? children : <div className={'padding-vertical-40 text-align-center'.classNames()}>
				{__('Tutorial Management is an upcoming feature')}
			</div>
		}
	</div>
}

export function Inventory({navigate, params={}}) {

	const {content_type} = params;
	const {ajaxToast} = useContext(ContextToast);

	const [state, setState] = useState({
		fetching: false,
		contents: [],
		segmentation: null,
		gallery_permalink: null,
		content_type: content_type
	});

	const filterStateInitial = {
		page: 1,
		limit: null,
		search: ''
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
		if ( ! window.confirm('Sure to delete?') ) {
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

	function Link({children, className, title, to}) {
		return <a 
			className={className} 
			title={title} 
			href={to}
			onClick={e=>{e.preventDefault(); navigate(to);}}
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
		{
			// When no content created at all
			!state.contents.length ?
				<div className={'padding-vertical-40 text-align-center'.classNames()}>
					{
						state.fetching ? <div>
							<LoadingIcon center={true}/>
						</div>
						:
						<>
							<strong className={'d-block font-size-14 margin-bottom-20'.classNames()}>
								{sprintf(__('No %s found'), _content_label)}
							</strong>
							<Link to={getDashboardPath(`inventory/${content_type}/editor/new`)} className={'button button-primary button-small'.classNames()}>
								{__('Add New')}
							</Link>
						</>
						
					}
				</div> 
				: 
				<>
					<div className={'d-flex align-items-center margin-top-10 margin-bottom-10'.classNames()}>
						<div className={'flex-1'.classNames()}>
							<Link to={getDashboardPath(`inventory/${content_type}/editor/new`)}>
								<span className={'font-weight-500 cursor-pointer hover-underline'.classNames()}>
									<i className={'ch-icon ch-icon-add-circle'.classNames()}></i> {sprintf(__('Add New %s'), _content_label)} 
								</span>
							</Link>
						</div>
						
						<div className={'d-flex align-items-center column-gap-5'.classNames()}>
							<strong className={'white-space-nowrap'.classNames()}>
								{__('Search')}
							</strong>
							<TextField
								placeholder={__('Enter Keyword')}
								onChange={key=>setFilter('search', key)}
								value={filterState.search}
								style={{height: '35px'}}/>
						</div>
					</div>

					<table 
						className={'table'.classNames(style) + 'table'.classNames(table_style)} 
						style={{background: 'rgb(128 128 128 / 3.5%)'}}
					>
						<thead>
							<tr>
								<th>{__('Title')}</th>
								{!is_admin ? null : <th>{__('Contributor')}</th>}
								<th>{__('Downloads')}</th>
								<th>{__('Category')}</th>
								{!is_admin ? null : <th>{__('Monetization')}</th>}
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
										contributor_name,
										contributor_avatar_url,
										release
									} = content;

									const thumbnail_url = media?.thumbnail?.file_url;

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
														
														<span className={'color-text-lighter'.classNames()}>|</span>
														<span
															className={'action'.classNames(style) + 'cursor-pointer d-inline-flex align-items-center column-gap-8'.classNames()}
															title={__('Delete')}
															onClick={()=>!readonly_mode && deleteContent(content_id)}
														>
															<i className={'ch-icon ch-icon-trash color-error font-size-15'.classNames()}></i>
														</span>
														
														<span className={'color-text-lighter'.classNames()}>|</span>
														<a 
															className={'action'.classNames(style) + 'cursor-pointer d-inline-flex align-items-center column-gap-8'.classNames()} 
															title={__('Download')}
															href={release?.download_url || '#'}
															target='_blank'
														>
															<i className={'ch-icon ch-icon-download font-size-15'.classNames()}></i>
														</a>
													</div>
												</div>
											</div>
										</td>

										{
											!is_admin ? null :
											<td data-th={__('Contributor')}>
												<div className={'d-flex align-items-center column-gap-8'.classNames()}>
													<img src={contributor_avatar_url} style={{width: '25px', borderRadius: '50%', overflow: 'hidden'}}/>
													<span>
														{contributor_name}
													</span>
												</div>
											</td>
										}

										<td data-th={__('Downloads')}>
											{download_count}
										</td>

										<td data-th={__('Category')}>
											{category_name || <>&nbsp;</>}
										</td>
										
										{
											!is_admin ? null :
											<td data-th={__('Monetization')}>
												{product_id ? __('Paid') : __('Free')}
											</td>
										}
										
										<td data-th={__('Status')}>
											<div>
												{content_status}
											</div>
										</td>
										<td data-th={__('Created')}>
											{formatDate(created_at, window[data_pointer]?.date_format + ' ' + window[data_pointer]?.time_format)}
										</td>
									</tr>
								})
							}
							<TableStat 
								empty={!state.contents.length} 
								loading={state.fetching}/>
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
				</>
		}
	</InventoryWrapper>
}
