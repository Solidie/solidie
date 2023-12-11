import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { request } from 'crewhrm-materials/request.jsx';
import { __, data_pointer, sprintf } from 'crewhrm-materials/helpers.jsx';
import { Conditional } from 'crewhrm-materials/conditional.jsx';
import { ContextToast } from 'crewhrm-materials/toast/toast.jsx';

import { Tabs } from '../../../materials/tabs/tabs.jsx';
import { getDashboardPath } from '../../admin-dashboard/inventory/inventory-backend.jsx';

import table_style from '../../../materials/styles/table.module.scss';
import style from './inventory.module.scss';
import { LoadingIcon } from 'crewhrm-materials/loading-icon/loading-icon.jsx';

export function InventoryWrapper({children, fetching}) {

	const {content_type} = useParams();
	const {ajaxToast} = useContext(ContextToast);

	const _contents = window[data_pointer]?.settings?.contents || {};
	const enabled_contents = Object.keys(_contents).map(c=>_contents[c].enable ? {..._contents[c], content_type:c} : null).filter(c=>c).map(c=>{return {...c, id: c.content_type}});
	const navigate = useNavigate();

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
					error_message: __('Please enable at least one content type for selling to see options here')
				});
			}
		} else if( ! enabled_contents.find(e=>e.content_type===content_type)?.enable ) {
			setState({
				...state, 
				error_message: __('The content type is not found or maybe disabled')
			});
		}
	}, []);

	return state.error_message || <div>
		<div>
			<strong className={"d-flex align-items-center column-gap-8 color-text padding-vertical-10 position-sticky top-0".classNames()}>
				<span className={'font-size-24 font-weight-600 letter-spacing-3'.classNames()}>
					{__('Inventory')} 
				</span>
				<LoadingIcon 
					show={fetching} 
					className={'margin-left-5 font-size-15'.classNames()}/>
			</strong>

			<Conditional show={enabled_contents.length>1}>
				<Tabs 
					tabs={enabled_contents} 
					active={content_type} 
					onChange={tab=>navigate(getDashboardPath('inventory/'+tab))}/>
			</Conditional>
		</div>
		
		{children}
	</div>
}

export function Inventory(props) {

	const {content_type} = useParams();

	const [state, setState] = useState({
		fetching: false,
		contents: [],
		filters: {
			page: 1,
			limit: 15,
			search: null
		}
	});

	const fetchContents=()=>{
		setState({
			...state,
			fetching: true
		});

		request( 'getContentList', {...state.filters, content_type}, response=>{
			let {contents=[]} = response?.data || {};

			setState({
				...state,
				contents,
				fetching: false
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

	useEffect(()=>{
		if ( content_type ) {
			fetchContents();
		}
	}, [content_type]);

	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	
	return <InventoryWrapper fetching={state.fetching}>
		<div className={'margin-top-10 margin-bottom-10'.classNames()}>
			<Link to={getDashboardPath(`inventory/${content_type}/editor/new`)}>
				<span className={'font-weight-500 cursor-pointer hover-underline'.classNames()}>
					<i className={'ch-icon ch-icon-add-circle'.classNames()}></i> {sprintf(__('Add New %s'), _content.label || __('Content'))} 
				</span>
			</Link>
		</div>
		
		<table className={'table'.classNames(style) + 'table table-bordered'.classNames(table_style)}>
			<thead>
				<tr>
					<th>{__('Title')}</th>
					<th>{__('Status')}</th>
				</tr>
			</thead>
			<tbody>
				{
					state.contents.map((content, idx) =>{
						let {content_id, content_title, thumbnail_url} = content;

						return <tr key={content_id}>
							<td data-th={__('Title')}>
								<span className={"d-block".classNames()}>
									{content_title}
								</span>
								<div className={'actions'.classNames(style) + 'd-flex align-items-center column-gap-10 margin-top-10'.classNames()}>
									<i 
										className={'ch-icon ch-icon-trash font-size-15 cursor-pointer'.classNames()} 
										title={__('Delete')}
										onClick={()=>deleteContent(content_id)}></i>

									<Link 
										className={'ch-icon ch-icon-edit-2 font-size-15 cursor-pointer'.classNames()} 
										title={__('Edit')}
										to={getDashboardPath(`inventory/${content_type}/editor/${content_id}/`)}/>
								</div>
							</td>
							<td data-th={__('Status')}>
								<div>
									Uppublished
								</div>
							</td>
						</tr>
					})
				}
			</tbody>
		</table>
	</InventoryWrapper>
}
