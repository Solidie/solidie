<?php
/**
 * Plugin Name: Solidie
 * Plugin URI: https://wordpress.org/plugins/solidie/
 * Description: Multimedia stock plugin to showcase any digital contents like audio, video, image, ebook, apps and so on.
 * Version: 1.1.11
 * Author: Solidie
 * Author URI: https://solidie.com/
 * Requires at least: 5.3
 * Tested up to: 6.7.1
 * Requires PHP: 7.4
 * License: GPLv3
 * License URI: https://opensource.org/licenses/GPL-3.0
 * Text Domain: solidie
 *
 * @package solidie
 */

if ( ! defined( 'ABSPATH' ) ) { exit;
}

// Load autoloader
require_once __DIR__ . '/vendor/autoload.php';

( new Solidie\Main() )->init(
	(object) array(
		'file'           => __FILE__,
		'mode'           => 'development',
		'root_menu_slug' => 'solidie',
		'db_prefix'      => 'solidie_',
		'current_url'    => ( is_ssl() ? 'https' : 'http' ) . '://' . sanitize_text_field( wp_unslash( $_SERVER['HTTP_HOST'] ?? '' ) ) . sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ?? '' ) ),
	)
);
