<?php

namespace AppStore;

use AppStore\Models\AdminSetting;

class Base {
	/**
	 * Licensing variation key for apps
	 */
	const LICENSING_VARIATION = 'licensing-variation';

	/**
	 * App variations blueprint
	 *
	 * @return array
	 */
	public static function getVariationBluePrint() {
		return array(
			'Unlimited' => array(
				'license_key_limit' => null,
				'label'             => _x( 'Unlimited License', 'appstore-app-variation', 'appstore' )
			),
			'Fifty' => array(
				'license_key_limit' => 50,
				'label'             => _x( '50 Licenses', 'appstore-app-variation', 'appstore' )
			),
			'Twente' => array(
				'license_key_limit' => 20,
				'label'             => _x( '20 Licenses', 'appstore-app-variation', 'appstore' )
			),
			'Ten' => array(
				'license_key_limit' => 10,
				'label'             => _x( '10 Licenses', 'appstore-app-variation', 'appstore' )
			),
			'Five' => array(
				'license_key_limit' => 5,
				'label'             => _x( '5 Licenses', 'appstore-app-variation', 'appstore' )
			),
			'Single' => array(
				'license_key_limit' => 1,
				'label'             => _x( 'Single License', 'appstore-app-variation', 'appstore' )
			),
			'Free' => array(
				'license_key_limit' => null,
				'label'             => _x( 'Free', 'appstore-app-variation', 'appstore' )
			)
		);
	}

	public static function table( string $table_name ) {
		global $wpdb;
		return $wpdb->prefix . APPSTORE_DB_PREFIX . $table_name;
	}

	public static function getSiteCommissionRate() {
		return AdminSetting::get( 'site_commision_rate', 0 );
	}
}