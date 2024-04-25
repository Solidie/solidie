<?php
/**
 * Main template loader
 *
 * @package solidie
 */

namespace Solidie\TemplateLoader;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Contents;
use Solidie\Setup\Route;

if ( ! defined( 'ABSPATH' ) ) { exit;
}

/**
 * 404 loader function
 *
 * @param string $message Optional message
 * @return void
 */
function load_404( $message = '' ) {
	$template = locate_template( '404.php' );
	if ( empty( $template ) ) {
		$template = Main::$configs->dir . 'templates/404.php';
	}

	status_header( 404, $message );
	require $template;
	exit;
}

$page           = get_query_var( Route::KEY );
$parsed         = wp_parse_url( Main::$configs->current_url );
$url_path       = $parsed['scheme'] . '://' . $parsed['host'] . ( ! empty( $parsed['port'] ) ? ':' . $parsed['port'] : '' ) . ( $parsed['path'] ?? '' );
$projected_path = get_home_url() . '/' . $page;

if ( strpos( $url_path, $projected_path ) !== 0 ) {
	load_404( 'Invalid Projected Path' );
}

$sub_pages    = array_filter( explode( '/', trim( trim( str_replace( $projected_path, '', $url_path ), '/' ) ) ) );
$content_slug = $sub_pages[0] ?? null;
$template     = apply_filters( 'solidie_frontend_template', null, $page );

// Now load content
if ( ! empty( $template ) ) {
	// Directly load specified template. No need firther check.
	require $template;

} else {
	// This conditional block means it is either single content page or the gallery
	$content_settings = AdminSetting::getContentSettings();
	$content          = null;

	if ( ! empty( $content_slug ) ) {
		$content_id = Contents::getContentIdBySlug( $content_slug );
		$content    = $content_id ? Contents::getContentByContentID( $content_id ) : null;
	}

	// If single, make sure the content exists
	if ( ! empty( $content_slug ) && empty( $content ) ) {
		load_404( 'Content Not Found' );
	}

	// Load the gallery/single template if the content type is enabled
	foreach ( $content_settings as $type => $setting ) {
		if ( true === $setting['enable'] && $page === $setting['slug'] ) {
			require Main::$configs->dir . 'templates/gallery.php';
			return;
		}
	}

	// Check if the content type is okay
	foreach ( $content_settings as $type => $setting ) {
		if ( $page === $setting['slug'] ) {
			// Redirect to appropriate base slug if malformed
			if ( $content['content_type'] !== $type ) {
				wp_safe_redirect( get_home_url() . '/' . $content['content_type'] . '/' . implode( '/', $sub_pages ) . '/' . ( $parsed['query'] ? '?' . $parsed['query'] : '' ), 301 );
				exit;
			}
			break;
		}
	}

	load_404();
}
