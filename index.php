<?php
/**
 * Plugin Name: Solidie
 * Plugin URI: https://solidie.com
 * Description: Digital content selling and release management plugin
 * Author: Solidie
 * Version: 1.0.0
 * Author URI: https://solidie.com
 * Requires at least: 5.3
 * Tested up to: 6.2
 * Text Domain: solidie
 */

 // Load autoloader
require_once __DIR__ . '/vendor/autoload.php';

add_action( 'plugins_loaded', function(){

	$payload = array(
		'content_name'      => 'appstore',
		'content_title'     => 'AppStore',
		'is_free'           => false,
		'file'              => __FILE__,
		'root_menu_slug'    => 'solidie',
		'continuous_update' => false,
		
		'db_prefix'         => 'appstore_',
		'linked_table'      => 'contents',
		'linked_column'     => 'product_id',
		'version'           => '1.0.0',
		'dir'               => __DIR__ . '/',
		'url'               => plugin_dir_url( __FILE__ ),
		'dist_url'          => plugin_dir_url( __FILE__ ) . '/dist/',
		'current_url'       => "http".((!empty($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!='off')?'s':'').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']
	);

	(new Solidie\Store\Main())->init( (object) $payload );
} );