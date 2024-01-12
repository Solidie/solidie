import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { ToggleSwitch } from 'crewhrm-materials/toggle-switch/ToggleSwitch.jsx';
import { TextField } from 'crewhrm-materials/text-field/text-field.jsx';
import { FileUpload } from 'crewhrm-materials/file-upload/file-upload.jsx';
import { __ } from 'crewhrm-materials/helpers.jsx';
import { NumberField } from 'crewhrm-materials/number-field';
import { RadioCheckbox } from 'crewhrm-materials/radio-checkbox.jsx';
import { DropDown } from 'crewhrm-materials/dropdown/dropdown.jsx';
import { RenderMedia } from 'crewhrm-materials/render-media/render-media.jsx';
import { ListManager } from 'crewhrm-materials/list-manager/list-manager.jsx';
import { AddressFields } from 'crewhrm-materials/address-fields.jsx';
import { RenderExternal } from 'crewhrm-materials/render-external.jsx';

import { settings_fields } from '../field-structure.jsx';
import { ContextSettings } from '../general-settings.jsx';

import style from './options.module.scss';

const label_class =
    'd-block font-size-15 font-weight-500 line-height-24 letter-spacing--16 color-text'.classNames();

const hint_class =
    'd-block margin-top-3 font-size-15 font-weight-400 line-height-24 letter-spacing--15 color-text-light'.classNames();

function OptionFields({fields=[], vertical, separator, is_group=false}) {
    const { values = {}, onChange } = useContext(ContextSettings);
    const { resources = {} } = {};
	
	const highlight_ref = useRef();
	const highlight_field = new URL(window.location.href).searchParams.get("highlight");

	useEffect(()=>{
		if ( highlight_ref?.current ) {
			highlight_ref.current.scrollIntoView(true);
			highlight_ref.current.classList.add('highlight'.classNames(style).split(' ')[0] || '');
		}
	}, [highlight_ref]);

    const satisfyLogic = (when) => {
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
        }

        return _return;
    };

    return fields.map((field, i) => {
		// Render grouped fields in same line horizontally
		if ( Array.isArray(field) ) {
			return <div key={i} className={'d-flex align-items-end column-gap-20'.classNames()}>
				{field.map(f=>{
					return <div key={f.name} className={'flex-1'.classNames()}>
						<OptionFields fields={[f]} is_group={true} vertical={true}/>
					</div> 
				})}
			</div>
		}

		const { 
			name,
			label, 
			type, 
			add_text=__('Add New'),
			key_map={},
			options, 
			when, 
			direction, 
			hint, 
			placeholder, 
			min, 
			max, 
			disabled,
			WpMedia
		} = field;

		const show_separator = separator && !is_group && i !== fields.length - 1;

		if (when && !satisfyLogic(when)) {
			return null;
		}

		const label_text = (
			<div className={`${vertical ? 'margin-bottom-10' : ''}`.classNames()}>
				<span className={label_class}>{label}</span>
				{(hint && <span className={hint_class}>{hint}</span>) || null}
			</div>
		);

		return (
			<div
				key={name}
				className={`${vertical ? '' : 'd-flex'} ${
					direction === 'column'
						? 'flex-direction-column'
						: 'flex-direction-row align-items-center'
				} flex-wrap-wrap ${
					show_separator ? 'padding-vertical-25 border-bottom-1 b-color-tertiary' : 'padding-vertical-10'
				} ${when ? 'fade-in' : ''}`.classNames()}
				ref={highlight_field===name ? highlight_ref : null}
			>
				{/* Toggle switch option */}
				{(type === 'switch' && (
					<>
						<div className={'flex-1'.classNames()}>{label_text}</div>
						<div>
							<ToggleSwitch
								checked={values[name] ? true : false}
								onChange={(enabled) => onChange(name, enabled)}
							/>
						</div>
					</>
				)) ||
					null}

				{/* Text input field */}
				{(['text', 'url', 'email'].indexOf(type)>-1 && (
					<>
						<div className={'flex-1'.classNames()}>{label_text}</div>
						<div className={'flex-1'.classNames()}>
							<TextField
								value={values[name] || ''}
								onChange={(v) => onChange(name, v)}
								placeholder={placeholder}
							/>
						</div>
					</>
				)) ||
					null}

				{/* Image upload */}
				{type === 'image' ? (
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
				) : null}

				{/* Checkbox options */}
				{((type === 'checkbox' || type == 'radio') && (
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
				)) ||
					null}

				{/* Number field options */}
				{type === 'number' ? (
					<>
						<div className={'flex-5'.classNames()}>{label_text}</div>
						<div className={'flex-2'.classNames()}>
							<NumberField
								min={min}
								max={max}
								disabled={disabled}
								value={values[name]}
								onChange={(v) => onChange(name, v)}
							/>
						</div>
					</>
				) : null}

				{type == 'dropdown' ? (
					<>
						<div className={'flex-5'.classNames()}>{label_text}</div>
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
				) : null}
			</div>
		);
	});
}

export function Options() {
    const { segment, sub_segment } = useParams();
    const { sections={}, component, overflow=true, width='582px', useWrapper=true } = settings_fields[segment].segments[sub_segment];

	const wrapper_attrs = {
		className: `position-relative ${overflow ? '' : 'overflow-hidden'} padding-30 bg-color-white box-shadow-thin`.classNames(),
		style: {borderRadius: '5px'}
	}

	function Wrapper({children}) {
		return !useWrapper ? children : <div className={'section'.classNames(style)} style={{width}}>
			<div {...wrapper_attrs}>
				{children}
			</div>
		</div>
	}

	return <div style={{marginTop: '79px', marginBottom: '79px'}}>
		{
			component ? <Wrapper>
					<RenderExternal component={component}/>
				</Wrapper>
				:
				Object.keys(sections).map(section_name=>{
					const {fields=[], vertical, separator} = sections[section_name];

					return <Wrapper key={section_name}>
						<OptionFields {...{fields, vertical, separator}}/>
					</Wrapper>
				})
		}
	</div>
}
