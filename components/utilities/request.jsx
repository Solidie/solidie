export function request(action, payload={}, callback) {
	if(typeof payload=='function') {
		callback = payload;
		payload = {};
	}

	window.jQuery.ajax({
		url: window.AppStore.ajax_url,
		type: 'POST',
		data: {...payload, action},
		success: function(response) {
			callback(response.data);
		},
		error: function() {

		}
	})
}