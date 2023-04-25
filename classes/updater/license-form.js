window.jQuery(document).ready(function($) {
	$('#appstore-license-key-form').submit(function(e) {
		var val = $(this).find('input[type="text"]').val();
		if(!val || !val.trim().length || val.indexOf('*')>-1) {
			alert('Please enter valid license key');
			e.preventDefault();
		}
	});
});