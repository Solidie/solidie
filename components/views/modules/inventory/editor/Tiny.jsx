import React, { useContext, useEffect, useRef, useState } from "react";

import {getRandomString, __} from 'crewhrm-materials/helpers.jsx';
import {request} from 'crewhrm-materials/request.jsx';
import { ContextToast } from "crewhrm-materials/toast/toast.jsx";

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
export function TinyEditor({value, onChange, content_id}) {

	const input_reff = useRef();
	const {ajaxToast, addToast} = useContext(ContextToast);

	const exts = [
		'image/png', 
		'image/jpg', 
		'image/jpeg', 
		'image/webp', 
		'audio/mpeg', 
		'audio/wave', 
		'video/mp4'
	];

	const [state, setState] = useState({
		id: '_' + getRandomString(),
		uploading: false
	});

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

		if ( ! file ) {
			return;
		}

		input_reff.value = '';

		setState({
			...state,
			uploading: true
		})

		request('uploadContentDescMedia', {file, content_id}, resp=>{
			const  {
				success,
				data: {
					file_id,
					file_url
				}
			} = resp;

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

			tinymce.get(state.id).insertContent(content);
		});
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
					editor.setContent(value || '');
				});

				// Set on change event handler
				editor.on('change', function () {
					onChange( editor.getContent() );
				});

				editor.ui.registry.addButton('custom-media-upload', {
					icon: 'image',
					tooltip: 'Insert Media',
					onAction: (_) => {
						openUploader();
					},
				});
			},
			paste_preprocess: function(plugin, args) {

				var youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
				
				if (youtubeRegex.test(args.content)) {
					var videoId = args.content.match(youtubeRegex)[1];
					args.content = '<iframe style="width: 100%; height: 350px;" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
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
	
  	return <div>

		<input 
			type="file" 
			ref={input_reff}
			onChange={acceptFiles}
			multiple={false}
			accept={exts.join(',')}
			style={{display: 'none'}}
		/>

		<div id={state.id}></div>
	</div> 
}
