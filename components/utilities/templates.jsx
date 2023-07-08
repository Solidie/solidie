import { useEffect, useState } from "react";
import style_library from '../sass/index.module.scss';

export function MountPoint(props){
	const [ready, setReady] = useState(false);

	useEffect(()=>{
		String.prototype.classNames = function(style, append_raw='') {
			if ( append_raw ) {
				append_raw = ' ' + append_raw;
			}
			return this.split(' ').map(c=>c.trim()).filter(c=>c).map(c=>(style || style_library)[c] || c).join(' ') + append_raw;
		}

		String.prototype.idNames = function(style, append_raw='') {
			return this.classNames(style, append_raw); // Because both uses same style object. Added two to avoid confusion.
		}

		if ( props.element ) {
			props.element.className = (props.element.className || '').classNames();
			props.element.id = (props.element.id || '').idNames();
		}
		
		setReady(true);
	}, []);

	return ready ? props.children : null;
}

export function Anchor(props) {
	let {href} = props;
	
}