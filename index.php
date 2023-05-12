<?php
/**
 * Plugin Name: AppStore
 * Plugin URI: https://www.google.com
 * Description: App Selling and Distribution Platform
 * Author: Solidie
 * Version: 1.0.0
 * Author URI: https://solidie.com
 * Requires at least: 5.3
 * Tested up to: 6.2
 * Text Domain: appstore
 */

add_action( 'plugins_loaded', function(){
	// Define Commonly used constants
	// $data = get_plugin_data( __FILE__ );
	define( 'APPSTORE_VERSION', '1.0.0' );
	define( 'APPSTORE_FILE', __FILE__ );
	define( 'APPSTORE_DIR', __DIR__ . DIRECTORY_SEPARATOR );
	define( 'APPSTORE_URL', 'http://localhost/appstore/wp-content/plugins/appstore/' );
	define( 'APPSTORE_DB_PREFIX', 'appstore_' );
	define( 'APPSTORE_DIST_URL', APPSTORE_URL . '/dist/' );
	define( 'APPSTORE_CURRENT_URL', "http".((!empty($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!='off')?'s':'').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
	
	require_once 'classes/Init.php';
	(new \AppStore\Init())->setup();
} );