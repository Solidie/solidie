import React, { useContext, useEffect, useState } from "react";
import currencySymbol from "currency-symbol-map/map";

import {TextField} from 'solidie-materials/text-field/text-field.jsx';
import {FileUpload} from 'solidie-materials/file-upload/file-upload.jsx';
import {request} from 'solidie-materials/request.jsx';
import {confirm} from 'solidie-materials/prompts.jsx';
import {LoadingIcon} from 'solidie-materials/loading-icon/loading-icon.jsx';
import { __, data_pointer, isEmpty, sprintf, getDashboardPath } from "solidie-materials/helpers.jsx";
import { ContextToast } from "solidie-materials/toast/toast.jsx";
import { DropDown } from "solidie-materials/dropdown/dropdown.jsx";
import { DoAction } from "solidie-materials/mountpoint.jsx";
import { Tabs } from "solidie-materials/tabs/tabs.jsx";
import { NumberField } from "solidie-materials/number-field/number-field.jsx";

import { getFlattenedCategories } from "../../../admin-dashboard/settings/general/content-type/category-editor.jsx";
import { ReleaseManager } from "../release-manager/release-manager.jsx";
import { TutorialManager } from "../tutorial-manager/tutorial-manager.jsx";
import { TinyEditor } from "./Tiny.jsx";

import style from './editor.module.scss';
import { contact_formats } from "../../../frontend/single/index.jsx";

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
		slug_editor: false,
		updating_slug: false,
		fetching: false,
		error_message: null,
		update_title: null,
		thumbnail_url: null,
		mounted: false,
		values: {
			content_title: sprintf(__('Untitled %s'), (window[data_pointer].settings.contents[content_type]?.label || __('Content'))),
			kses_content_description: '',
			category_id: 0,
			thumbnail: null, // General purpose content thumbnail, video poster
			sample_images:[], // Sample images for fonts, photo templates, apps
			preview: null, // Preview file for pdf, audio, video etc that can be seen on the website directly
			downloadable_file: null, // The actual file to be downloaded by user, it holds all the resouce. Maybe zip, rar, tar, video etc.
		},
	});

	const [state2, setState2] = useState({
		submitting: false,
		release_lesson_opened: content_id ? true : false,
	});

	const [resourceState, setResourceState] = useState({
		categories:{}, 
		countries:[], 
		states: [],
		currency_code: null
	});

	const [uploadPercent, setUploadPercent] = useState(0);

	const content_title = ( state.values.content_title || '' ).trim();
	const support_exts  = (extensions[content_type] || []).map(ext=>ext.replace('.', ''));

	const classifieds_fields = content_type !== 'classified' ? [] : [
		{
			name: 'content_country_code',
			label: __('Country'),
			placeholder: __( 'Select Country' ),
			type: 'dropdown',
			required: true,
			options: resourceState.countries?.filter?.(c=>window[data_pointer].settings.contents.classified.supported_countries?.indexOf?.(c.id)>-1) || []
		},
		{
			name: 'content_state_code',
			label: __('State/Provice'),
			placeholder: __( 'Select State' ),
			type: 'dropdown',
			options: resourceState.states || []
		},
		{
			name: 'content_local_address',
			label: __('Address'),
			type: 'text',
		},
		{
			name: 'content_classified_price',
			label: `${__('Price/Payment')} (${currencySymbol[resourceState.currency_code]})`,
			type: 'number',
		},
		...Object.keys(contact_formats).map(name=>{
			const {label, placeholder} = contact_formats[name];
			return {
				name,
				label,
				placeholder,
				type: 'text',
			}
		})
	]

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
			required: true,
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
		(['app', '3d', 'font', 'tutorial', 'classified'].indexOf(content_type)===-1 ? null : {
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
			options: getFlattenedCategories(resourceState.categories?.[content_type] || []),
			show_setup_link: true
		},
		...classifieds_fields
	].filter(f=>f);

	const setVal=(name, value)=>{

		const values = {
			...state.values,
			[name]: value
		}

		// Clear up state selection if country changed
		if ( name === 'content_country_code' && value !== state.values.content_country_code ) {
			values.content_state_code = null;
		}

		setState({
			...state,
			thumbnail_url: name=='thumbnail' ? URL.createObjectURL(value) : state.thumbnail_url,
			values: {
				...state.values,
				[name]: value
			}
		});
	}

	const submit=(content_status='publish')=>{

		const is_draft = content_status === 'draft'

		setState({
			...state,
			values: {
				...state.values,
				content_status
			}
		});

		setState2({
			...state2,
			submitting: true
		});

		// Separate files from content object
		const sample_image_ids = state.values.sample_images.map(img=>img.file_id).filter(id=>id);
		const content = {content_id, content_status, is_admin, content_type};
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

		content.content_status = content_status;
		
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

				if ( message ) {
					ajaxToast(resp);
				}

				const editor_url = `inventory/${content_type}/editor/${content.content_id}/`;

				// Replace current URL state with content ID to make it update from later attempts
				if ( ! content_id ) {
					navigate(getDashboardPath(editor_url), {replace: true});
				}

				if ( ! is_draft && ! state2.release_lesson_opened ) {

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

			setState2({
				...state2,
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
				values.content_status           = content.content_status ?? 'draft';
				values.kses_content_description = content.content_description ?? '';
				values.content_permalink        = content.content_permalink ?? '';
				values.content_slug             = content.content_slug ?? '';
				values.category_id              = content.category_id ?? 0;
				values.thumbnail                = content.media?.thumbnail ?? null;
				values.preview                  = content.media?.preview ?? null;
				values.sample_images            = content.media?.sample_images ?? [];
				values.product                  = content.product ?? {};

				// Add meta data to the values
				classifieds_fields.forEach(({name})=>{
					values[ name ] = content.meta[name];
				});

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
				mounted: true,
				error_message: success ? null : message
			});
		});
	}

	const updateSlug=(_slug)=>{
		
		setState({
			...state,
			updating_slug: true
		});

		const {content_slug} = state.values;
		request('updateContentSlug', {content_id, content_slug: _slug || content_slug}, resp=>{

			const {success, data:{ content_slug, content_permalink }} = resp;

			if ( ! resp.success ) {
				ajaxToast(resp);
			}

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

	const getResources=()=>{
		request('getContentEditorResource', {country_code: state.values.content_country_code}, resp=>{
			const {data:{categories={}, countries=[], states=[], currency_code}} = resp;
			setResourceState({
				categories,
				countries,
				states, 
				currency_code
			});
		});
	}

	useEffect(()=>{
		fetchContent();
	}, [content_id]);

	useEffect(()=>{
		getResources();
	}, [state.values.content_country_code])
	
	const _content = window[data_pointer]?.settings?.contents[content_type] || {};
	const setup_link = `${window[data_pointer].permalinks.settings}#/settings/contents/${content_type}/`;
	const stuff_id = parseInt(active_stuff_id || 0);
	const upload_progress = (state2.submitting && uploadPercent) ? ` - ${uploadPercent}%` : null;
	const {content_status} = state.values;

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
				className={"sicon sicon-arrow-left cursor-pointer".classNames()}
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
													className={'sicon sicon-settings-gear color-material-80 interactive'.classNames()}
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
												value={state.values[name] || ''}
												onBlur={()=>{
													if (name==='content_title' && state.values.content_slug?.indexOf?.('untitled-')===0) {
														updateSlug(state.values.content_title);
													}
												}}
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
															className={'sicon sicon-edit-2 cursor-pointer font-size-18'.classNames()}
															onClick={()=>setState({...state, slug_editor: true})}
															data-cylector="content-slug-edit"
														></i>
														:
														<div data-cylector="content-slug-input">
															<TextField 
																style={{width: '170px', height: '30px', padding: '0 9px'}}
																value={state.values.content_slug}
																autofocus={true}
																onChange={content_slug=>setVal('content_slug', content_slug)}
																onBlur={()=>updateSlug()}
																onKeyUp={e=>e.key === 'Enter' ? updateSlug() : null}
																disabled={readonly_mode || state.updating_slug}
															/>
														</div>
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

										{
											('number' !== type || !state.mounted) ? null :
											<NumberField
												min={0}
												decimal_point={true}
												value={state.values[name] ?? 0}
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
				<div className={'d-flex align-items-center justify-content-flex-end column-gap-15 margin-top-15'.classNames()}>
					
					<LoadingIcon show={state2.submitting}/>
					
					{
						content_status !== 'draft' ? null :
						<button 
							className={'button button-outlined'.classNames()}
							onClick={()=>submit('draft')}
						>
							{__('Save Draft')} {upload_progress}
						</button>
					}

					<button 
						data-cylector="content-save"
						className={'button button-primary'.classNames()} 
						onClick={()=>confirm(__('Sure to publish?'), submit)}
						disabled={
							readonly_mode || 
							state2.submitting || 
							isEmpty(content_title) ||
							isEmpty(state.values.kses_content_description) ||
							(content_type==='classified' && isEmpty(state.values.content_country_code))
						} 
					>
						{is_admin ? __('Publish') : __('Submit')} {content_status=='publish' ? upload_progress : null} 
					</button>
				</div>	
			</>
		}
	</div>
}
