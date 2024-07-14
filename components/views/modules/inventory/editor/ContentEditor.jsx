import React, { useContext, useEffect, useState } from "react";

import {TextField} from 'crewhrm-materials/text-field/text-field.jsx';
import {FileUpload} from 'crewhrm-materials/file-upload/file-upload.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import {confirm} from 'crewhrm-materials/prompts.jsx';
import {LoadingIcon} from 'crewhrm-materials/loading-icon/loading-icon.jsx';
import { __, data_pointer, isEmpty, sprintf, getDashboardPath } from "crewhrm-materials/helpers.jsx";
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";
import { DropDown } from "crewhrm-materials/dropdown/dropdown.jsx";
import { DoAction } from "crewhrm-materials/mountpoint.jsx";
import { Tabs } from "crewhrm-materials/tabs/tabs.jsx";

import { getFlattenedCategories } from "../../../admin-dashboard/settings/general/content-type/category-editor.jsx";
import { ReleaseManager } from "../release-manager/release-manager.jsx";
import { TutorialManager } from "../tutorial-manager/tutorial-manager.jsx";
import { TinyEditor } from "./Tiny.jsx";

import style from './editor.module.scss';

const {readonly_mode, is_admin} = window[data_pointer];

const extensions = {
	audio: [
		'.mp3',
		'.wav',
		'.ogg',
	],
	video: [
		'.mp4',
		'.mov',
		'.wmv',
		'.avi',
		'.3gp'
	],
	image: [
		'.png',
		'.jpg',
		'.jpeg',
		'.gif'
	],
	document: [
		'.doc',
		'.docx',
		'.pdf',
		'.ppt',
		'.pptx',
		'.xls',
		'.xlsx'
	]
}

export function ContentEditor({categories=[], navigate, params={}}) {

	const {ajaxToast} = useContext(ContextToast);
	
	const {
		content_type, 
		content_id: _content_id, 
		segment: active_tab='overview',
		segment_id: active_stuff_id
	} = params;

	const content_id = isNaN(_content_id) ? 0 : _content_id;
	
	const [state, setState] = useState({
		submitting: false,
		slug_editor: false,
		updating_slug: false,
		fetching: false,
		error_message: null,
		update_title: null,
		thumbnail_url: null,
		values: {
			content_type: content_type,
			content_title: sprintf(__('Untitled %s'), (window[data_pointer].settings.contents[content_type]?.label || __('Content'))),
			kses_content_description: '',
			category_id: 0,
			thumbnail: null, // General purpose content thumbnail, video poster
			sample_images:[], // Sample images for fonts, photo templates, apps
			preview: null, // Preview file for pdf, audio, video etc that can be seen on the website directly
			downloadable_file: null, // The actual file to be downloaded by user, it holds all the resouce. Maybe zip, rar, tar, video etc.
		},
		release_lesson_opened: content_id ? true : false,
	});

	const [uploadPercent, setUploadPercent] = useState(0);

	const content_title = ( state.values.content_title || '' ).trim();
	const support_exts  = (extensions[content_type] || []).map(ext=>ext.replace('.', ''));

	const fields = [
		{
			type: 'text',
			name: 'content_title',
			label: __('Title'),
			placeholder: __('Give it a title'),
			required: true,
		},
		{
			type: 'file',
			name: 'thumbnail',
			label: __('Thumbnail Image'),
			accept: extensions.image,
			render: true,
		},
		{
			type: 'textarea_rich',
			name: 'kses_content_description',
			label: __('Description'),
			placeholder: __('Write some description here'),
		},
		(['audio', 'video'].indexOf(content_type) === -1 ? null : {
			type: 'file',
			name: 'preview',
			label: __('Preview File'),
			hint: <>{sprintf(__('Sneak peek for onsite playback. Supports: %s'), support_exts.join(', '))}. {content_type==='video' ? <><br/>{__('Please make sure the  aspect ratio of video and thumbnail is same.')}</> : null}</>,
			required: true,
			accept: extensions[content_type]
		}),
		(['app', '3d', 'font', 'tutorial'].indexOf(content_type)===-1 ? null : {
			type: 'file',
			name: 'sample_images',
			label: __('Sample Image/Videos (Max 10)'),
			accept: [...extensions.image, ...extensions.video],
			maxlength: 10,
			removable: true,
		}),
		(['audio', 'video', 'image', '3d', 'document', 'font'].indexOf(content_type)===-1 ? null : {
			type: 'file',
			name: 'downloadable_file',
			label: __('Downloadable File'),
			hint: sprintf(__('Supports: %s'), ['zip', ...support_exts].join(', ')),
			accept: [
				'.zip', 
				...(extensions[content_type] || []),
			].filter(m=>m),
			required: true,
		}),
		{
			type: 'dropdown',
			name: 'category_id',
			label: __('Category'),
			placeholder: __('Select category'),
			options: getFlattenedCategories(categories[content_type] || []),
			show_setup_link: true
		},
	].filter(f=>f);

	const setVal=(name, value)=>{
		setState({
			...state,
			thumbnail_url: name=='thumbnail' ? URL.createObjectURL(value) : state.thumbnail_url,
			values: {
				...state.values,
				[name]: value
			}
		});
	}

	const publish=()=>{
		confirm(
			__('Sure to publish?'),
			submit
		);
	}

	const submit=(content_status)=>{

		const is_draft = content_status === 'draft'

		setState({
			...state,
			submitting: true
		});

		// Separate files from content object
		const sample_image_ids = state.values.sample_images.map(img=>img.file_id).filter(id=>id);
		const content = {content_id, content_status, is_admin};
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

			const new_state = {
				submitting: false
			}

			if ( success ) {

				ajaxToast(resp);

				const editor_url = `inventory/${content_type}/editor/${content.content_id}/`;

				// Replace current URL state with content ID to make it update from later attempts
				if ( ! content_id ) {
					navigate(getDashboardPath(editor_url), {replace: true});
				}

				if ( ! is_draft && ! state.release_lesson_opened ) {

					if ( content_type === 'app' ) {
						navigate(getDashboardPath(`${editor_url}release-manager/`));
						
					} else if( content_type === 'tutorial' ) {
						navigate(getDashboardPath(`${editor_url}lessons/`));
					}

					new_state.release_lesson_opened = true;
				}
			} else {
				ajaxToast(resp);
			}

			setState({
				...state,
				...new_state
			});
		},
		percent=>{
			setUploadPercent(percent);
		});
	}

	const fetchContent=()=>{

		if ( content_id === 0 ) {
			if ( ! readonly_mode ) {
				submit('draft');
			}
			return;
		}
		
		setState({...state, fetching: true});

		request('getSingleContent', {content_id, content_type, is_editor: true}, resp=>{
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

				values.contributor_id           = content.contributor_id ?? null;
				values.content_title            = content.content_title ?? '';
				values.kses_content_description = content.content_description ?? '';
				values.content_permalink        = content.content_permalink ?? '';
				values.content_slug             = content.content_slug ?? '';
				values.category_id              = content.category_id ?? 0;
				values.thumbnail                = content.media?.thumbnail ?? null;
				values.preview                  = content.media?.preview ?? null;
				values.sample_images            = content.media?.sample_images ?? [];
				values.product                  = content.product ?? {};

				if ( release ) {
					values.downloadable_file = {
						file_id: release.file_id,
						file_url: release.downloadable_url,
						file_name: release.file_name,
						mime_type: release.mime_type,
					}

					// Add latest release info too for downloadable file update feature
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
				...state,
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
	const thumbnail_url = state.thumbnail_url || state.values.thumbnail?.file_url;
	const setup_link = `${window[data_pointer].permalinks.settings}#/settings/contents/${content_type}/`;
	const stuff_id = parseInt(active_stuff_id || 0);

	if ( state.error_message ) {
		return <div className={'text-align-center color-error'.classNames()}>
			{state.error_message}
		</div>
	}

	return <div 
		className={'content-editor'.classNames(style)} 
		style={{maxWidth: '900px', margin: '20px auto'}}
	>
		{/* Header */}
		<div className={"margin-top-20 margin-bottom-30 d-flex align-items-center column-gap-10".classNames()}>
			<i 
				className={"ch-icon ch-icon-arrow-left cursor-pointer".classNames()}
				onClick={()=>{
					if (window.history.state?.idx) {
						window.history.back();
						return;
					}
					navigate(getDashboardPath(`inventory/${content_type}/${stuff_id ? `editor/${content_id}/${active_tab}/` : ''}`));
				}} 
			></i>
			<span>
				{
					!content_id ? 
						sprintf(__('Add New %s'), _content.label) : 
						(stuff_id ? __('Back') : (state.update_title || _content.label))
				}
			</span>
			<LoadingIcon show={state.fetching}/>
		</div>

		{
			['app', 'tutorial'].indexOf(content_type)===-1 ? null :
			<div className={'margin-bottom-20'.classNames()}>
				<Tabs
					theme="button"
					active={active_tab}
					onNavigate={(active_tab) => navigate(getDashboardPath(`inventory/${content_type}/editor/${_content_id}/${active_tab}/`))}
					tabs={[
						{
							id: 'overview',
							label: __('Overview')
						},
						{
							id: content_type === 'app' ? 'release-manager' : 'lessons',
							label: content_type === 'app' ? __('Release Management') : __('Lessons')
						}
					]}
				/>
			</div>
			
		}

		{(active_tab=='release-manager' && content_type==='app') ? <ReleaseManager content_id={content_id}/> : null}
		{(active_tab=='lessons' && content_type==='tutorial') ? <TutorialManager content_id={content_id} lesson_id={stuff_id} navigate={navigate} content_type={content_type}/> : null}
		
		{
			active_tab !== 'overview' ? null :
			<>
				<div className={'border-radius-10 padding-30 border-1 b-color-text-10 bg-color-white'.classNames()}>
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
								maxlength, 
								options=[],
								render = true,
								show_setup_link = false
							} = field;

							return (!render || (type=='dropdown' && isEmpty(options))) ? null : 
							<div key={name}>
								<div className={'field-wrapper'.classNames(style)}>
									<div>
										<strong className={'d-flex align-items-center column-gap-5 font-weight-600 margin-bottom-5'.classNames()}>
											<span className={'color-text-80'.classNames()}>
												{label}{required ? <span className={'color-error'.classNames()}>*</span> : null}
											</span>
											{
												(!is_admin || !show_setup_link) ? null :
												<a 
													href={setup_link}
													target="_blank"
													className={'ch-icon ch-icon-settings-gear color-material-80 interactive'.classNames()}
												></a>
											}
										</strong>
										{
											!hint ? null :
											<small className={'d-block font-size-13 margin-bottom-5'.classNames()}>
												{hint}
											</small>
										}
									</div>
									<div data-cylector={`content-input-wrapper-${name}`}>
										{
											('text' !=type && 'textarea' != type ) ? null :
											<TextField 
												type={type}
												placeholder={placeholder} 
												onChange={v=>setVal(name, v)}
												value={state.values[name]}
											/>
										}

										{
											(name !== 'content_title' || !content_id) ? null :
											
											<div className={'d-flex align-items-center flex-wrap-wrap'.classNames()} style={{height: '30px', marginTop: '5px'}}>
											
												<div 
													className={'d-flex align-items-center flex-wrap-wrap flex-direction-row column-gap-5'.classNames()}
												>
													<a 
														href={state.values.content_permalink} 
														target='_blank'
														className={'color-material-80 font-size-13 interactive'.classNames()}
													>
														{
															window[data_pointer].permalinks.gallery[content_type]}{state.slug_editor ? null : <>
																<strong>{state.values.content_slug}</strong>/
															</>
														}
													</a>
												</div>

												{
													!state.slug_editor ? 
														<i 
															className={'ch-icon ch-icon-edit-2 cursor-pointer font-size-18'.classNames()}
															onClick={()=>setState({...state, slug_editor: true})}></i>
														:
														<TextField 
															style={{width: '170px', height: '30px', padding: '0 9px'}}
															value={state.values.content_slug}
															autofocus={true}
															onChange={content_slug=>setVal('content_slug', content_slug)}
															onBlur={updateSlug}
															onKeyUp={e=>e.key === 'Enter' ? updateSlug() : null}
															disabled={readonly_mode || state.updating_slug}
														/>
												}
											</div>
										}

										{
											'textarea_rich' !== type ? null : (
												state.fetching ? 
												<div>
													{__('Loading...')}
												</div>
												:
												<TinyEditor
													placeholder={__('Write description..')}
													value={state.values[name]}
													onChange={v=>setVal(name, v)}
													content_id={content_id}
												/>
											)
										}

										{
											'file' !== type ? null :
											<FileUpload 
												layout={name==='thumbnail' ? 'thumbnail' : null}
												accept={accept}
												onChange={v=>setVal(name, v)}
												maxlength={maxlength}
												value={state.values[name] || null}
												removable={removable}
												imageMaxWidth={1200}
											/>
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
								</div>
							</div>
						})
					}

					<DoAction 
						action="solidie_content_editor_after_form" 
						payload={{
							content: state.values,
							content_type,
							content_type_label: _content.label,
							field_wrapper_class: 'field-wrapper'.classNames(style),
							onChange: setVal
						}}
					/>
					
				</div>	
				<div className={'text-align-right margin-top-15'.classNames()}>
					<button 
						data-cylector="content-save"
						className={'button button-primary'.classNames()} 
						onClick={publish}
						disabled={
							readonly_mode || 
							state.submitting || 
							isEmpty(content_title)
						} 
					>
						{__('Publish')} {(state.submitting && uploadPercent) ? ` - ${uploadPercent}%` : null} <LoadingIcon show={state.submitting}/>
					</button>
				</div>	
			</>
		}
	</div>
}
