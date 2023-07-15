<?php

namespace Solidie\Store\Models;

use Solidie\Store\Main;

class Sale extends Main {
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
	 * @return array
	 */
	public static function getSales() {

	}

	public static function hasCustomerPurchase( $content_id, $user_id, $check_expiry = true ) {
		$exp_clause = $check_expiry ? " AND license_expires_on>NOW()" : '';

		global $wpdb;
		$has = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT sale_id FROM " . self::table( 'sales' ) . " WHERE content_id=%d AND customer_id=%d " . $exp_clause,
				$content_id,
				$user_id
			)
		);

		return $has;
	}
}