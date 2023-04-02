export function request(action, payload={}, callback, progressCallback) {
	if(typeof payload=='function') {
		callback = payload;
		payload = {};
	}

	let modifer = {
		contentType: false,
        cache: false,
   		processData:false,
	}

	let {name: nonce_name, action: nonce_action} = window.AppStore.nonce;

	if ( payload instanceof FormData ) {
		payload.append(nonce_name, nonce_action);
		payload.append('action', action);
	} else {
		modifer = {};
		payload = {
			...payload, 
			[nonce_name]: nonce_action,
			action
		};
	}

	window.jQuery.ajax({
		url: window.AppStore.ajax_url,
		type: 'POST',
		data: payload,
		...modifer,
		success: function(response) {
			if ( typeof callback == 'function' ) {
				callback(response);
			}
		},
		error: function() {

		},
		xhr: function() {
			var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener("progress", function(evt) {
				if (evt.lengthComputable) {
					var percentComplete = (evt.loaded / evt.total) * 100;
					if(typeof progressCallback=='function') {
						progressCallback(percentComplete);
					}
				}
			}, false);
			return xhr;
		},
	});
}