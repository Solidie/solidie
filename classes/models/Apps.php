<?php

namespace AppStore\Models;

use AppStore\Base;

class Apps extends Base{
	
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

		$id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT product_id FROM " . self::table( 'apps' ) . " WHERE app_id=%d",
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
			self::table( 'apps' ), 
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

	/**
	 * Get linked app id by WooCommerce product id
	 *
	 * @param integer $product_id
	 * @return object|null
	 */
	public static function getAppByProductId( int $product_id ) {
		global $wpdb;
		$app = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM " . self::table( 'apps' ) . " WHERE product_id=%d",
				$product_id
			)
		);

		return ( $app && is_object( $app ) ) ? $app : null;
	}

	/**
	 * Get app id associated with woocommerce product post name.
	 *
	 * @param string $post_name
	 * @return int|null
	 */
	public static function getAppIdByProductPostName( string $post_name ) {
		global $wpdb;

		$app_id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT app.app_id FROM ".self::table('apps')." app INNER JOIN {$wpdb->posts} product ON app.product_id=product.ID WHERE product.post_type='product' AND product.post_name=%s LIMIT 1",
				$post_name
			)
		);

		return $app_id ? $app_id : null;
	}

	/**
	 * Get purchae by order id and variation id
	 *
	 * @param integer $order_id
	 * @param integer $variation_id
	 * @return object|null
	 */
	public static function getPurchaseByOrderVariation( int $order_id, int $variation_id ) {
		global $wpdb;
		$purchase = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM " . self::table( 'sales' ) . " WHERE order_id=%d AND variation_id=%d",
				$order_id,
				$variation_id
			)
		);

		return ( $purchase && is_object( $purchase ) ) ? $purchase : null;
	}

	/**
	 * Link apps to customer after order complete
	 *
	 * @param integer $order_id
	 * @return void
	 */
	public static function processPurchase( int $order_id ) {
		global $wpdb;
		$apps            = self::getAppsFromOrder( $order_id );
		$commission_rate = self::getSiteCommissionRate();

		foreach ( $apps as $app ) {
			// Skip if already added
			if ( self::getPurchaseByOrderVariation( $order_id, $app['variation_id'] ) ) {
				continue;
			}

			// Calculate commission
			$sale_price = (int)$app['sale_price'];
			$commission = ( $commission_rate / 100 ) * $sale_price;

			// Variation validity
			$expires_on  = null;
			$valid_days = self::getVariationValidity( new \WC_Product_Variation( $app['variation_id'] ) );
			if ( $valid_days ) {
				$expires_on = \Date( 'Y-m-d', strtotime( '+' . $valid_days . ' days' ) );
			}

			// Insert the app in the sales table
			$wpdb->insert(
				self::table( 'sales' ),
				array(
					'app_id'             => $app['app_id'],
					'customer_id'		 => wc_get_order( $order_id )->get_customer_id(),
					'order_id'           => $order_id,
					'variation_id'       => $app['variation_id'],
					'sale_price'         => $app['sale_price'],
					'commission'         => $commission,
					'commission_rate'    => $commission_rate,
					'license_key_limit'  => $app['licensing']['license_key_limit'],
					'license_expires_on' => $expires_on,
				)
			);

			// Generate license keys
			// To Do: Do not create key for free product
			Licensing::generateLicenseKeys( $wpdb->insert_id, $app['licensing']['license_key_limit'] );
		}
	}

	/**
	 * Return only purchased app info from a mixed cart
	 *
	 * @param integer $order_id
	 * @return array
	 */
	public static function getAppsFromOrder( int $order_id ) {
		$apps  = array();
		$order = wc_get_order( $order_id ); 
		
		foreach ( $order->get_items() as $item ) {
			$product_type = $item->get_product()->get_type();
			$product_id   = $item->get_product_id();
			$variation_id = $item->get_variation_id();
			$variation    = new \WC_Product_Variation( $variation_id );
			$app          = self::getAppByProductId( $product_id );
			$var_info     = self::getVariationInfo( $variation );

			// Skip non-app products or unsupported variation.
			if ( ! $app || 'variation' !== $product_type || ! $var_info ) {
				continue;
			}

			// To Do: Get sale price in USD currency
			$apps[] = array(
				'product_id'     => $product_id,
				'app_id'         => $app->app_id,
				'variation_id'   => $variation_id,
				'licensing'      => $var_info,
				'sale_price'     => $variation->get_sale_price(),
			);
		}

		return $apps;
	}

	/**
	 * Return variation label
	 *
	 * @param \WC_Product_Variation $variation
	 * @return array|null
	 */
	public static function getVariationInfo( \WC_Product_Variation $variation ) {
		$lincensing = self::getVariationBluePrint();
		$attributes = $variation->get_attributes();

		if ( isset( $attributes[ self::LICENSING_VARIATION ], $lincensing[ $attributes[ self::LICENSING_VARIATION ] ] ) ) {
			$data = $lincensing[ $attributes[ self::LICENSING_VARIATION ] ];
			$data['plan_key'] = $attributes[ self::LICENSING_VARIATION ];
			return $data;
		}

		return null;
	}

	/**
	 * Get variation validty in days
	 *
	 * @param \WC_Product_Variation $variation
	 * @return int|null
	 */
	public static function getVariationValidity( \WC_Product_Variation $variation ) {
		// To Do: Return days count the variation is valid for like 30, 90, 365 or null
		return 30;
	}
}