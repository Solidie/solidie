import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import {ToggleSwitch} from 'crewhrm-materials/toggle-switch/ToggleSwitch.jsx';

import { ContextSettings } from '../general-settings.jsx';

export function Segments() {

	const {settings_fields} = useContext(ContextSettings);

    return Object.keys(settings_fields).map((key) => {
		const { segments = {}, component, label, description } = settings_fields[key];
		const segment_keys = Object.keys(segments);

		return (!segment_keys.length && !component) ? null : <div key={key} className={'margin-bottom-20'.classNames()}>

			<div className={'padding-vertical-5'.classNames()}>
				<span
					className={'d-flex align-items-center column-gap-10 font-size-17 font-weight-600 color-text margin-bottom-10'.classNames()}
				>
					{label}
				</span>
				<span
					className={'d-block font-size-14 font-weight-400 line-height-22 letter-spacing--14 color-text-light'.classNames()}
				>
					{description}
				</span>
			</div>

			<div
				className={'border-1-5 b-color-tertiary border-radius-10 bg-color-white'.classNames()}
			>
				{segment_keys.map((segment_key, index) => {
					const { icon, label, onToggle, is_enabled } = segments[segment_key];
					const is_last = index === segment_keys.length - 1;

					return <Link
						key={segment_key}
						to={`/settings/${key}/${segment_key}/`}
						className={`d-flex align-items-center column-gap-10 cursor-pointer padding-vertical-10 padding-horizontal-15 ${
							!is_last ? 'border-bottom-1-5 b-color-tertiary' : ''
						} color-hover-parent`.classNames()}
					>
						<div className={'flex-1 d-flex align-items-center column-gap-10'.classNames()}>
							{
								!onToggle ? null :
								<div onClick={e=>e.stopPropagation()}>
									<ToggleSwitch 
										onChange={checked=>onToggle(key, segment_key, checked)}
										checked={is_enabled}
									/>
								</div>
							}
							<div className={'flex-1'.classNames()}>
								<span
									className={'d-block font-size-15 font-weight-500 line-height-25 color-text'.classNames()}
								>
									{label}
								</span>
							</div>
						</div>
						<div>
							<i
								className={'ch-icon ch-icon-arrow-right font-size-24 color-text color-hover-child-secondary'.classNames()}
							></i>
						</div>
					</Link>
				})}
			</div>
		</div>
	});
}
