<?php

namespace Solidie\Store\Models;

use Solidie\Store\Main;

class Store extends Main{

	/**
	 * Available store keeper roles
	 *
	 * @var array
	 */
	public static $roles = array(
		'admin' => 'storekeeper_admin_id',
	);

	/**
	 * Create a new store
	 *
	 * @param string $store_name
	 * @return void
	 */
	public static function createStore( string $store_name ) {
		global $wpdb;

		$wpdb->insert( 
			self::table( 'stores' ), 
			array(
				'name' => $store_name
			)
		);
		
		$store_id = $wpdb->insert_id;

		// Make the ID slug for now, user can change in dashboard
		$wpdb->update(
			self::table( 'stores' ), 
			array( 'slug' => $store_id ), 
			array( 'store_id' => $store_id )
		);

		// Make current user admin of the store
		self::updateKeeperRole( $store_id, get_current_user_id(), 'admin' );

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
		foreach( self::$roles as $role => $meta_key ) {
			$keepers = StoreMeta::getStoreMeta( $store_id, $meta_key );
			if ( in_array( $user_id, $keepers ) ) {
				return $role;
			}
		}
		return null;
	}

	/**
	 * Update storekeeper role for user
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @param string $role
	 * @return void
	 */
	public static function updateKeeperRole( int $store_id, int $user_id, string $role ) {
		$current_role = self::getKeeperRole( $store_id, $user_id );

		if ( isset( self::$roles[ $current_role ] ) ) {
			if ( $current_role == $role ) {
				// Nothing to update
				return true;
			} else {
				// Delete existing role as new one requires different meta key
				StoreMeta::deleteStoreMeta( $store_id, self::$roles[ $current_role ] );
			}
		}
		

		if ( isset( self::$roles[ $role ] ) ) {
			return StoreMeta::addStoreMeta( $store_id, self::$roles[ $role ], $user_id );
		}

		return false;
	}

	/**
	 * Return stores that the user has access to regardless of role.
	 *
	 * @param integer $user_id
	 * @param string $role
	 * @return array
	 */
	public static function getStoresForKeeper( int $user_id, $role = null ) {
		global $wpdb;

		$roles = self::$roles;

		// Filter roles if specified
		if ( $role ) {
			if ( ! isset( self::$roles[ $role ] ) ) {
				return array();
			}

			$roles = array(
				$role => $roles[ $role ]
			);
		}

		// Retrieve store IDs the user has a role in
		$store_ids = array();
		foreach( $roles as $role => $meta_key ) {
			$store_id = StoreMeta::getStoreIDByKeyValue( $meta_key, $user_id );
			if ( $store_id ) {
				$store_ids[] = $store_id;
			}
		}

		// Return empty array if the user is not assigned to any store
		if ( empty( $store_ids ) ) {
			return array();
		}

		// Get store informations using store ids
		$stores = $wpdb->get_results(
			"SELECT store_id, name AS store_name, slug AS store_slug 
			FROM " . self::table( 'stores' ) . "
			WHERE store_id IN(".implode( ',', $store_ids ).")"
		);

		// Loop through stores and assign more meta data like store URL, logo information, cover informarion etc.
		foreach ( $stores as $index => $store ) {
			$stores[ $index ]->store_url = self::getStoreURL( $store->store_slug );
		}

		return array_values( $stores );
	}
}