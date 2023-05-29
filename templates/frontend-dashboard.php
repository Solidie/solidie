<!doctype html>
<html>
	<head>
		<?php require 'header.php'; ?>
	</head>
	<body>
		<div id="Solidie_Dashboard" data-frontend-dashboard-data="<?php echo esc_attr( json_encode( apply_filters( 'solidie_frontend_dashboard_data', array() ) ) ); ?>"></div>
		<script src="<?php echo \Solidie\Store\Main::$configs->dist_url; ?>frontend-dashboard.js"></script>
		<?php require 'footer.php'; ?>
	</body>
</html>