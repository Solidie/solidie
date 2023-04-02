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
	public static function getStoreURL( string $slug, $sub_page = null ) {
		$url = FrontendDashboard::getUrl( '/store/' . $slug . '/');
		if ( $sub_page ) {
			$url .= '/' . $sub_page . '/';
		}

		return esc_url( $url );
	}

	/**
	 * Update user role for store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @param string $role
	 * @param bool $check_capability
	 * @return void
	 */
	public function updateStoreKeeperRole( int $store_id, int $user_id, string $role, $check_capability = true ) {
		if ( $check_capability && ! self::hasKeeperRole( $store_id, get_current_user_id(), 'admin' ) ) {
			return false;
		}

		global $wpdb;
		$keeper = DB::app_store_keepers();

		if ( self::getKeeperRole( $store_id, $user_id ) ) {
			$wpdb->update( $keeper, array( 'role' => $role ), array( 'store_id' => $store_id, 'user_id' => $user_id ) );
		} else {
			$wpdb->insert( 
				$keeper, 
				array( 
					'store_id' => $store_id,
					'user_id'  => $user_id,
					'role'     => $role
				) 
			);
		}
	}

	/**
	 * Check if user has role for the store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @param string|array $role
	 * @return boolean
	 */
	public static function hasKeeperRole( int $store_id, int $user_id, $role ) {
		// Convert to array
		if ( ! is_array( $role ) ) {
			$role = array( $role );
		}

		$keeper_role = self::getKeeperRole( $store_id, $user_id );

		return $keeper_role && in_array( $keeper_role, $role );
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
				"SELECT role FROM {$keepers} WHERE store_id=%d AND user_id=%d",
				$store_id,
				$user_id
			)
		);

		return $role ? $role : null;
	}

	/**
	 * Return stores that the user has access to.
	 *
	 * @param integer $user_id
	 * @param string $role
	 * @return array
	 */
	public static function getStoresForKeeper( int $user_id, $role = null ) {
		global $wpdb;
		$keeping = DB::app_store_keepers();
		$store = DB::app_stores();

		$role_clause = $role ? " AND keeping.role='{$role}' " : "";

		$keepings = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT keeping.role, store.store_id, store.name AS store_name, store.slug AS store_slug 
				FROM {$keeping} keeping INNER JOIN {$store} store ON keeping.store_id=store.store_id
				WHERE keeping.user_id=%d" . $role_clause,
				$user_id
			),
			ARRAY_A
		);

		foreach ( $keepings as $index => $keep ) {
			$keepings[ $index ]['store_url'] = self::getStoreURL( $keep['store_slug'] );
		}

		return $keepings;
	}

	/**
	 * Returns apps in store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @return array
	 */
	public static function getApps( int $store_id ) {
		global $wpdb;
		$apps     = DB::app_apps();

		$apps = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT product.post_title AS app_name, product.ID as product_id, app.app_id, app.status AS app_status
				FROM {$wpdb->posts} product INNER JOIN {$apps} app ON product.ID=app.product_id
				WHERE app.store_id=%d",
				$store_id
			),
			ARRAY_A
		);
		
		
		return $apps;
	}
}