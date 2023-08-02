import React, { useContext, useEffect, useRef, useState } from "react";

import { ContextResponsiveGrid } from "./contexts.jsx";

import style_library from '../sass/index.module.scss';
import fa from '../sass/fontawesome/css/all.module.scss';
import bs from '../sass/bootstrap.module.scss';

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

		String.prototype.bootStrap = function() {
			return this.classNames(bs);
		}

		if ( props.element ) {
			props.element.className = (props.element.className || '').classNames();
			props.element.id = (props.element.id || '').idNames();
		}
		
		setReady(true);
	}, []);

	return ready ? props.children : null;
}

export function ResponsiveGrid(props) {
	const wrapper = useRef(null);
	let timeout = null;
	let {max=6, children} = props;

	const [state, setState] = useState({
		classNames: 'col-xs-12'.bootStrap()
	});

	const getWidth=(el)=>{
		const styles       = window.getComputedStyle(el);
		const paddingLeft  = parseFloat(styles.paddingLeft);
		const paddingRight = parseFloat(styles.paddingRight);
		
		return el.clientWidth - paddingLeft - paddingRight;
	}

	const getHeight=(el)=>{
		const styles        = window.getComputedStyle(el);
		const paddingTop    = parseFloat(styles.paddingTop);
		const paddingBottom = parseFloat(styles.paddingBottom);
		
		return el.clientHeight - paddingTop - paddingBottom;
	}

	const setClass=()=>{
		if( ! wrapper || ! wrapper.current ) {
			return;
		}

		// Detremine inner width of the elment
		const innerWidth   = getWidth( wrapper.current );
		let classNames   = 'col-xs-12';
		let maxClassName = 'col-xs-' + ( 12 / max );

		if ( innerWidth < 576 ) {
			classNames = 'col-xs-12';

		} else if ( innerWidth >= 576 && innerWidth < 768 ) {
			classNames = max >= 2 ? 'col-xs-6' : maxClassName;

		} else if( innerWidth >= 768 && innerWidth < 992 ) {
			classNames = max >= 3 ? 'col-xs-4' : maxClassName;

		} else if( innerWidth >= 992 && innerWidth < 1200 ) {
			classNames = max >= 4 ? 'col-xs-3' : maxClassName;

		} else if ( innerWidth >= 1200 ) {
			classNames = max >= 6 ? 'col-xs-2' : maxClassName;
		}
		
		setState({
			classNames: classNames.bootStrap()
		});
	}

	useEffect(()=>{
		setClass();
		window.addEventListener('resize', setClass);

		return ()=>{
			window.removeEventListener('resize', setClass);
		}
	}, []);

	return <ContextResponsiveGrid.Provider value={{classNames: state.classNames}}>
		<div className={"row".bootStrap()} ref={wrapper}>
			{children}
		</div>
	</ContextResponsiveGrid.Provider> 
}

export function ResponsiveCard(props) {
	const {classNames} = useContext(ContextResponsiveGrid);
	const attrs = {...props, className: classNames + ' ' + props.className}
	
	return <div {...attrs}>
		{props.children}
	</div>
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