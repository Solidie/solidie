<!doctype html>
<html>
	<head>
		<?php require 'header.php'; ?>
	</head>
	<body>
		<div id="AppStore_Dashboard" data-frontend-dashboard-data="<?php echo esc_attr( json_encode( apply_filters( 'appstore_frontend_dashboard_data', array() ) ) ); ?>"></div>
		<script src="<?php echo APPSTORE_DIST_URL; ?>frontend-dashboard.js"></script>
		<?php require 'footer.php'; ?>
	</body>
</html>