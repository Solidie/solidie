<!doctype html>
<html data-theme="light">
	<head>
		<?php wp_head(); ?>
	</head>
	<body>
		<div id="Solidie_Dashboard" data-frontend-dashboard-data="<?php echo esc_attr( json_encode( apply_filters( 'solidie_frontend_dashboard_data', array() ) ) ); ?>"></div>
		<?php wp_footer(); ?>
	</body>
</html>