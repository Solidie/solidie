import React from 'react'

import { __, data_pointer, sprintf, getDashboardPath, isEmpty } from 'solidie-materials/helpers.jsx';
import { TextField } from 'solidie-materials/text-field/text-field.jsx';
import { DropDown } from "solidie-materials/dropdown/dropdown.jsx";

import * as style from './inventory.module.scss';

export const content_statuses = {
	draft: __('Draft'),
	publish: __('Published'), 
	unpublish: __('Unpublished'), 
	pending: __('Pending'), 
	rejected: __('Rejected'),
}

export const bulk_types = ['image', 'audio', 'video'];

export function InventoryFilters({navigate, enabled_contents, filterState, setFilter, gallery_permalink, bundles, content_type}) {
	
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

	const _contents = window[data_pointer]?.settings?.contents || {};
	const _content_label = _contents[content_type]?.label || __('Content');

	return <>
		<div className={'d-flex align-items-center flex-wrap-wrap column-gap-15 row-gap-15 margin-top-10 margin-bottom-10'.classNames()}>
			
			<div className={'flex-1 d-flex align-items-center column-gap-8'.classNames()}>
				<a 
					href={gallery_permalink}
					className={
						"d-flex align-items-center column-gap-8 padding-vertical-10".classNames() + 'inventory-link'.classNames(style)
					}
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
			
			{
				bulk_types.indexOf(content_type)===-1 ? null :
				<div>
					<span 
						className={'hover-underline cursor-pointer color-material-80 font-weight-500 interactive'.classNames()}
						onClick={()=>navigate(getDashboardPath(`/inventory/${content_type}/editor/bulk/`))}
					>
						+ Add Bulk
					</span>
				</div>
			}

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
								setFilter('content_type', type);
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

				{
					isEmpty(bundles) ? null :
					<div style={{maxWidth: '110px'}}>
						<DropDown
							placeholder={__('Bundle')}
							onChange={v=>setFilter('content_pack_plan', v)}
							value={filterState.content_pack_plan}
							options={bundles.map(bundle=>{
								return {
									id: bundle.plan.id,
									label: bundle.plan.plan_name
								}
							})}
						/>
					</div>
				}
				
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
	</>
}
