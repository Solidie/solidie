<?php

namespace Solidie\Store\Models;

class FrontendDashboard{
	public static function getPageID() {
		return AdminSetting::get( 'dashboard_page_id' );
	}

	public static function is_dashboard() {
		return is_page() && get_the_ID() == self::getPageID();
	}

	/**
	 * Generate dashboard URL for specific path
	 *
	 * @param string $path
	 * @return string
	 */
	public static function getUrl( $path = null ) {
		$url = get_permalink( self::getPageID() );
		if ( $path ) {
			$url .= '/' . $path . '/';
		}

		return esc_url( $url );
	}
}