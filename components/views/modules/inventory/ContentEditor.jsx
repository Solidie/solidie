import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import {FileUpload} from 'crewhrm-materials/file-upload/file-upload.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { __, data_pointer, isEmpty, sprintf } from "crewhrm-materials/helpers.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";

import { InventoryWrapper } from "./index.jsx";
import { getFlattenedCategories } from "../../admin-dashboard/settings/categories.jsx";

export function ContentEditor({categories=[]}) {
	const {ajaxToast, addToast} = useContext(ContextToast);
	const {content_type, content_id: _content_id} = useParams();
	const content_id = isNaN(_content_id) ? 0 : _content_id;
	const navigate = useNavigate();
	
	const initial_values = {
		content_type: content_type,
		content_title: '',
		content_description: '',
		category_id: 0,
		thumbnail: null, // General purpose content thumbnail, video poster
		sample_images:[], // Sample images for fonts, photo templates, apps
		preview: null, // Preview file for pdf, audio, video etc that can be seen on the website directly
		downloadable_file: null, // The actual file to be downloaded by user, it holds all the resouce. Maybe zip, rar, tar, video etc.
	}

	const [state, setState] = useState({
		submitting: false,
		fetching: false,
		error_message: null,
		values: initial_values
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
			type: 'dropdown',
			name: 'category_id',
			label: __('Category'),
			placeholder: __('Select category'),
			options: getFlattenedCategories(categories[content_type] || [])
		},
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

		request('createOrUpdateContent', {...state.values, content_id}, resp=>{
			const {success, data:{content={}, message, content_id: c_id}} = resp;

			setState({
				...state,
				submitting: false
			});

			if ( success ) {
				addToast({
					message: <span>{message} <a href={content.content_url} target="_blank">{__('Visit Now')}</a></span>,
					dismissible: true,
					status: 'success'
				});

				// Replace current URL state with content ID to make it update from later attempts
				if ( ! content_id ) {
					navigate('/inventory/'+content_type, {replace: true});
				}
			} else {
				ajaxToast(resp);
			}
		});
	}

	const fetchContent=()=>{
		if ( ! content_id ) {
			setState({
				...state,
				values: initial_values
			})
			return;
		}

		setState({...state, fetching: true});

		request('getSingleContent', {content_id}, resp=>{
			const {
				success,
				data: {
					content={}, 
					message=__('Something went wrong'), 
				}
			} = resp;

			const {values={}} = state;
			if ( success ) {
				const release = content.releases[0] || {};

				values.content_title = content.content_title;
				values.content_description = content.content_description;
				values.category_id = content.category_id;
				values.thumbnail = content.media.thumbnail;
				values.preview = content.media.preview;
				values.sample_images = content.media.sample_images;

				if ( release ) {
					values.downloadable_file = {
						file_id: release.file_id,
						file_url: release.downloadable_url,
						file_name: release.content_title,
						mime_type: release.mime_type,
					}

					// Add latest release info too for downloadable file update feature
					values.version = release.version;
					values.changelog = release.changelog;
					values.release_id = release.release_id;
				}
			}
			
			setState({
				...state, 
				values,
				fetching: false,
				error_message: success ? null : message
			});
		});
	}

	useEffect(()=>{
		fetchContent();
	}, [content_id]);
	
	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	
	return <InventoryWrapper fetching={state.fetching}>
		<div style={{maxWidth: '600px'}}>
			{/* Header */}
			<div className={"margin-top-20 margin-bottom-30 d-flex align-items-center column-gap-10".classNames()}>
				<i onClick={()=>window.history.back()} className={"ch-icon ch-icon-arrow-left cursor-pointer".classNames()}></i>
				<span>{sprintf(__('Add New %s'), _content.label || __('Content'))}</span>
			</div>

			{
				fields.map(field=>{
					const {name, label, placeholder, type, required, accept, hint, maxlenth, options=[]} = field;
					return (type=='dropdown' && isEmpty(options)) ? null : 
					<div key={name} className={'margin-bottom-15'.classNames()}>
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
								type={type}
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

						{
							'dropdown' !== type ? null :
							<DropDown
								placeholder={placeholder}
								value={state.values[name]}
								options={options}
								onChange={value=>setVal(name, value)}/>
						}
					</div>
				})
			}
			
			<button 
				disabled={state.submitting} 
				className={'button button-primary'.classNames()} 
				onClick={submit}
			>
				{content_id ? __('Update') : __('Create')} <LoadingIcon show={state.submitting}/>
			</button>
		</div>
	</InventoryWrapper> 
}
