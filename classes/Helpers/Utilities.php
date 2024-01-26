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
	const PRO_DIR  = 'solidie-pro';

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

		$plugins_dir = self::getPluginsDir();

		if ( file_exists( $plugins_dir . self::PRO_PATH ) ) {
			return true && ( ! $check_active || is_plugin_active( 'solidie-pro/solidie-pro.php' ) );
		}
		
		return false;
	}

	/**
	 * Get WP plugins directory path
	 *
	 * @return string
	 */
	public static function getPluginsDir() {
		return trailingslashit( trailingslashit( WP_CONTENT_DIR ) . 'plugins' );
	}

	/**
	 * Get unique ID to point solid app in any setup
	 *
	 * @return void
	 */
	public static function getSolidieId( $url ) {
		$pattern = '/\/([^\/]+)\/wp-content\/(plugins|themes)\/([^\/]+)\/.*/';
		preg_match( $pattern, $url, $matches );

		$parsed_string = strtolower( "CrewMat_{$matches[1]}_{$matches[3]}" );
		$app_id        = preg_replace( '/[^a-zA-Z0-9_]/', '', $parsed_string );

		return $app_id;
	}
}
