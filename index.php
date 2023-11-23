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
require_once __DIR__ . '/classes/Main.php';

(new Solidie\Main())->init( 
	(object) array(
		'app_name'          => 'appstore',
		'file'              => __FILE__,
		'mode'              => 'development',
		'root_menu_slug'    => 'solidie',
		'db_prefix'         => 'appstore_',
		'linked_table'      => 'contents',
		'linked_column'     => 'product_id',
		'current_url'       => ( is_ssl() ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],
	)
);
