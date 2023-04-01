<?php

namespace AppStore\Models;

class FrontendDashboard{
	public static function getPageID() {
		return AdminSetting::get( 'dashboard_page_id' );
	}

	/**
	 * Generate dashboard URL for specific path
	 *
	 * @param string $path
	 * @return string
	 */
	public static function getUrl( string $path ) {
		$url = get_permalink( self::getPageID() ) . '/' . $path . '/';
		return preg_replace('#([^:])//+#', '$1/', $url);
	}
}