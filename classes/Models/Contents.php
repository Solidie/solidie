<?php

namespace Solidie\Store\Models;

use Solidie\Store\Main;

class Contents extends Main{
	/**
	 * Licensing variation key for contents
	 */
	const LICENSING_VARIATION = 'licensing-variation';

	/**
	 * Free product identifer meta key
	 */
	const FREE_META_KEY = 'solidie_content_is_free';
	
	/**
	 * Get content list that is accessible by a user. 
	 *
	 * @param int $user_id
	 * @return array
	 */
	public static function getContentListForUser( $user_id ) {
		return array();
	}

	/**
	 * Get associated product id by content id
	 *
	 * @param integer $content_id
	 * @return int
	 */
	public static function getProductID( int $content_id ) {
		global $wpdb;

		$id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT product_id FROM " . self::table( 'contents' ) . " WHERE content_id=%d",
				$content_id
			)
		);

		return $id ? $id : 0;
	}

	/**
	 * Create or update content
	 *
	 * @param array $content_data
	 * @param int $store_id
	 * @return int
	 */
	public static function updateContent( int $store_id, array $content_data ) {
		$content = array();

		$content['content_id']    = ! empty( $content_data['content_id'] ) ? $content_data['content_id'] : 0;
		$content['product_id'] = ! empty( $content_data['content_id'] ) ? self::getProductID( $content['content_id'] ) : 0;
		$content['content_name']  = ! empty( $content_data['content_name'] ) ? $content_data['content_name'] : 'Untitled Content';

		// Sync core product first
		$product_id = self::syncProduct( $content, $store_id );
		if ( empty( $product_id ) ) {
			return false;
		}

		// Update product id as it might've been created newly
		$content['product_id'] = $product_id;
		
		// To Do: Sync variations and other stuffs
	}

	/**
	 * Sync product core
	 *
	 * @param array $content
	 * @param integer $store_id
	 * @return int
	 */
	private static function syncProduct( array $content, int $store_id ) {

		// Update existing product info id exists
		// To Do: Check if the propduct is in the store actually
		if ( ! empty( $content['content_id'] ) ) {
			wp_update_post(
				array(
					'ID'         => $content['product_id'],
					'post_title' => $content['content_name']
				)
			);
			
			return $content['product_id'];
		} 
		
		// Create new product
		$product = new \WC_Product_Simple();
		$product->set_name( $content['content_name'] );
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

		// Create Solidie entry
		global $wpdb;
		$wpdb->insert( 
			self::table( 'contents' ), 
			array(
				'product_id' => $product_id,
				'store_id'   => $store_id
			)
		);

		wp_update_post(
			array(
				'ID' => $product_id,
				'post_status' => 'pending'
			)
		);

		return $product_id;
	}

	private static function syncVariations() {

	}

	/**
	 * Get release log
	 *
	 * @param integer $content_id
	 * @return array
	 */
	public static function getReleases( int $content_id) {
		return array();
	}

	/**
	 * Get content by content id
	 *
	 * @param integer $content_id
	 * @return object|null
	 */
	public static function getContentByContentID( int $content_id, $field = null, $public_only = true ) {
		return self::getContentByField( 'content_id', $content_id, $field, $public_only );
	}

	/**
	 * Get content by field
	 *
	 * @param string $field_name
	 * @param string|integer $field_value
	 * 
	 * @return object|null
	 */
	public static function getContentByField( string $field_name, $field_value, $field = null, $public_only = true ) {
		// Post creator user can preview own product regardless of post status.
		$current_user_id = get_current_user_id();
		$status_clause   = $public_only ? ' AND (product.post_status="publish" OR product.post_author=' . $current_user_id . ') ' : '';

		// Admin and editor also can visit products no matter what the status is. Other users can only if the product is public.
		if ( User::hasUserRole( array( 'administrator', 'editor' ), $current_user_id ) ) {
			$status_clause = '';
		}

		global $wpdb;
		$content = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT content.*, product.post_title AS content_title FROM " . self::table( 'contents' ) . " content 
				INNER JOIN {$wpdb->posts} product ON content.product_id=product.ID 
				INNER JOIN {$wpdb->users} author ON product.post_author=author.ID
				WHERE content." . $field_name . "=%s" . $status_clause,
				$field_value
			)
		);

		$content = ( $content && is_object( $content ) ) ? $content : null;

		return $content ? ( $field ? $content->$field ?? null : $content ) : null;
	}

	/**
	 * Check if a product is solidie content
	 *
	 * @param string|int $product_id_or_name
	 * @return boolean
	 */
	public static function isProductContent( $product_id_or_name ) {
		return self::getContentByProduct( $product_id_or_name ) !== null;
	}

	/**
	 * Check if a content is enabled by content ID
	 *
	 * @param object|int $content_id Content object or content id
	 * 
	 * @return boolean
	 */
	public static function isContentEnabled( $content_id ) {
		$content = is_object( $content_id ) ? $content_id : self::getContentByContentID( $content_id );
		return ! empty( $content ) ? self::isContentTypeEnabled( $content->content_type ) : false;
	}

	/**
	 * Content type check if enabled
	 *
	 * @param string $content_type
	 * @return boolean
	 */
	public static function isContentTypeEnabled( $content_type ) {
		return AdminSetting::get( 'contents.' . $content_type . '.enable' );
	}

	/**
	 * Get Content by product id and post name.
	 * 
	 * @param string|int $product_id_or_name
	 *
	 * @return object|int|string|null
	 */
	public static function getContentByProduct( $product_id, $field = null, $public_only = true ) {
		if ( ! is_numeric( $product_id ) ) {
			$product = get_page_by_path( $product_id, OBJECT, 'product' );

			if ( empty( $product ) ) {
				return null;
			}

			$product_id = $product->ID;
		}

		return self::getContentByField( 'product_id', $product_id, $field, $public_only );
	}

	/**
	 * Get permalink by product id as per content type
	 *
	 * @param int $product_id
	 * @return string
	 */
	public static function getPermalink( $product_id ) {
		$content         = self::getContentByProduct( $product_id );
		$post_name    = get_post_field( 'post_name', $product_id );
		$base_slug    = AdminSetting::get( 'contents.' . $content->content_type . '.slug' );
		return get_home_url() . '/' . trim( $base_slug, '/' ) . '/' . $post_name . '/';
	}

	/**
	 * Check if an associated content is free or not
	 *
	 * @param int|string $content_id_or_name ID if numeric, otherwise product post name.
	 * 
	 * @return boolean
	 */
	public static function isContentFree( $content_id_or_name ) {
		$product_id = is_numeric( $content_id_or_name ) ? self::getContentByContentID( $content_id_or_name, 'product_id' ) : self::getContentByProduct( $content_id_or_name, 'product_id' );
		return get_post_meta( $product_id, self::FREE_META_KEY, true ) == true;
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
	 * Link contents to customer after order complete
	 *
	 * @param integer $order_id
	 * @return void
	 */
	public static function processPurchase( int $order_id ) {
		// This method is for only initial order. Skip if it is renewal one. 
		if ( function_exists( 'wcs_order_contains_renewal' ) && wcs_order_contains_renewal( $order_id ) ) {
			return;
		}

		global $wpdb;
		$order               = wc_get_order( $order_id );
		$order_complete_date = $order->get_date_completed();
		$contents               = self::getContentsFromOrder( $order_id );
		$commission_rate     = self::getSiteCommissionRate();

		foreach ( $contents as $content ) {
			// Skip if already added
			if ( self::getPurchaseByOrderVariation( $order_id, $content['variation_id'] ) ) {
				continue;
			}

			// Calculate commission
			$sale_price   = (int)$content['sale_price'];
			$commission   = ( $commission_rate / 100 ) * $sale_price;

			// Variation validity
			$expires_on  = $content['licensing']['validity_days'] ? ( new \DateTime( $order_complete_date ) )->modify('+'.$content['licensing']['validity_days'].' days')->format('Y-m-d') : null;
			
			// Insert the content in the sales table
			$wpdb->insert(
				self::table( 'sales' ),
				array(
					'content_id'            => $content['content_id'],
					'customer_id'		 => wc_get_order( $order_id )->get_customer_id(),
					'order_id'           => $order_id,
					'variation_id'       => $content['variation_id'],
					'sale_price'         => $content['sale_price'],
					'commission'         => $commission,
					'commission_rate'    => $commission_rate,
					'license_key_limit'  => $content['licensing']['license_key_limit'],
					'license_expires_on' => $expires_on,
				)
			);

			// Generate license keys
			Licensing::generateLicenseKeys( $wpdb->insert_id, $content['licensing']['license_key_limit'] );
		}
	}

	/**
	 * When customer renews a subscription
	 *
	 * @param object $subscription
	 * @return void
	 */
	public static function processSubscriptionRenewal( $subscription ) {
		global $wpdb;
		
		$contents  = self::filterContentsFromOrderItems( $subscription->get_items() );

		foreach ( $contents as $content ) {
			// Don't update if validity is null which means lifetime license
			if ( ! $content['licensing']['validity_days'] ) {
				continue;
			}

			$wpdb->query(
				$wpdb->prepare(
					"UPDATE ".self::table( 'sales' )." SET license_expires_on=DATE_ADD(license_expires_on, INTERVAL %d DAY) WHERE content_id=%d AND license_expires_on IS NOT NULL",
					$content['licensing']['validity_days'],
					$content['content_id']
				)
			);
		}
	}

	/**
	 * Update next payment date
	 *
	 * @param object $subscription
	 * @return void
	 */
	public static function supportCustomPeriodForSubscription( $subscription ) {
		/* $parent_order = $subscription->get_parent_id();
		$subscription->set_date( 'next_payment', '2025-05-04' );
		$subscription->save(); */
	}

	/**
	 * Return only purchased content info from a mixed cart
	 *
	 * @param integer $order_id
	 * @return array
	 */
	public static function getContentsFromOrder( int $order_id ) {
		$order = wc_get_order( $order_id ); 
		return self::filterContentsFromOrderItems( $order->get_items() );
	}

	/**
	 * Filter contents from order contents
	 *
	 * @param array $contents
	 * @return array
	 */
	public static function filterContentsFromOrderItems( array $contents ) {
		$contents  = array();
		foreach ( $contents as $content ) {
			$product_type = $content->get_product()->get_type();
			$product_id   = $content->get_product_id();
			$variation_id = $content->get_variation_id();
			$variation    = new \WC_Product_Variation( $variation_id );
			$content         = self::getContentByProduct( $product_id );
			$var_info     = self::getVariationInfo( $variation );

			// Skip non-content products or unsupported variation.
			if ( ! $content || ! in_array( $product_type, array( 'subscription_variation', 'variation' ) )  || ! $var_info ) {
				continue;
			}

			// To Do: Get sale price in USD currency
			$contents[] = array(
				'content'			 => $content,
				'product_id'     => $product_id,
				'content_id'        => $content->content_id,
				'variation_id'   => $variation_id,
				'licensing'      => $var_info,
				'sale_price'     => $variation->get_sale_price(),
			);
		}

		return $contents;
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
	 * Provide necessary data to render a single content
	 *
	 * @param int $product_id
	 * @return array
	 */
	public static function getSingleContentData( $product_id ) {
		$data = array();

		/* $data['logo_url']       = get_the_post_thumbnail_url( $product_id );
		$data['content_title']  = get_post_field( 'post_title', $product_id );
		$data['demo_video_url'] = get_post_meta( $product_id, 'content_demo_url', true );
		$data['demo_url']       = get_post_meta( $product_id, 'content_demo_url', true ); */

		return $data;
	}

	/**
	 * Returns contents in store
	 *
	 * @param integer $store_id
	 * @param integer $user_id
	 * @return array
	 */
	public static function getContents( array $args ) {
		// Prepare arguments
		$store_id     = $args['store_id'] ?? null;
		$content_type = $args['content_type'] ?? null;
		$page         = $args['page'] ?? 1;
		$limit        = $args['limit'] ?? 15;

		$type_clause  = $content_type ? " AND content.content_type='" . esc_sql( $content_type ) . "'" : '';
		$store_clause = $store_id ? " AND  content.store_id='" . esc_sql( $store_id ) . "'" : '';

		
		global $wpdb;
		$contents = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT product.post_title AS content_name, product.ID as product_id, content.content_id, product.post_status AS content_status
				FROM {$wpdb->posts} product INNER JOIN " . self::table( 'contents' ) . " content ON product.ID=content.product_id
				WHERE content.store_id=%d",
				$store_id
			),
			ARRAY_A
		);
		
		return $contents;
	}
}