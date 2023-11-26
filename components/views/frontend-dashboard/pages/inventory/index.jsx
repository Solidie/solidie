import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { request } from 'crewhrm-materials/request.jsx';
import { __, data_pointer, sprintf } from 'crewhrm-materials/helpers.jsx';
import { Conditional } from 'crewhrm-materials/conditional.jsx';

import { Tabs } from '../../../../materials/tabs/tabs.jsx';

import { getDashboardPath } from '../../index.jsx';

export function InventoryWrapper({children}) {

	const {content_type} = useParams();

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
				navigate(first, {replace: true});
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

	return state.error_message || <div className={"flex flex-col gap-4 width-p-100 height-p-100".classNames()}>
		<div className={"flex justify-between items-center width-p-100".classNames()}>
			<h1 className={"font-size-24 font-weight-600 color-text letter-spacing-3".classNames()}>
				{__('Inventory')}
			</h1>

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
		loading: false,
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
			loading: true
		});

		request( 'getContentList', {...state.filters, content_type}, response=>{
			let {contents=[]} = response?.data || {};

			setState({
				...state,
				contents,
				loading: false
			});
		} );
	}

	useEffect(()=>{
		if ( content_type ) {
			fetchContents();
		}
	}, [content_type]);

	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	
	return <InventoryWrapper>
		<div className={"flex flex-col width-p-100 gap-4 min-h-max".classNames()}>
			<div className={'margin-top-10 margin-bottom-10'.classNames()}>
				<Link to={getDashboardPath(`inventory/${content_type}/editor/new`)}>
					<span className={'font-weight-500 cursor-pointer hover-underline'.classNames()}>
						<i className={'ch-icon ch-icon-add-circle'.classNames()}></i> {sprintf(__('Add New %s'), _content.label || __('Content'))} 
					</span>
				</Link>
			</div>
			
			<table className={'solidie-ui-table solidie-ui-table-responsive'.classNames()}>
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
									<span className={"d-block font-weight-40".classNames()}>
										{content_title}
									</span>
									<div className={'d-flex align-items-center column-gap-10'.classNames()}>
										<i className={'ch-icon ch-icon-trash font-size-17 cursor-pointer'.classNames()}></i>
										<i className={'ch-icon ch-icon-edit-2 font-size-17 cursor-pointer'.classNames()}></i>
										<i className={'ch-icon ch-icon-hierarchy font-size-17 cursor-pointer'.classNames()}></i>
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
		</div>
	</InventoryWrapper>
}
