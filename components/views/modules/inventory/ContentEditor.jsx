import React, { useContext, useEffect, useState } from "react";

import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import {FileUpload} from 'crewhrm-materials/file-upload/file-upload.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { __, data_pointer, isEmpty, sprintf } from "crewhrm-materials/helpers.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { TextEditor } from "crewhrm-materials/text-editor/text-editor.jsx";
import { InitState } from "crewhrm-materials/init-state.jsx";

import { InventoryWrapper } from "./index.jsx";
import { DoAction } from "crewhrm-materials/mountpoint.jsx";
import { getFlattenedCategories } from "../../admin-dashboard/settings/general/content-type/category-editor.jsx";

const {readonly_mode} = window[data_pointer];

var audio_extensions = [
	'.mp3',
	'.aac',
	'.wav',
	'.flac',
	'.ogg',
	'.wma',
	'.aiff',
	'.alac',
];

var video_extensions = [
	'.mp4',
	'.webm',
	'.mkv',
	'.avi',
	'.mov',
	'.wmv',
	'.flv',
	'.m4v',
	'.3gp',
	'.ogg',
	'.ogv'
];

export function ContentEditor({categories=[], navigate, params={}}) {
	const {ajaxToast, addToast} = useContext(ContextToast);
	const {content_type, content_id: _content_id} = params;
	const content_id = isNaN(_content_id) ? 0 : _content_id;
	
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
		slug_editor: false,
		updating_slug: false,
		fetching: false,
		error_message: null,
		values: initial_values,
		update_title: null,
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
			accept: content_type === 'audio' ? audio_extensions : video_extensions
		}),
		(['app', '3d', 'document', 'font', 'tutorial'].indexOf(content_type)===-1 ? null : {
			type: 'file',
			name: 'sample_images',
			label: __('Sample Images'),
			accept: 'image/*',
			maxlenth: 5,
			removable: true
		}),
		{
			type: 'file',
			name: 'downloadable_file',
			label: __('Downloadable File (zip)'),
			accept: ['application/zip']
		},
		('app' !== content_type ? null : {
			type: 'text',
			name: 'version',
			label: __('App Version (Latest)'),
		}),
		('app' !== content_type ? null : {
			type: 'textarea',
			name: 'changelog',
			label: __('Changelog (Latest)'),
		}),
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

		// Separate files from content object
		const sample_image_ids = state.values.sample_images.map(img=>img.file_id).filter(id=>id);
		const content = {content_id};
		const files = {sample_image_ids};
		Object.keys(state.values).forEach(key=>{
			
			const _value = state.values[key];

			if ( fields.find(field=>field.name===key && field.type==='file') ) {
				// If it is sample images, then don't put JSON, only file instance.
				files[key] = key === 'sample_images' ? _value.filter(f=>f instanceof File) : _value;
			} else {
				content[key] = _value
			}
		});

		request('createOrUpdateContent', {content, ...files}, resp=>{
			const {
				success, 
				data:{
					content={}, 
					message, 
				}
			} = resp;

			setState({
				...state,
				submitting: false
			});

			if ( success ) {
				addToast({
					message: <span>{message} <a href={content.content_permalink} target="_blank">{__('Visit Now')}</a></span>,
					dismissible: true,
					status: 'success'
				});

				// Replace current URL state with content ID to make it update from later attempts
				if ( ! content_id ) {
					navigate('/inventory/'+content_type, {replace: true});
				} else {
					window.location.reload();
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

		request('getSingleContent', {content_id, is_editor: true}, resp=>{
			const {
				success,
				data: {
					content={}, 
					message=__('Something went wrong'), 
				}
			} = resp;

			const {values={}} = state;
			if ( success ) {
				
				const release = content.release || null;

				values.content_title       = content.content_title;
				values.content_description = content.content_description;
				values.content_permalink   = content.content_permalink;
				values.content_slug        = content.content_slug;
				values.category_id         = content.category_id;
				values.thumbnail           = content.media.thumbnail;
				values.preview             = content.media.preview;
				values.sample_images       = content.media.sample_images;
				values.product             = content.product;

				if ( release ) {
					values.downloadable_file = {
						file_id: release.file_id,
						file_url: release.downloadable_url,
						file_name: release.file_name,
						mime_type: release.mime_type,
					}

					// Add latest release info too for downloadable file update feature
					values.release_id = release.release_id;
					values.version = release.version;
					values.changelog = release.changelog;
					values.release_id = release.release_id;
				}
			}
			
			setState({
				...state, 
				values,
				update_title: values.content_title,
				fetching: false,
				error_message: success ? null : message
			});
		});
	}

	const updateSlug=()=>{
		
		setState({
			...state,
			updating_slug: true
		});

		const {content_slug} = state.values;
		request('updateContentSlug', {content_id, content_slug}, resp=>{

			const {success, data:{ content_slug, content_permalink }} = resp;

			ajaxToast(resp);

			setState({
				updating_slug: false,
				slug_editor: success ? false : state.slug_editor,
				values: {
					...state.values,
					content_slug: success ? content_slug : state.values.content_slug,
					content_permalink: success ? content_permalink: state.values.content_permalink
				}
			});
		});
	}

	useEffect(()=>{
		fetchContent();
	}, [content_id]);
	
	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	
	if ( state.fetching || state.error_message ) {
		
	}

	return <InventoryWrapper navigate={navigate} params={params}>
		{
			( state.fetching || state.error_message ) ? 
			<InitState fetching={state.fetching} error_message={state.error_message}/> :
			<div style={{maxWidth: '600px', margin: '20px auto'}}>
				{/* Header */}
				<div className={"margin-top-20 margin-bottom-30 d-flex align-items-center column-gap-10".classNames()}>
					<i onClick={()=>window.history.back()} className={"ch-icon ch-icon-arrow-left cursor-pointer".classNames()}></i>
					<span>
						{
							!content_id ? 
								sprintf(__('Add New %s'), _content.label) : 
								sprintf(__('Update %s'), state.update_title || _content.label)
						}
					</span>
				</div>

				{
					state.fetching ? <div className={'padding-vertical-40'.classNames()}>
						<LoadingIcon center={true}/>
					</div>
					:
					<>
						{
							fields.map(field=>{
								
								const {
									name, 
									label, 
									placeholder, 
									type, 
									required, 
									accept, 
									removable=false,
									hint, 
									maxlenth, 
									options=[]
								} = field;

								return (type=='dropdown' && isEmpty(options)) ? null : <div key={name}>
									<div className={`${name=='content_title' ? '' : 'margin-bottom-15'}`.classNames()}>
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
											'text' !=type ? null :
											<TextField 
												type={type}
												placeholder={placeholder} 
												onChange={v=>setVal(name, v)}
												value={state.values[name]}/>
										}

										{
											'textarea' !== type ? null :
											<TextEditor
												placeholder={__('Write description..')}
												value={state.values[name]}
												onChange={v=>setVal(name, v)}/>
										}

										{
											'file' !== type ? null :
											<FileUpload 
												accept={accept}
												onChange={v=>setVal(name, v)}
												maxlenth={maxlenth}
												value={state.values[name] || null}
												removable={removable}/>
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

									{
										(name != 'content_title' || !state.values.content_slug) ? null : 
										<div 
											className={'d-flex align-items-center flex-wrap-wrap flex-direction-row column-gap-5'.classNames()}
											style={{margin: '3px 0 15px', height: '34px'}}
										>
											<a 
												href={state.values.content_permalink} 
												target='_blank'
											>
												{window[data_pointer].permalinks.gallery[content_type]}{state.slug_editor ? null : <><strong>{state.values.content_slug}</strong>/</>}
											</a>

											{
												!state.slug_editor ? 
													<i 
														className={'ch-icon ch-icon-edit-2 cursor-pointer font-size-18'.classNames()}
														onClick={()=>setState({...state, slug_editor: true})}></i>
													:
													<>
														<TextField 
															style={{width: '170px', height: '30px', padding: '0 9px'}}
															value={state.values.content_slug}
															autofocus={true}
															onChange={content_slug=>setVal('content_slug', content_slug)}
														/>
														<button 
															className={'button button-primary button-outlined button-small'.classNames()}
															onClick={updateSlug}
															disabled={readonly_mode}
														>
															{__('Update')} <LoadingIcon show={state.updating_slug}/>
														</button>
													</>
											}
										</div>
									}
								</div>
							})
						}

						<DoAction 
							action="solidie_content_editor_after_form" 
							payload={{
								content: state.values,
								content_type,
								onChange: setVal
							}}
						/>
						
						<div className={'text-align-right'.classNames()}>
							<button 
								disabled={readonly_mode || state.submitting} 
								className={'button button-primary'.classNames()} 
								onClick={submit}
							>
								{content_id ? __('Update') : __('Create')} <LoadingIcon show={state.submitting}/>
							</button>
						</div>
					</>				
				}
			</div>
		}
	</InventoryWrapper> 
}
