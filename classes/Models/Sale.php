<?php

namespace Solidie\Models;

class Sale {
	/**
	 * Get single sale by field
	 *
	 * @param string $field_name
	 * @param mixed $field_value
	 * @param string $field Single field to get value of
	 * 
	 * @return object
	 */
	public static function getSaleByField( string $field_name, $field_value, $field = null) {
		
	}

	/**
	 * Get bulk sales
	 * 
	 * @param array $args Args to get sales by.
	 *
	 * @return array
	 */
	public static function getSales( $args ) {

		$store_slug = $args['store_slug'] ?? null;
		$page       = $args['page'] ?? 1;
		$limit      = $args['limit'] ?? 20;
		$order_by   = $args['order_by'] ?? 'sale.sold_at';
		$order      = $args['order'] ?? 'DESC';
		$offset     = $limit * ( $page - 1 );

		$order_clause = " ORDER BY " . $order_by . " " . $order;
		$limit_clause = " LIMIT " . $limit . " OFFSET " . $offset;
		$store_clause = $store_slug ? " AND store.slug='" . esc_sql( $store_slug ) . "'" : '';

		global $wpdb;
		$sales = $wpdb->get_results(
				"SELECT sale.*, product.post_title AS content_title, _user.user_email AS customer_email FROM " . DB::sales() . " sale
					INNER JOIN " . DB::contents() . " content ON sale.content_id=content.content_id
					INNER JOIN {$wpdb->posts} product ON content.product_id=product.ID
					INNER JOIN " . DB::stores() . " store ON content.store_id=store.store_id
					LEFT JOIN {$wpdb->users} _user ON sale.customer_id=_user.ID
			WHERE 1=1 " 
			. $store_clause 
			. $order_clause 
			. $limit_clause
		);

		return $sales;
	}

	/**
	 * Check if the user has purchased the content
	 *
	 * @param int $content_id
	 * @param int $user_id
	 * @param boolean $check_expiry
	 * 
	 * @return boolean
	 */
	public static function hasCustomerPurchase( $content_id, $user_id, $check_expiry = true ) {
		$exp_clause = $check_expiry ? " AND license_expires_on>NOW()" : '';

		global $wpdb;
		$has = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT sale_id FROM " . DB::sales() . " WHERE content_id=%d AND customer_id=%d " . $exp_clause,
				$content_id,
				$user_id
			)
		);

		return $has;
	}

	/**
	 * Get the plan of a single sale. Note, multiple product 
	 *
	 * @param [type] $sale_id
	 * @return void
	 */
	public static function getSalePlan( $sale_id ) {
		global $wpdb;
		$sale = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT sale.*, content.content_type FROM " . DB::sales() . " sale
					INNER JOIN " . DB::contents() . " content ON sale.content_id=content.content_id
				WHERE sale.sale_id=%d",
				$sale_id
			)
		);

		if ( empty( $sale ) ) {
			return null;
		}
		
		// Add the plan name
		$sale->variation = Contents::getVariationInfo( $sale->variation_id, $sale->content_type );

		return $sale;
	}

	public static function getSubscriptions( $args ) {
		$user_id = $args['user_id'];
		$page    = $args['page'] ?? 1;
		$limit   = $args['limit'] ?? 20;
		$offset  = $limit * ( $page - 1 );

		/* $order_clause = " ORDER BY " . $order_by . " " . $order;
		$limit_clause = " LIMIT " . $limit . " OFFSET " . $offset;

		global $wpdb;
		$subscriptions = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT "
			)
		) */
	}
}