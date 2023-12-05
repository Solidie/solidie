import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import {FileUpload} from 'crewhrm-materials/file-upload/file-upload.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { __, data_pointer, sprintf } from "crewhrm-materials/helpers.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { Conditional } from "crewhrm-materials/conditional.jsx";

import { InventoryWrapper } from "./index.jsx";
import { getDashboardPath } from "../../admin-dashboard/inventory/inventory-backend.jsx";

function CategoryField() {
	return <div>Here's cat field</div>
}

export function ContentEditor() {
	const {ajaxToast} = useContext(ContextToast);
	const {content_type, content_id} = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState({
		submitting: false,
		values: {
			content_title: '',
			content_description: '',
			category_id: 0,
			tags: '',
			thumbnail: null, // General purpose content thumbnail, video poster
			sample_images:[], // Sample images for fonts, photo templates, apps
			preview: null, // Preview file for pdf, audio, video etc that can be seen on the website directly
			downloadable_file: null, // The actual file to be downloaded by user, it holds all the resouce. Maybe zip, rar, tar, video etc.
		}
	});

	const fields = [
		{
			type: 'text',
			name: 'content_title',
			label: __('Title'),
			placeholder: __('Give it a title'),
			required: true
		},
		{
			type: 'textarea',
			name: 'content_description',
			label: __('Description'),
			placeholder: __('Write some description here'),
			required: true
		},
		{
			type: 'file',
			name: 'thumbnail',
			label: __('Thumbnail'),
			accept: 'image/*'
		},
		(['audio', 'video'].indexOf(content_type) === -1 ? null : {
			type: 'file',
			name: 'preview',
			label: __('Preview File'),
			accept: content_type + '/*'
		}),
		(['app', '3d', 'document', 'font', 'tutorial'].indexOf(content_type)===-1 ? null : {
			type: 'file',
			name: 'sample_images',
			label: __('Sample Images'),
			accept: 'image/*',
			maxlenth: 5,
		}),
		{
			type: 'file',
			name: 'downloadable_file',
			label: __('Downloadable File'),
			hint: __('You can always release new updates later'),
			accept: [content_type + '/*', 'application/zip']
		},
		{
			type: 'category',
			name: 'categories',
			label: __('Category'),
			placeholder: __('Select category')
		},
		{
			type: 'text',
			name: 'tags',
			label: __('Tags'),
			placeholder: __('Enter tags')
		}
	].filter(f=>f);

	const setVal=(name, value)=>{
		setState({
			...state,
			values: {
				...state.values,
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

		request('createOrUpdateContent', payload, resp=>{
			const {success} = resp;

			setState({
				...state,
				submitting: false
			});

			ajaxToast(resp);

			if ( success ) {
				navigate(getDashboardPath('inventory/'+content_type));
			}
		});
	}
	
	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	
	return <InventoryWrapper>
		<div style={{maxWidth: '600px'}}>
			{/* Header */}
			<div className={"margin-top-20 margin-bottom-30 d-flex align-items-center column-gap-10".classNames()}>
				<i onClick={()=>window.history.back()} className={"ch-icon ch-icon-arrow-left cursor-pointer".classNames()}></i>
				<span>{sprintf(__('Add New %s'), _content.label || __('Content'))}</span>
			</div>

			{
				fields.map(field=>{
					const {name, label, placeholder, type, required, accept, hint, maxlenth} = field;
					return <div key={name} className={'margin-bottom-15'.classNames()}>
						<strong className={'d-block font-weight-600'.classNames()}>
							{label}{required ? <span className={'color-error'.classNames()}>*</span> : null}
						</strong>

						{
							!hint ? null :
							<small className={'d-block'.classNames()}>
								{hint}
							</small>
						}

						{
							['text', 'textarea'].indexOf(type) === -1 ? null :
							<TextField 
								placeholder={placeholder} 
								onChange={v=>setVal(name, v)}
								value={state.values[name]}/>
						}

						{
							'file' !== type ? null :
							<FileUpload 
								accept={accept}
								onChange={v=>setVal(name, v)}
								maxlenth={maxlenth}
								value={state.values[name]}/>
						}
					</div>
				})
			}
			
			<button disabled={state.submitting} className={'button button-primary'.classNames()} onClick={submit}>
				{__('Submit')} <LoadingIcon show={state.submitting}/>
			</button>
		</div>
	</InventoryWrapper> 
}
