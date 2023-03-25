<?php

require_once 'classes/dispatcher.php';

new \AppStore\Dispatcher();

add_action( 'wp_head', function() {
	$data = array(
		'ajax_url' => admin_url( 'admin-ajax.php' )
	);
	
	echo '<script>window.AppStore=' . json_encode( $data ) . '</script>';
} );

add_filter('show_admin_bar', '__return_false');
