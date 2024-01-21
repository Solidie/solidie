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
}
