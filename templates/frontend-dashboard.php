<!doctype html>
<html data-theme="light">
	<head>
		<?php wp_head(); ?>
	</head>
	<body>
		<div id="Solidie_Dashboard" class="height-p-100 width-p-100" data-frontend-dashboard-data="<?php echo esc_attr( json_encode( $dashboard_data ) ); ?>"></div>
		<?php wp_footer(); ?>
	</body>
</html>