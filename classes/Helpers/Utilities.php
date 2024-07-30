<?php
/**
 * The utilities functionalities
 *
 * @package solidie
 */

namespace Solidie\Helpers;

use Solidie\Main;

/**
 * The class
 */
class Utilities {

	/**
	 * Pro plugin path constant
	 */
	const PRO_PATH = 'solidie-pro/solidie-pro.php';

	/**
	 * Check if the page is a Crew Dashboard
	 *
	 * @param string $sub_page Optional sub page name to match too
	 * @return boolean
	 */
	public static function isAdminDashboard( $sub_page = null ) {
		$is_dashboard = is_admin() && get_admin_page_parent() === Main::$configs->root_menu_slug;

		if ( $is_dashboard && null !== $sub_page ) {

			// Accessing $_GET['page'] directly will most likely show nonce error in wpcs check.
			// However checking nonce is pointless since visitor can visit dashboard pages from bookmark or direct link.

			$current_page = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$pages        = ! is_array( $sub_page ) ? array( $sub_page ) : $sub_page;
			$is_dashboard = in_array( $current_page, $pages, true );
		}

		return $is_dashboard;
	}

	/**
	 * Check if Solidie Pro version installed or not
	 *
	 * @param boolean $check_active
	 * @return boolean
	 */
	public static function isProInstalled( $check_active = false ) {

		if ( file_exists( trailingslashit( WP_PLUGIN_DIR ) . self::PRO_PATH ) ) {
			return true && ( ! $check_active || ( function_exists( 'is_plugin_active' ) && is_plugin_active( self::PRO_PATH ) ) );
		}

		return false;
	}

	/**
	 * Get unique ID to point solid app in any setup
	 *
	 * @return string
	 */
	public static function getSolidieId( $url ) {
		$pattern = '/\/([^\/]+)\/wp-content\/(plugins|themes)\/([^\/]+)\/.*/';
		preg_match( $pattern, $url, $matches );

		$parsed_string = strtolower( "CrewMat_{$matches[1]}_{$matches[3]}" );
		$app_id        = preg_replace( '/[^a-zA-Z0-9_]/', '', $parsed_string );

		return $app_id;
	}

	/**
	 * Generate admin page urls
	 *
	 * @param string $page
	 * @return string
	 */
	public static function getBackendPermalink( string $page ) {
		return add_query_arg(
			array(
				'page' => $page,
			),
			admin_url( 'admin.php' )
		);
	}

	/**
	 * Return page list especially for settings page
	 *
	 * @param init $limit How many pages t oget
	 *
	 * @return array
	 */
	public static function getPageList( $limit ) {
		// Define arguments for get_posts to retrieve pages
		$args = array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'numberposts' => $limit,
		);

		// Get the list of pages
		$pages = get_posts( $args );

		$page_list = array_map(
			function ( $page ) {
				return array(
					'id'    => (int) $page->ID,
					'label' => $page->post_title,
				);
			},
			$pages
		);

		return $page_list;
	}
}
