import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import {FileUpload} from 'crewhrm-materials/file-upload/file-upload.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';

import { InventoryWrapper } from "./index.jsx";
import { __ } from "crewhrm-materials/helpers.jsx";

export function ContentEditor(){
	const {content_type, content_id} = useParams();

	const [state, setState] = useState({
		submitting: false,
		values: {
			title: '',
			description: '',
			category_id: 0,
			tags: [],
			thumbnail: null, // General purpose content thumbnail, video poster
			sample_images:[], // Sample images for fonts, photo templates, apps
			preview: null, // Preview file for pdf, audio, video etc that can be seen on the website directly
			downloadable: null, // The actual file to be downloaded by user, it holds all the resouce. Maybe zip, rar, tar, video etc.
		}
	});

	const setVal=(name, value)=>{
		setState({
			...state,
			values: {
				[name]: value
			}
		});
	}

	const submit=()=>{
		setState({
			...state,
			submitting: true
		});

		const payload = {
			...state.values,
			content_type,
			content_id: content_id==='new' ? 0 : content_id
		}

		request('contentUpload', payload, resp=>{

		});
	}
	
	return <InventoryWrapper>
		<div style={{maxWidth: '600px'}}>
			{/* Header */}
			<div className={"margin-top-20 margin-bottom-30 d-flex align-items-center column-gap-10".classNames()}>
				<i onClick={()=>window.history.back()} className={"ch-icon ch-icon-arrow-left cursor-pointer".classNames()}></i>
				<span>{__('Add New Content')}</span>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Title')}
				</strong>
				<TextField 
					placeholder={__('e.g A sample title')} 
					onChange={v=>setVal('content_title', v)}/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Description')}
				</strong>
				<TextField 
					type="textarea"
					placeholder={__('e.g A sample title')} 
					onChange={v=>setVal('content_description', v)}/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Thumbnail Image')}
				</strong>
				<FileUpload/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Downloadable File')}
				</strong>
				<FileUpload/>
			</div>

			<button className={'button button-primary'.classNames()} onClick={submit}>
				{__('Submit')} <LoadingIcon show={state.submitting}/>
			</button>
		</div>
	</InventoryWrapper> 
}
