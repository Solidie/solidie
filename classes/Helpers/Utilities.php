<?php

namespace Solidie\Helpers;

use Solidie\Main;

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
			$pages        = ! is_array( $sub_page ) ? array( $sub_page ) : $sub_page;
			$is_dashboard = in_array( $_GET['page'] ?? null, $pages, true ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}

		return $is_dashboard;
	}
}
