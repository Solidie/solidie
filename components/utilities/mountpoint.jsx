import { useEffect, useState } from "react";
import tw from '../libraries/tailwind/build.module.scss';

export function MountPoint(props){
	const [ready, setReady] = useState(false);

	useEffect(()=>{
		String.prototype.classNames = function(style, append_raw='') {
			return this.split(' ').map(c=>c.trim()).filter(c=>c).map(c=>(style || tw)[c] || c).join(' ') + ' ' + append_raw;
		}

		String.prototype.idNames = function(style, append_raw='') {
			return this.classNames(style, append_raw); // Because both uses same style object. Added two to avoid confusion.
		}
		
		setReady(true);
	});

	return ready ? props.children : null;
}