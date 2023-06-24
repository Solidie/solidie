<?php

namespace Solidie\Store\Models;

use Solidie\Store\Setup\AdminPage;

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

	/**
	 * Provide data to render frontend dashboard based on
	 *
	 * @return array
	 */
	public static function getDashboardData() {
		$contents = AdminSetting::get( 'contents' );
		$enableds = array();
		foreach ( $contents as $type => $manifest ) {
			if ( $manifest['enable'] ?? false ) {
				$enableds[ $type ] = $manifest;
			}
		}
		
		$data = array(
			'enabled_contents' => $enableds,
			'stores'           => Store::getStoresForKeeper( get_current_user_id() ),
			'avatar_url'       => get_avatar_url( get_current_user_id(), array( 'size'=> 120 ) )
		);
		
		return $data;
	}
}