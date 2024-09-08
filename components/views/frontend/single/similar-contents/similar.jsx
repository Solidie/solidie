import React, { useEffect, useState } from "react";

import {request} from 'solidie-materials/request';

import { renderers } from "../../gallery";
import { isEmpty } from "solidie-materials/helpers";

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

	const RenderCom = renderers[content_type];

	return isEmpty( state.contents ) ? null :
		<div className={'padding-vertical-15'.classNames()}>
			<span className={'d-block margin-bottom-10 font-size-18 font-weight-500 color-text-80'.classNames()}>
				{__('You might also like')}
			</span>
			<RenderCom contents={state.contents}/>
		</div>
}
