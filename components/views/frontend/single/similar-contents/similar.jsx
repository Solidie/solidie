import React, { useEffect, useRef, useState } from "react";

import {request} from 'solidie-materials/request';
import {__, isEmpty } from "solidie-materials/helpers";

import { renderers } from "../../gallery";

export function SimilarContents({content_id, content_type}) {

	const reff_wrapper = useRef();
	const [is_tablet, setTablet] = useState(false);
	const [is_mobile, setMobile] = useState(false);

	const [state, setState] = useState({
		contents: []
	})

	const getSimilarContents=()=>{
		request('getSimilarContents', {content_id, content_type}, resp=>{
			const {data:{contents=[]}} = resp;
			setState({...state, contents});
		});
	}
	
	const setLayout=()=>{
		if ( reff_wrapper?.current ) {
			setTablet(reff_wrapper.current.offsetWidth<697);
			setMobile(reff_wrapper.current.offsetWidth<473);
		}
	}

	useEffect(()=>{
		// Set responsive layout and register event
		setLayout();
		window.addEventListener('resize', setLayout);
		return ()=>window.removeEventListener('resize', setLayout);
	}, []);

	useEffect(()=>{
		getSimilarContents();
	}, []);

	const RenderCom = renderers[content_type] ||  renderers.other;

	return isEmpty( state.contents ) ? null :
		<div style={{padding: '50px 0 20px'}} ref={reff_wrapper}>
			<span className={'d-block margin-bottom-10 font-size-16 font-weight-700 color-text-60'.classNames()}>
				{__('You might also like')}
			</span>
			<RenderCom contents={state.contents} is_mobile={is_mobile} is_tablet={is_tablet}/>
		</div>
}
