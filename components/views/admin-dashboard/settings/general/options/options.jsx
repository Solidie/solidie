import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ToggleSwitch } from 'solidie-materials/toggle-switch/ToggleSwitch.jsx';
import { TextField } from 'solidie-materials/text-field/text-field.jsx';
import { __, getBack, isEmpty } from 'solidie-materials/helpers.jsx';
import { NumberField } from 'solidie-materials/number-field/index.js';
import { RadioCheckbox } from 'solidie-materials/radio-checkbox.jsx';
import { DropDown } from 'solidie-materials/dropdown/dropdown.jsx';
import { RenderExternal } from 'solidie-materials/render-external.jsx';
import tag_style from 'solidie-materials/tag-field/tag.module.scss';

import { ContextSettings } from '../general-settings.jsx';

import style from './options.module.scss';

export const label_class =
    'd-block font-size-15 font-weight-500 line-height-24 letter-spacing--16 color-text'.classNames();

export const hint_class =
    'd-block margin-top-3 font-size-14 font-weight-400 line-height-24 letter-spacing--15 color-text-50'.classNames();

function isTwoDimensionalArray(arr) {
    if (!Array.isArray(arr)) {
        return false; // Not an array
    }

    for (let i = 0; i < arr.length; i++) {
        if (!Array.isArray(arr[i])) {
            return false; // Element at index i is not an array
        }
    }

    return true; // All elements are arrays
}

export function OptionFields({fields=[], settings, onChange: _onChange}) {

    const { segment } = useParams();

    const { 
		settings: settings_context={}, 
		onChange: dispatchChange,
		resources = {}
	} = useContext(ContextSettings);

	const values = settings || settings_context[segment];
	
	const onChange=(name, value)=>{
		
		const {modifier} = fields.find(f=>f.name==name);
		if ( typeof modifier === 'function' ) {
			value = modifier(value);
		}

		_onChange ? _onChange(name, value) : dispatchChange(segment, name, value);
	}

    const satisfyLogic = (when=[]) => {
		if ( isTwoDimensionalArray(when) ) {
			return when.filter(w=>satisfyLogic(w)).length===when.length;
		}

        const pointer = when[0];
        const operator = when.length > 2 ? when[1] : '===';
        const operand = when[when.length > 2 ? 2 : 1];
        const value = values[pointer];

        let _return;

        switch (operator) {
            case '===':
                _return = value === operand;
                break;

            case '==':
                _return = value == operand;
                break;

            case 'in_array':
				const _value = Array.isArray(value) ? value : [];
                _return = Array.isArray(operand) ? operand.filter(o=>_value.indexOf(o)>-1).length : _value.indexOf(operand)>-1;
                break;
        }

        return _return;
    };

    return fields.map((field, i) => {
		
		const { 
			name,
			label, 
			type, 
			options: _options, 
			when, 
			direction = 'row',
			hint, 
			hint2, 
			placeholder, 
			min, 
			max, 
			decimal_point,
			disabled,
			multiple
		} = field;

		if (when && !satisfyLogic(when)) {
			return null;
		}

		const options = typeof _options === 'string' ? resources[_options] : _options;
		const field_value = !multiple ? values[name] : ( Array.isArray(values[name]) ? values[name] : [] );

		const label_text = (
			<div>
				<span className={label_class}>
					{label}
				</span>
				{
					!hint ? null :
					<span className={hint_class}>
						{hint}
					</span>
				}
			</div>
		);

		return (
			<div
				key={name}
				className={`d-flex ${direction === 'column' ? 'flex-direction-column row-gap-5' : 'flex-direction-row column-gap-15'} flex-wrap-wrap ${when ? 'fade-in' : ''}`.classNames()}
				data-cylector={`option-${name}`}
			>
				{
					type !== 'switch' ? null :
					<>
						<div className={'flex-1 margin-bottom-10'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-1 d-flex align-items-center column-gap-10'.classNames()}>
							<div>
								<ToggleSwitch
									checked={values[name] ? true : false}
									onChange={(enabled) => onChange(name, enabled)}
								/> 
							</div>
							<span className={'font-size-15 font-weight-400 line-height-24 letter-spacing--15 color-text'.classNames()}>
								{placeholder}
							</span>
						</div>
					</>
				}

				{
					['text', 'url', 'email', 'textarea'].indexOf(type)===-1 ? null :
					<>
						<div className={'flex-1'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-1'.classNames()}>
							<div>
								<TextField
									type={type}
									value={values[name] || ''}
									onChange={(v) => onChange(name, v)}
									placeholder={placeholder}
								/>
							</div>
							
							{
								!hint2 ? null :
								<div className={'d-block margin-top-5'.classNames()}>
									{hint2(values[name] || '')}
								</div>
							}
						</div>
					</>
				}

				{
					!(type === 'checkbox' || type == 'radio') ? null :
					<>
						<div className={'flex-1 margin-bottom-15'.classNames()}>
							{label_text}
						</div>
						<div
							className={'flex-1 d-flex flex-direction-column row-gap-10'.classNames()}
						>
							<RadioCheckbox
								type={type}
								name={name}
								value={values[name]}
								options={options}
								onChange={(value) => onChange(name, value)}
								spanClassName={'font-size-15 font-weight-400 line-height-24 letter-spacing--15 color-text'.classNames()}
							/>
						</div>
					</>
				}

				{
					type !== 'number' ? null :
					<>
						<div className={'flex-1'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-1'.classNames()}>
							<NumberField
								min={min}
								max={max}
								decimal_point={decimal_point}
								width='130px'
								disabled={disabled}
								value={values[name]}
								placeholder={placeholder}
								onChange={(v) => onChange(name, v)}
								name={name}
							/>
						</div>
					</>
				}

				{
					type !== 'color' ? null :
					<>
						<div className={'flex-1'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-1'.classNames()}>
							<input 
								type='color'
								value={values[name]}
								onChange={e=>onChange(name, e.currentTarget.value)}
							/>
						</div>
					</>
				}

				{
					type !== 'dropdown' ? null :
					<>
						<div className={'flex-1'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-1'.classNames()}>
							<DropDown
								value={!multiple ? values[name] : ''}
								onChange={(v) => onChange(name,  !multiple ? v : [...field_value, v])}
								options={!multiple ? options : options.filter(o=>field_value.indexOf(o.id)===-1)}
								placeholder={placeholder}
								clearable={false}
							/>

							{
								(!multiple || isEmpty(values[name])) ? null : 
								<div className={'margin-top-15'.classNames() + 'tag theme-tag'.classNames(tag_style)}>
									{
										values[name].map(v=>{
											return <div key={v} className={'d-flex align-items-center column-gap-8'.classNames()}>
												<span>{options.find(o=>o.id==v).label}</span>
												<i 
													className={'sicon sicon-times font-size-16 cursor-pointer'.classNames()}
													onClick={()=>onChange(name, field_value.filter(fv=>fv!=v))}
												></i>
											</div>
										})
									}
								</div>
							}
						</div>
					</>
				}
			</div>
		);
	});
}

export function Options() {

    const { 
		segment, 
		sub_segment 
	} = useParams();

	const {settings_fields, updateWholeSetting, settings={}} = useContext(ContextSettings);

    const {
		fields=[], 
		component, 
		overflow=true, 
		label,
		description,
		onToggle,
		is_enabled
	} = settings_fields[segment].segments[sub_segment];

	return <div>

		<div className={'padding-vertical-5'.classNames()}>
			<span
				className={'d-flex align-items-center column-gap-10 font-size-17 font-weight-600 color-text margin-bottom-10'.classNames()}
			>
				<span className={'d-flex align-items-center column-gap-10'.classNames()}>
					
					<Link 
						to={'/settings/'}
						className={'sicon sicon-arrow-left cursor-pointer color-text'.classNames()} 
						onClick={getBack}
					/>

					<span>
						{label}
					</span>

					{
						!onToggle ? null :
						<div 
							onClick={e=>e.stopPropagation()}
							data-cylector='segment-toggle'
							className={`d-flex`.classNames()}
						>
							<ToggleSwitch 
								onChange={checked=>onToggle(segment, sub_segment, checked)}
								checked={is_enabled}
							/>
						</div>
					}
				</span>
			</span>
			<span
				className={'d-block font-size-14 font-weight-400 line-height-22 letter-spacing--14 color-text-50'.classNames()}
			>
				{description}
			</span>
		</div>

		<div className={'section'.classNames(style) + 'padding-vertical-20 margin-auto'.classNames()}>
			<div 
				className={`position-relative ${overflow ? '' : 'overflow-hidden'} padding-30 bg-color-white box-shadow-thin`.classNames()}
				style={{borderRadius: '5px'}}
			>
				{
					component ? 
					<RenderExternal 
						component={component} 
						payload={{updateWholeSetting, settings, segment: sub_segment}}
						className={`fields-wrapper`.classNames(style)}/> 
					:
					<div className={`fields-wrapper`.classNames(style)}>
						<OptionFields fields={fields}/>
					</div>
				}
			</div>
		</div>
	</div>
}
