<?php

namespace AppStore\Models;

class Store {

	/**
	 * Create a new store
	 *
	 * @param string $store_name
	 * @return void
	 */
	public static function createStore( string $store_name ) {
		global $wpdb;
		$store = DB::app_stores();

		$wpdb->insert( 
			$store, 
			array(
				'name' => $store_name
			)
		);
		
		$store_id = $wpdb->insert_id;

		// Make the ID slug for now, user can change in dashboard
		$wpdb->update( $store, array( 'slug' => $store_id ), array( 'store_id' => $store_id ) );

		// Make current user admin of the store
		self::updateStoreKeeperRole( $store_id, get_current_user_id(), 'admin', false );

		return self::getStoreURL( $store_id );
	}

	/**
	 * Generate store url
	 *
	 * @param string|int $id_or_slug
	 * @return void
	 */
	public function getStoreURL( string $slug, $sub_page = null ) {
		$url = FrontendDashboard::getUrl( '/store/' . $slug . '/');
		if ( $sub_page ) {
			$url .= '/' . $sub_page . '/';
		}

		return preg_replace('#([^:])//+#', '$1/', $url);
	}

	/**
	 * Update user role for store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @param string $role
	 * @return void
	 */
	public function updateStoreKeeperRole( int $store_id, int $user_id, string $role, bool $check_capability = true ) {
		if ( $check_capability && ! self::hasKeeperRole( $store_id, get_current_user_id(), 'admin' ) ) {
			return false;
		}

		global $wpdb;
		$keeper = DB::app_store_keeprs();

		if ( self::getKeeperRole( $store_id, $user_id ) ) {
			$wpdb->update( $keeper, array( 'role' => $role ), array( 'store_id' => $store_id, 'user_id' => $user_id ) );
		} else {
			$wpdb->insert( 
				$keeper, 
				array( 
					'store_id' => $store_id,
					'user_id' => $user_id,
					'role' => $role
				) 
			);
		}
	}

	/**
	 * Check if user has role for the store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @param string $role
	 * @return boolean
	 */
	public static function hasKeeperRole( int $store_id, int $user_id, string $role ) {
		global $wpdb;
		$keepers = DB::app_store_keepers();

		$keeping_id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT keeper_id FROM {$keepers} WHERE store_id={%d} AND user_id={%d} AND role={%s}",
				$store_id,
				$user_id,
				$role
			)
		);

		return $keeping_id ? true : false;
	}

	/**
	 * Get role of a user on any store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @return string|null
	 */
	public static function getKeeperRole( int $store_id, int $user_id ) {
		global $wpdb;
		$keepers = DB::app_store_keepers();

		$role = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT role FROM {$keepers} WHERE store_id={%d} AND user_id={%d}",
				$store_id,
				$user_id
			)
		);

		return $role ? $role : null;
	}
}