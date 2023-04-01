export function request(action, payload={}, callback) {
	if(typeof payload=='function') {
		callback = payload;
		payload = {};
	}

	payload = {
		...payload, 
		...window.AppStore.nonce, 
		action
	};

	window.jQuery.ajax({
		url: window.AppStore.ajax_url,
		type: 'POST',
		data: payload,
		success: function(response) {
			callback(response.data);
		},
		error: function() {

		}
	})
}