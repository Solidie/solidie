import React, { useContext, useEffect, useRef, useState } from "react";

import {getRandomString, __, data_pointer, sprintf, isEmpty, downscaleImage} from 'solidie-materials/helpers.jsx';
import {request} from 'solidie-materials/request.jsx';
import { ContextToast } from "solidie-materials/toast/toast.jsx";

const supported_types = ['image', 'audio', 'video'];
const {readonly_mode, permalinks: {ajaxurl}} = window[data_pointer];

const getMediaMarkup=(file_id, file_url, mime)=>{

	const style   = `style="max-width:100%; width:100%; height:auto;"`;
	const data    = `data-solidie-file-id="${file_id}"`;
	const control = `controls="controls" preload="auto"`;
	
	if ( mime.indexOf('image/') === 0 ) {
		return `<img src="${file_url}" ${style} ${data}/>`;
	}

	if ( mime.indexOf('audio/') === 0 ) {
		return `<audio style="max-width:100%; width:100%;" ${control}>
			<source src="${file_url}" ${data}/>
		</audio>`;
	}

	if ( mime.indexOf('video/') === 0 ) {
		return `<video ${style} ${control}>
			<source src="${file_url}" ${data}/>
		</video>`;
	}
}

/**
 * This component requires you to load tinymce library separately.
 */
export function TinyEditor({value, onChange, content_id, lesson_id}) {

	const {
		is_admin,
		settings: {
			general: {
				content_lesson_attachment_max_size=1,
				content_lesson_attachment_supports=[]
			}
		}
	} = window[data_pointer];

	const accept_types = is_admin ? supported_types : content_lesson_attachment_supports.filter(t=>supported_types.indexOf(t)>-1);
	
	const input_reff = useRef();
	const {ajaxToast, addToast} = useContext(ContextToast);

	const [state, setState] = useState({
		id: '_' + getRandomString(),
		uploading: false
	});

	const [content, setContent] = useState(value);

	const openUploader=()=>{
		if ( ! content_id ) {
			addToast({
				message: __('Please enter content title first'),
				status: 'error'
			});
			return;
		}
		input_reff.current.click();
	}

	const acceptFiles=(e)=>{

		const file = e.currentTarget.files?.[0];
		input_reff.current.value = '';

		if ( ! file ) {
			return;
		}

		const is_image = file.type?.indexOf?.('image/') === 0;

		if ( ! is_admin ) {

			const type = (file.type || '').split('/')[0];
			if ( accept_types.indexOf( type ) === -1 ) {
				addToast({
					message: __('Invalid file selected'),
					dismissible: true,
					status: 'error'
				});
				return;
			}

			if ( ! is_image && file.size > content_lesson_attachment_max_size*1024*1024 ) {
				addToast({
					message: sprintf(__('Max file size is %s MB'), content_lesson_attachment_max_size),
					dismissible: true,
					status: 'error'
				});
				return;
			}
		}

		setState({
			...state,
			uploading: true
		});

		window.jQuery('[data-mce-name="custom-media-upload"] span').addClass('solidie-tinymce-ticking');

		const sendRequest=(file)=>{
			request('uploadContentDescMedia', {file, content_id, lesson_id}, resp=>{
				const  {
					success,
					data: {
						file_id,
						file_url
					}
				} = resp;

				window.jQuery('[data-mce-name="custom-media-upload"] span').removeClass('solidie-tinymce-ticking');

				setState({
					...state,
					uploading: false
				});

				if ( ! success ) {
					ajaxToast( resp );
					return;
				}

				const content = getMediaMarkup( file_id, file_url, file.type);
				if ( ! content ) {
					addToast({
						message: __('Invalid content attachment'),
						status: 'error'
					});
					return;
				}

				const ed = tinymce.get(state.id);
				ed.insertContent(content);
				ed.fire('input');
			});
		}
		
		if ( is_image ) {
			downscaleImage(file, 720).then(sendRequest);
		} else {
			sendRequest(file);
		}
	}
  
	useEffect(()=>{
		tinymce.init({
			selector: `#${state.id}`,
			license_key: 'gpl',
			height: 500,
			menubar: false,
			contextmenu: 'table',
			plugins: 'directionality searchreplace autolink image media link codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount',
			toolbar: 'undo redo styles fontsize bold italic strikethrough  superscript subscript ltr rtl link align numlist bullist outdent indent table codesample removeformat custom-media-upload',
			setup: function (editor) {

				// Set default value
				editor.on('init', function () {
					editor.setContent(content || '');
				});

				// Set on input event handler
				editor.on('input', function () {
					setContent( editor.getContent() );
				});

				// Set on change event handler
				editor.on('change', function () {
					setContent( editor.getContent() );
				});

				if ( ! readonly_mode && ! isEmpty( accept_types ) ) {
					editor.ui.registry.addButton('custom-media-upload', {
						icon: 'image',
						tooltip: 'Insert Media',
						onAction: (_) => {
							openUploader();
						},
					});
				}
			},
			paste_preprocess: function(plugin, args) {

				if ( is_admin || content_lesson_attachment_supports.indexOf('youtube')>-1 ) {
	
					var youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
					
					if (youtubeRegex.test(args.content)) {
						var videoId = args.content.match(youtubeRegex)[1];
						args.content = '<iframe style="width: 100%; height: 350px;" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
					}
				}
			}
		});

		return ()=>{
			const editor = tinymce.get(state.id);
			if ( editor ) {
				editor.remove();
			}
		}
	}, []);

	useEffect(()=>{
		onChange(content.replaceAll('src="admin-ajax.php?', `src="${ajaxurl}?`));
	}, [content]);
	
  	return <div>

		<input 
			type="file" 
			ref={input_reff}
			onChange={acceptFiles}
			multiple={false}
			accept={accept_types.map(c=>c+'/*').join(',')}
			style={{display: 'none'}}
		/>

		<div id={state.id}></div>
	</div> 
}
