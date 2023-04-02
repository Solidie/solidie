<?php

namespace AppStore\Models;

class Apps{
	/**
	 * Get app list that is accessible by a user. 
	 *
	 * @param int $user_id
	 * @return array
	 */
	public static function getAppListForUser( $user_id ) {
		return array();
	}

	/**
	 * Get associated product id by app id
	 *
	 * @param integer $app_id
	 * @return int
	 */
	public static function getProductID( int $app_id ) {
		global $wpdb;
		$apps = DB::app_apps();

		$id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT product_id FROM {$apps} WHERE app_id=%d",
				$app_id
			)
		);

		return $id ? $id : 0;
	}

	/**
	 * Create or update app
	 *
	 * @param array $app_data
	 * @param int $store_id
	 * @return int
	 */
	public static function updateApp( int $store_id, array $app_data ) {
		$app = array();

		$app['app_id']     = ! empty( $app_data['app_id'] ) ? $app_data['app_id'] : 0;
		$app['product_id'] = ! empty( $app_data['app_id'] ) ? self::getProductID( $app['app_id'] ) : 0;
		$app['app_name']   = ! empty( $app_data['app_name'] ) ? $app_data['app_name'] : 'Untitled App';

		// Sync core product first
		$product_id = self::syncProduct( $app, $store_id );
		if ( empty( $product_id ) ) {
			return false;
		}

		// Update product id as it might've been created newly
		$app['product_id'] = $product_id;
		
		// To Do: Sync variations and other stuffs
	}

	/**
	 * Sync product core
	 *
	 * @param array $app
	 * @param integer $store_id
	 * @return int
	 */
	private static function syncProduct( array $app, int $store_id ) {

		// Update existing product info id exists
		// To Do: Check if the propduct is in the store actually
		if ( ! empty( $app['app_id'] ) ) {
			wp_update_post(
				array(
					'ID' => $app['product_id'],
					'post_title' => $app['app_name']
				)
			);
			
			return $app['product_id'];
		} 
		
		// Create new product
		$product = new \WC_Product_Simple();
		$product->set_name( $app['app_name'] );
		// $product->set_slug( 'medium-size-wizard-hat-in-new-york' );
		$product->set_regular_price( 500.00 ); // in current shop currency
		$product->set_short_description( '<p>Here it is... A WIZARD HAT!</p><p>Only here and now.</p>' );
		$product->set_description( 'long description here...' );
		// $product->set_image_id( 90 );
		// $product->set_category_ids( array( 19 ) );
		// $product->set_tag_ids( array( 19 ) );
		$product->save();

		// Return the new ID
		$product_id = $product->get_id();

		// Create AppStore entry
		global $wpdb;
		$wpdb->insert( 
			DB::app_apps(), 
			array(
				'product_id' => $product_id,
				'status'     => 'pending',
				'store_id'   => $store_id
			)
		);

		return $product_id;
	}

	private static function syncVariations() {

	}

	/**
	 * Get release log
	 *
	 * @param integer $app_id
	 * @return array
	 */
	public static function getReleases( int $app_id) {
		return array();
	}
}