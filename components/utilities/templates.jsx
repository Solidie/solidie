import React, { useEffect, useState } from "react";
import style_library from '../sass/index.module.scss';
import fa from '../sass/fontawesome/css/all.module.scss';

export function MountPoint(props){
	const [ready, setReady] = useState(false);

	useEffect(()=>{
		String.prototype.classNames = function(style, append_raw='') {
			if ( append_raw ) {
				append_raw = ' ' + append_raw;
			}

			let dump = '';

			let cls = this.split(' '); 		// Split multiples by space
			cls     = cls.map(c=>c.trim()); // Trim leading and trailing slashes
			cls     = cls.filter(c=>c); 	// Remove empty strings

			// Apply dynamic classes
			cls = cls.map(c=>{
				let class_name = (style || style_library)[c];

				if ( ! class_name ) {
					dump += ' ' + c;
					// console.error('Orphan class/id: ' + c);
				}

				return class_name || c;
			});

			if ( dump ) {
				console.error(dump);
			}
			
			return cls.join(' ') + append_raw; // Join back to single string and include raw. Then return.
		}

		String.prototype.idNames = function(style, append_raw='') {
			return this.classNames(style, append_raw); // Because both uses same style object. Added two to avoid confusion.
		}

		String.prototype.fontAwesome = function() {
			return this.classNames(fa);
		}

		if ( props.element ) {
			props.element.className = (props.element.className || '').classNames();
			props.element.id = (props.element.id || '').idNames();
		}
		
		setReady(true);
	}, []);

	return ready ? props.children : null;
}

export function FAList() {
	const variants = ['fa', 'fa-classic', 'fa-sharp', 'fas', 'fa-solid', 'far', 'fa-regular', 'fab', 'fa-brands'];

	return <table style={{width: '100%', border: '1px solid gray', borderCollapse: 'collapse'}}>
		<tbody>
			{Object.keys(fa).map(cls=>{
				return variants.indexOf(cls)>-1 ? null : <tr>
					<td key={cls}>
						{variants.map(v=>{
							return <div key={v+'_'+cls}>
								<span style={{display: 'inline-block', width: '30px'}}>
									<i className={fa[v]+' '+fa[cls]}></i>
								</span>
								<span>
									{v} {cls}
								</span>
							</div>
						})}
					</td>
				</tr>
			})}
		</tbody>
	</table>
}