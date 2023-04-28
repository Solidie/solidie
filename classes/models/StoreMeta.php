<?php

namespace AppStore\Models;

use AppStore\Base;
use Error;

class StoreMeta extends Base {
	/**
	 * Add meta for store
	 *
	 * @param integer $store_id
	 * @param string $key
	 * @param mixed $value
	 * @return void
	 */
	public static function addStoreMeta( int $store_id, string $key, $value ) {
		global $wpdb;
		$wpdb->insert(
			self::table( 'storemeta' ),
			array(
				'store_id'   => $store_id,
				'meta_key'   => $key,
				'meta_value' => maybe_serialize( $value ),
			)
		);
	}

	/**
	 * Update store meta
	 *
	 * @param integer $store_id
	 * @param string $key
	 * @param mixed $value
	 * @return void
	 */
	public static function updateStoreMeta( int $store_id, string $key, $value ) {
		global $wpdb;
		$existing_meta = self::getStoreMeta( $store_id, $key );

		if ( count( $existing_meta ) > 1 ) {
			throw new Error( sprintf( 'Multi value store meta can\'t be updated. Store ID: %d, Meta key: %s', $store_id, $key )  );
		
		} else if ( count( $existing_meta ) === 1 ) {
			$wpdb->update(
				self::table( 'storemeta' ),
				array(
					'meta_value' => maybe_serialize( $value ),
				),
				array(
					'store_id' => $store_id,
					'meta_key' => $key,
				)
			);
		} else {
			self::addStoreMeta( $store_id, $key, $value );
		}
	}

	/**
	 * Get store meta
	 *
	 * @param integer $store_id
	 * @param string $key
	 * @param boolean $singular
	 * @param mixed $default
	 * @return array|mixed
	 */
	public static function getStoreMeta( int $store_id, string $key, bool $singular = false, $default = null ) {
		global $wpdb;

		$limit_clause = $singular ? " LIMIT 1" : '';

		$results = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT meta_value FROM ".self::table( 'storemeta' )." WHERE store_id=%d AND meta_key=%d " . $limit_clause,
				$store_id,
				$key
			)
		);

		$meta_values = array_map(
			function( $value ) {
				return maybe_unserialize( $value );
			},
			$results
		);

		return $singular ? ( $meta_values[0] ?? $default ) : $meta_values;
	}

	/**
	 * Delete store meta
	 *
	 * @param integer $store_id
	 * @param string $key
	 * @param mixed $value
	 * @return void
	 */
	public static function deleteStoreMeta( int $store_id, string $key, string $value = null ) {
		global $wpdb;

		$where = array(
			'store_id' => $store_id,
			'meta_key' => $key
		);

		$format = array(
			'%d',
			'%s'
		);

		if ( $value !== null ) {
			$where[] = maybe_serialize( $value );
			$format[] = '%s';
		}

		$wpdb->delete(
			self::table( 'storemeta' ),
			$where,
			$format
		);
	}

	/**
	 * Reverse of getStoreMeta. It returns store ID by meta key and meta value.
	 *
	 * @param string $key
	 * @param mixed $value
	 * @return int|null
	 */
	public static function getStoreIDByKeyValue( string $key, $value ) {
		global $wpdb;

		$id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT store_id FROM ".self::table( 'storemeta' )." WHERE meta_key=%s AND meta_value=%s LIMIT 1",
				$key,
				maybe_serialize( $value )
			)
		);

		return $id;
	}
}