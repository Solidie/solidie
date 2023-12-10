<?php
namespace Solidie\TemplateLoader;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Contents;
use Solidie\Setup\Route;

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
$parsed         = parse_url( Main::$configs->current_url );
$url_path       = $parsed['scheme'] . '://' . $parsed['host'] . ( $parsed['port'] ? ':' . $parsed['port'] : '' ) . ( $parsed['path'] ?? '' );
$projected_path = get_home_url() . '/' . $page;

if ( strpos( $url_path, $projected_path ) !== 0 ) {
	load_404( 'Invalid Projected Path' );
}

$sub_pages         = array_filter(explode( '/', trim( trim( str_replace( $projected_path, '', $url_path ), '/' ) ) ) );
$content_post_name = $sub_pages[0] ?? null;
$template          = apply_filters( 'solidie_frontend_template', null, $page );

// Now load content
if ( ! empty( $template ) ) {
	require $template;

} else {
	// This conditional block means it is either single content page or the catalog
	$content_settings = AdminSetting::get( 'contents' );
	$content          = $content_post_name ? Contents::getContentByProduct( $content_post_name ) : null;

	// Check if the content exists
	if ( empty( $content ) ) {

		// It may be catalog page
		if ( empty( $sub_pages ) ) {
			// Check if the content type is enabled
			foreach ( $content_settings as $type => $setting ) {
				if ( $setting['enable'] == true && $page === $setting['slug'] ) {
					require Main::$configs->dir . 'templates/catalog.php';
					return;
				}
			}
		}

		load_404( 'Content Not Found' );
	}

	// Loop through contents to check if the base slug is okay
	foreach ( $content_settings as $type => $setting ) {
		if ( $setting['slug'] == $page ) {
			// Redirect to appropriate base slug if malformed
			if ( $content['content_type'] !== $type ) {
				wp_safe_redirect( get_home_url() . '/' . $content['content_type'] . '/' . implode( '/', $sub_pages ) . '/' . ( $parsed['query'] ? '?'.$parsed['query'] : '' ), 301 );
				exit;
			}
			break;
		}
	}
	
	if ( count( $sub_pages ) === 1 ) {
		// Pretend like it's native single product page
		query_posts( 
			array(
				'post_type'   => 'product',
				'post_status' => 'publish',
				'p'           => $content['product_id'],
			)
		);
		the_post();
		require Main::$configs->dir . 'templates/single-content.php';
	} else {
		// Single product tutorial page, supports unlimited sub path. For now show 404.
		load_404( 'Tutorial Logics To Be Added' );
	}
} 
