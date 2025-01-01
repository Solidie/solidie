import React, { useEffect, useState } from 'react'

import { request } from 'solidie-materials/request.jsx';
import { __, data_pointer, sprintf, getDashboardPath, getLocalValue, setLocalValue } from 'solidie-materials/helpers.jsx';

import { Initial } from '../type-selection/type-selection.jsx';
import { InventoryFilters } from './filter.jsx';
import { InventoryTable } from './table.jsx';

const {
	is_admin
} = window[data_pointer];

export const content_statuses = {
	draft: __('Draft'),
	publish: __('Published'), 
	unpublish: __('Unpublished'), 
	pending: __('Pending'), 
	rejected: __('Rejected'),
}

export const bulk_types = ['image', 'audio', 'video'];

export function Inventory({navigate, params={}}) {

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

	let {content_type = getLocalValue('selected_inventory_type')} = params;
	content_type = (!content_type || !enabled_contents.find(c=>c.content_type==content_type)) ? enabled_contents[0]?.content_type : content_type;

	const [state, setState] = useState({
		fetching: false,
		changing_status_for: null,
		contents: [],
		segmentation: null,
		gallery_permalink: null,
		bundles: [],
		error_message: null
	});

	const filterStateInitial = {
		page: 1,
		search: '',
		content_status: '',
		content_type,
		content_pack_plan: ''
	}
	const [filterState, setFilterState] = useState(filterStateInitial);

	const setFilter=(name, value)=>{
		setFilterState({
			...filterState,
			page: ['search', 'content_type'].indexOf(name)>-1 ? 1 : filterState.page,
			content_pack_plan: name=='content_type' ? '' : filterState.content_pack_plan,
			[name]: value
		});
	}

	const fetchContents=()=>{

		setState({
			...state,
			fetching: true
		});

		const payload = {
			...filterState, 
			segmentation: true, 
			order_by: 'newest'
		}

		request( 'getContentList', {filters: payload, is_admin}, resp=>{
			const {
				success, 
				data: {
					segmentation = {}, 
					contents=[],
					gallery_permalink,
					bundles=[]
				}
			} = resp;

			setState({
				...state,
				contents,
				fetching: false,
				segmentation,
				gallery_permalink,
				bundles
			});
		} );
	}
	
	useEffect(()=>{
		if ( filterState.content_type ) {
			setLocalValue('selected_inventory_type', filterState.content_type);
			fetchContents();
		}
	}, [filterState]);

	if ( !content_type ) {
		return <div>
			<div>
				<strong className={"d-flex align-items-center column-gap-8 color-text padding-vertical-10 position-sticky top-0".classNames()}>
					<span className={'font-size-24 font-weight-600 letter-spacing-3'.classNames()}>
						{__('Inventory')}
					</span>
				</strong>
			</div>
			<div 
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
		</div>
	}

	return <>
		<InventoryFilters
			{...{
				navigate, 
				enabled_contents, 
				filterState, 
				setFilter, 
				gallery_permalink: state.gallery_permalink, 
				bundles: state.bundles, 
				content_type
			}}
		/>

		<InventoryTable
			{...{
				navigate, 
				content_type, 
				fetchContents, 
				filterState, 
				setFilter, 
				contents: state.contents, 
				segmentation: state.segmentation, 
				fetching: state.fetching,
				updateContents: contents => setState({...state, contents})
			}}
		/>
	</>
}
