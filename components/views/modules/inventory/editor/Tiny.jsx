import React, { useEffect, useRef, useState } from "react";

import {getRandomString} from 'crewhrm-materials/helpers.jsx';
import {request} from 'crewhrm-materials/request.jsx';

export function TextEditor({value, onChange, content_id}) {

	const input_reff = useRef();

	const exts = [
		'.png', 
		'.jpg', 
		'.jpeg', 
		'.webp', 
		'.mp3', 
		'.wav', 
		'.mp4'
	];

	const [state, setState] = useState({
		id: '_' + getRandomString()
	});

	const openUploader=()=>{
		if ( ! content_id ) {
			alert('Please set content title first');
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

		request('uploadContentDescMedia', {file}, resp=>{
			
		});
	}
  
	useEffect(()=>{
		tinymce.init({
			selector: `#${state.id}`,
			height: 500,
			menubar: false,
			plugins: 'searchreplace autolink image link codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount',
			toolbar1: 'undo redo bold italic strikethrough superscript subscript link align numlist bullist outdent indent table codesample removeformat custom-media-upload',
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
			}
		});
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
