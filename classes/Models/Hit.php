<?php

namespace AppStore\Models;

use AppStore\Base;

class Hit extends Base {
	/**
	 * Register hits
	 *
	 * @param string $action
	 * @param integer|null $release_id
	 * @param integer|null $license_id
	 * @return void
	 */
	public static function registerHit( string $action, $release_id, $license_id, $endpoint ) {
		global $wpdb;
		$wpdb->insert(
			self::table( 'hits' ),
			array(
				'license_id' => $license_id,
				'release_id' => $release_id,
				'action'     => $action,
				'endpoint'   => $endpoint,
				'ip_address' => $_SERVER['REMOTE_ADDR'] ?? $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR']
			)
		);
	}
}