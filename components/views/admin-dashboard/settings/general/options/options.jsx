import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ToggleSwitch } from 'crewhrm-materials/toggle-switch/ToggleSwitch.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { FileUpload } from 'crewhrm-materials/file-upload/file-upload.jsx';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { NumberField } from 'crewhrm-materials/number-field/index.js';
import { RadioCheckbox } from 'crewhrm-materials/radio-checkbox.jsx';
import { DropDown } from 'crewhrm-materials/dropdown/dropdown.jsx';
import { RenderMedia } from 'crewhrm-materials/render-media/render-media.jsx';
import { RenderExternal } from 'crewhrm-materials/render-external.jsx';

import { ContextSettings } from '../general-settings.jsx';

import style from './options.module.scss';

export const label_class =
    'd-block font-size-15 font-weight-500 line-height-24 letter-spacing--16 color-text'.classNames();

export const hint_class =
    'd-block margin-top-3 font-size-15 font-weight-400 line-height-24 letter-spacing--15 color-text-light'.classNames();

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
    const { settings: settings_context={}, onChange: dispatchChange } = useContext(ContextSettings);
    const { resources = {} } = {};
	
	const values = settings || settings_context[segment];
	
	const onChange=(name, value)=>{
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
			options, 
			when, 
			direction = 'column',
			hint, 
			hint2, 
			placeholder, 
			min, 
			max, 
			disabled,
			WpMedia
		} = field;

		if (when && !satisfyLogic(when)) {
			return null;
		}

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
				className={`d-flex ${direction === 'column' ? 'flex-direction-column' : 'flex-direction-row align-items-center column-gap-15'} flex-wrap-wrap ${when ? 'fade-in' : ''}`.classNames()}
				data-cylector={`option-${name}`}
			>
				{
					type !== 'switch' ? null :
					<>
						<div className={'flex-1 margin-bottom-10'.classNames()}>
							{label_text}
						</div>
						<div className={'d-flex align-items-center column-gap-10'.classNames()}>
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
						<div className={'flex-1'.classNames()}>{label_text}</div>
						<div className={'flex-1'.classNames()}>
							<TextField
								type={type}
								value={values[name] || ''}
								onChange={(v) => onChange(name, v)}
								placeholder={placeholder}
							/>
							<small>{hint2 ? hint2(values[name] || 'custom-path') : null}</small>
						</div>
					</>
				}

				{
					type !== 'image' ? null :
					<>
						<div className={'flex-1'.classNames()}>{label_text}</div>
						<div className={'flex-1'.classNames()}>
							{!values[name] ? (
								<FileUpload
									accept="image/*"
									WpMedia={WpMedia}
									onChange={(file) => onChange(name, file)}
								/>
							) : (
								<RenderMedia
									theme="singular"
									media={values[name]}
									onDelete={() => onChange(name, null)}
									overlay={false}
								/>
							)}
						</div>
					</>
				}

				{
					!(type === 'checkbox' || type == 'radio') ? null :
					<>
						<div className={'margin-bottom-15'.classNames()}>
							{label_text}
						</div>
						<div
							className={'d-flex flex-direction-column row-gap-10'.classNames()}
						>
							<RadioCheckbox
								type={type}
								name={name}
								value={values[name]}
								options={typeof options === 'string' ? resources[options] : options}
								onChange={(value) => onChange(name, value)}
								spanClassName={'font-size-15 font-weight-400 line-height-24 letter-spacing--15 color-text'.classNames()}
							/>
						</div>
					</>
				}

				{
					type !== 'number' ? null :
					<>
						<div className={'flex-5'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-2'.classNames()}>
							<NumberField
								min={min}
								max={max}
								disabled={disabled}
								value={values[name]}
								placeholder={placeholder}
								onChange={(v) => onChange(name, v)}
							/>
						</div>
					</>
				}

				{
					type !== 'dropdown' ? null :
					<>
						<div className={'flex-5'.classNames()}>
							{label_text}
						</div>
						<div className={'flex-2'.classNames()}>
							<DropDown
								value={values[name]}
								onChange={(v) => onChange(name, v)}
								options={typeof options === 'string' ? resources[options] : options}
								placeholder={placeholder}
								clearable={false}
							/>
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
		width='582px', 
		label,
		description,
		separator=true, 
	} = settings_fields[segment].segments[sub_segment];

	return <div>

		<div className={'padding-vertical-5'.classNames()}>
			<span
				className={'d-flex align-items-center column-gap-10 font-size-17 font-weight-600 color-text margin-bottom-10'.classNames()}
			>
				<span className={'d-flex align-items-center column-gap-10'.classNames()}>
					
					<Link 
						to={'/settings/'}
						className={'ch-icon ch-icon-arrow-left cursor-pointer color-text'.classNames()} 
					/>
					{label}
				</span>
			</span>
			<span
				className={'d-block font-size-14 font-weight-400 line-height-22 letter-spacing--14 color-text-light'.classNames()}
			>
				{description}
			</span>
		</div>

		<div className={'section'.classNames(style) + 'padding-vertical-20 margin-auto'.classNames()} style={{width}}>
			<div 
				className={`position-relative ${overflow ? '' : 'overflow-hidden'} padding-30 bg-color-white box-shadow-thin`.classNames()}
				style={{borderRadius: '5px'}}
			>
				{
					component ? 
					<RenderExternal 
						component={component} 
						payload={{updateWholeSetting, settings, segment: sub_segment}}
						className={`fields-wrapper ${separator ? 'separator' : ''}`.classNames(style)}/> 
					:
					<div className={`fields-wrapper ${separator ? 'separator' : ''}`.classNames(style)}>
						<OptionFields fields={fields}/>
					</div>
				}
			</div>
		</div>
	</div>
}
