<!doctype html>
<html>
	<head>
		<?php wp_head(); ?>
	</head>
	<body>
		<div id="AppStore_Dashboard" data-frontend-dashboard-data="<?php echo esc_attr( json_encode( apply_filters( 'appstore_frontend_dashboard_data', array() ) ) ); ?>"></div>
		<?php wp_footer(); ?>
	</body>
</html>