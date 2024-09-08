import React, { useEffect, useState } from "react";

import {request} from 'solidie-materials/request';
import {__, isEmpty } from "solidie-materials/helpers";

import { renderers } from "../../gallery";

export function SimilarContents({content_id, content_type}) {

	const [state, setState] = useState({
		contents: []
	})

	const getSimilarContents=()=>{
		request('getSimilarContents', {content_id, content_type}, resp=>{
			const {data:{contents=[]}} = resp;
			setState({...state, contents});
		});
	}
	
	useEffect(()=>{
		getSimilarContents();
	}, []);

	const RenderCom = renderers[content_type] ||  renderers.other;

	return isEmpty( state.contents ) ? null :
		<div style={{padding: '50px 0 20px'}}>
			<span className={'d-block margin-bottom-10 font-size-16 font-weight-700 color-text-60'.classNames()}>
				{__('You might also like')}
			</span>
			<RenderCom contents={state.contents}/>
		</div>
}
