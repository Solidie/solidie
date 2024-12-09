import React, { useState } from 'react';

import { TagField } from 'solidie-materials/tag-field/tag-field.jsx';
import { RadioCheckbox } from 'solidie-materials/radio-checkbox.jsx';
import { __, isEmpty } from 'solidie-materials/helpers.jsx';
import { DropDown } from 'solidie-materials/dropdown/dropdown';

import style from './index.module.scss';

function Filters({_setFilter, filterList, filters}) {
	return Object.keys(filterList).map((filter_key) => {
		let { section_label, selection_type, options = [] } = filterList[filter_key];

		return isEmpty(options) ? null : <div
			key={filter_key}
			data-cylector={filter_key}
			className={'margin-bottom-23 overflow-auto'.classNames()}
		>
			<span
				className={'d-block font-size-14 font-weight-700 line-height-24 letter-spacing--14 color-text-80 margin-bottom-16 text-transform-uppercase'.classNames()}
			>
				{section_label}
			</span>

			{
				selection_type !== 'list' ? null :
				options.map((option) => {
					let { id, label, count } = option;
					let is_active = filters[filter_key] == id;
					return <span
						key={id}
						className={`d-block font-size-14 cursor-pointer margin-bottom-18 font-weight-500 ${is_active ? 'color-text' : 'color-text-80'}`.classNames()}
						onClick={() => _setFilter(filter_key, id)}
					>
						{label} {count ? `(${count})` : null}
					</span>
				})
			}

			{
				selection_type !== 'tag' ? null :
				<div>
					<TagField
						behavior="radio"
						options={options}
						value={filters[filter_key]}
						onChange={(v) => _setFilter(filter_key, v)}
					/>
				</div>
			}

			{
				!(selection_type == 'radio' || selection_type == 'checkbox') ? null :
				<div>
					<RadioCheckbox
						name={filter_key}
						type={selection_type}
						options={options}
						value={filters[filter_key]}
						onChange={(v) => _setFilter(filter_key, v)}
					/>
				</div>
			}

			{
				selection_type !== 'dropdown' ? null :
				<div>
					<DropDown
						name={filter_key}
						options={options}
						value={filters[filter_key]}
						onChange={(v) => _setFilter(filter_key, v)}
					/>
				</div>
			}
		</div>
	})
}

function MobileFilter({_setFilter, filterList, filters}) {
	
	const [filter, setFilter] = useState(null);

	return <div className={'mobile-filter'.classNames(style)}>
		{
			!filter ? null : 
			<div className={'mobile-popup'.classNames(style)} onClick={()=>setFilter(null)}>
				<div onClick={e=>e.stopPropagation()}>
					<div className={'header-bar'.classNames(style) + 'd-flex align-items-center column-gap-20'.classNames()}>
						<div className={'flex-1'.classNames()}>
							<strong className={'font-size-18 font-weight-700 line-height-24 letter-spacing--18 color-text'.classNames()}>
								{filter===true ? __('Filter') : filterList[filter].section_label}
							</strong>
						</div>
						<span 
							className={'color-material font-size-16 font-weight-500 line-height-24 letter-spacing--16  cursor-pointer'.classNames()}
							onClick={()=>{
								_setFilter({});
								setFilter(null);
							}}
						>
							{__('Clear')}
						</span>
						<span className={`border-left-1 b-color-text-40`.classNames()} style={{paddingLeft: '20px'}}>
							<span 
								className={'color-material font-size-16 font-weight-500 line-height-24 letter-spacing--16 cursor-pointer'.classNames()}
								onClick={()=>{
									setFilter(null);
								}}
							>
								{__('Done')}
							</span>
						</span>
					</div>
					<div className={'filters'.classNames(style)}>
						<Filters {...{
							_setFilter, 
							filters, 
							filterList: filter===true ? filterList : {[filter]: filterList[filter]}
						}}/>
					</div>
				</div>
			</div>
		}

		<div className={'d-flex flex-wrap-wrap align-items-center column-gap-10 row-gap-10'.classNames()}>
			<div 
				className={`filter-control ${Object.keys(filters).length>1 ? 'has-change' : ''}`.classNames(style)} 
				onClick={()=>setFilter(true)}
			>
				<i className={'sicon sicon-candle font-size-20'.classNames()}></i>
			</div>
			{
				/* Object.keys(filterList).map((filter_key) => {
					const { section_label, selection_type, options = [] } = filterList[filter_key];
					const has_change = ! isEmpty( filters[filter_key] );
					const selected_label = has_change ? filterList[filter_key].options.find(o=>o.id==filters[filter_key])?.label : null;

					return !options.length ? null : <div 
						key={filter_key} 
						className={`option-name ${has_change ? 'has-change' : ''}`.classNames(style)}
						onClick={()=>setFilter(filter_key)}
					>
						<span className={'font-size-14 font-weight-500 line-height-24 letter-spacing--14'.classNames()}>
							{selected_label || section_label}
						</span>
						<i className={'sicon sicon-arrow-down font-size-20 vertical-align-middle margin-left-10'.classNames()}></i>
					</div>
				}) */
			}
		</div>
	</div>
}

export function Sidebar({ is_mobile, setFilter, filters, filterList }) {
	
    const _setFilter = (name, value) => {
        setFilter(name, filters[name] == value ? null : value);
    };

	const prop_drill = {
		_setFilter, 
		filterList, 
		filters
	}

	const show_clearer = !is_mobile && Object.keys(filters).filter(k=>k!=='country_code' && !isEmpty(filters[k])).length;
	const is_empty     = !Object.keys(filterList).filter((filter_key) => !isEmpty(filterList[filter_key].options)).length;

    return is_empty ? null : <div data-cylector="sidebar" className={'sidebar'.classNames(style)}>
		{
			is_mobile ? 
				<MobileFilter  {...prop_drill}/> : 
				<Filters {...prop_drill}/>
		}

		{
			!show_clearer ? null :
			<span 
				className={'d-flex align-items-center column-gap-6 font-size-14 color-text-80 cursor-pointer'.classNames()} 
				onClick={()=>setFilter({})} 
				style={{marginLeft: '-3px'}}
				data-cylector="clear-content-filter"
			>
				<i className={'sicon sicon-times font-size-18'.classNames()}></i> {__('Clear Filters')}
			</span>
		}
	</div>
}
