<?php

namespace Solidie\Models;

use Solidie\Setup\AdminPage;

class FrontendDashboard{
	public static function is_dashboard() {
		return ! is_admin() && get_query_var( AdminPage::$pagename_key ) == AdminSetting::get( 'dashboard.slug' );
	}

	/**
	 * Generate dashboard URL for specific path
	 *
	 * @param string $path
	 * @return string
	 */
	public static function getUrl( $path = null ) {
		return get_home_url() . '/' . AdminSetting::get( 'dashboard.slug' ) . '/' . ( $path ? $path . '/' : '' );
	}
}