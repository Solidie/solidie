<?php
/**
 * Plugin Name: Solidie - Digital Content Showcase & Sales
 * Plugin URI: https://solidie.com
 * Description: Multimedia stock plugin to showcase and sell any digital contents like audio, video, image, ebook, apps and so on.
 * Author: JK
 * Version: 1.0.0
 * Author URI: https://github.com/jayedul
 * Requires at least: 5.3
 * Tested up to: 6.4.2
 * Requires PHP: 7.4
 * Text Domain: solidie
 *
 * @package solidie
 */

// Load autoloader
require_once __DIR__ . '/classes/Main.php';

( new Solidie\Main() )->init(
	(object) array(
		'file'           => __FILE__,
		'mode'           => 'development',
		'root_menu_slug' => 'solidie',
		'db_prefix'      => 'solidie_',
		'current_url'    => ( is_ssl() ? 'https' : 'http' ) . '://' . sanitize_text_field( wp_unslash( $_SERVER['HTTP_HOST'] ?? '' ) ) . sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ?? '' ) ),
	)
);
