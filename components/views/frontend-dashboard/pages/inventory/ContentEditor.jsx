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
import { getDashboardPath } from "../../index.jsx";

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

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Title')}<span className={'color-error'.classNames()}>*</span>
				</strong>
				<TextField 
					placeholder={__('e.g A sample title')} 
					onChange={v=>setVal('content_title', v)}
					value={state.values.content_title}/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Description')}<span className={'color-error'.classNames()}>*</span>
				</strong>
				<TextField 
					type="textarea"
					placeholder={__('e.g A sample title')} 
					onChange={v=>setVal('content_description', v)}
					value={state.values.content_description}/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Thumbnail Image')}
				</strong>
				<FileUpload 
					accept="image/*"
					onChange={v=>setVal('thumbnail', v)}/>
			</div>

			{
				['app', '3d', 'document', 'font', 'tutorial'].indexOf(content_type)===-1 ? null :
				<div className={'margin-bottom-15'.classNames()}>
					<strong className={'d-block font-weight-600'.classNames()}>
						{__('Sample Images')}
					</strong>
					<FileUpload 
						accept="image/*" 
						maxlenth={5}
						onChange={v=>setVal('sample_images', v)}/>
				</div>
			}

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Downloadable File')}
					<Conditional show={content_type=='app' && content_id=='new'}>
						<small>&nbsp;({__('You can also release new updates later')})</small>
					</Conditional>
				</strong>
				<FileUpload
					onChange={v=>setVal('downloadable_file', v)}/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Category')}
				</strong>
				<CategoryField onChange={id=>setVal('category_id', id)}/>
			</div>

			<div className={'margin-bottom-15'.classNames()}>
				<strong className={'d-block font-weight-600'.classNames()}>
					{__('Tags')} <small>({__('Comma separated')})</small>
				</strong>
				<TextField 
					placeholder={__('e.g sunset, landscape, winter')} 
					onChange={v=>setVal('tags', v)}/>
			</div>

			<button disabled={state.submitting} className={'button button-primary'.classNames()} onClick={submit}>
				{__('Submit')} <LoadingIcon show={state.submitting}/>
			</button>
		</div>
	</InventoryWrapper> 
}
