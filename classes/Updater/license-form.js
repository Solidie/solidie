window.jQuery(document).ready(function($) {
	$('#solidie-license-key-form button').click(function(e) {
		var button = $(this);
		var val = $('#solidie-license-key-form input[type="text"]').val();
		val = (val || '').trim();

		if ( ! val || val.indexOf(' ') >-1 ) {
			alert('Please enter valid license key');
			return;
		}

		const {ajaxurl, nonce, action, content_name} = window.solidie_activate_license_data
		button.prop('disabled', true);

		window.jQuery.ajax({
			url: ajaxurl,
			type: 'POST',
			data: {
				nonce: nonce,
				action: action,
				license_key: val,
				content_name: content_name
			},
			success: function(r) {
				const message = r?.data?.message || null;
				const success = r?.success || false;

				if ( success ) {
					window.location.reload();
				} else {
					button.prop('disabled', false);
					alert(message || 'Something went wrong!');
				}
			}, 
			error: function(e) {
				button.prop('disabled', false);
				alert('Something went wrong!');
			}
		})
	});
});