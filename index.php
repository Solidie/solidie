<?php
/**
 * Plugin Name: AppStore
 * Plugin URI: https://solidie.com/product/appstore
 * Description: App selling and release management plugin
 * Author: Solidie
 * Version: 1.0.0
 * Author URI: https://solidie.com
 * Requires at least: 5.3
 * Tested up to: 6.2
 * Text Domain: appstore
 */

 // Load autoloader
require_once __DIR__ . '/vendor/autoload.php';

add_action( 'plugins_loaded', function(){
	
	$payload = array(
		'version'     => get_plugin_data( __FILE__ )['Version'],
		'file'        => __FILE__,
		'dir'         => __DIR__,
		'url'         => plugin_dir_url( __FILE__ ),
		'db_prefix'   => 'appstore_',
		'dist_url'    => plugin_dir_url( __FILE__ ) . '/dist/',
		'current_url' => "http".((!empty($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!='off')?'s':'').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']
	);

	(new Solidie\AppStore\Main())->init( (object) $payload );
} );