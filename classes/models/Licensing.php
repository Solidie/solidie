<?php

namespace Solidie\Store\Models;

use Solidie\Store\Helpers\Crypto;
use Solidie\Store\Main;

class Licensing extends Main{
	/**
	 * Generate license keys for item sale
	 *
	 * @param integer $sale_id
	 * @param integer $limit
	 * @return void
	 */
	public static function generateLicenseKeys( int $sale_id, $limit ) {
		// Skip if already created
		if ( ! empty( self::getLicenseKeys( $sale_id ) ) || ( is_numeric( $limit ) && $limit < 1 ) ) {
			return;
		}

		if ( $limit === null ) {
			// Create only 20 license for now. Then customer can generate more from dashboard. 
			$limit = 20;
		}

		// Note: License key will be shown to user as base64_encode( get_home_url() . ' ' . $real_license_key );

		// Generate license keys
		global $wpdb;
		for( $i = 0; $i < $limit; $i++ ) {
			$license_key = array(
				'sale_id'     => $sale_id,
				'license_key' => Crypto::encrypt( (int) $sale_id ),
			);

			$wpdb->insert(
				self::table( 'license_keys' ),
				$license_key
			);
		}
	}

	/**
	 * Get license keys
	 *
	 * @param integer $sale_id
	 * @param integer|null $item_id
	 * @param string|null $endpoint
	 * 
	 * @return array
	 */
	public static function getLicenseKeys( int $sale_id, $item_id = null, $endpoint = null ) {
		global $wpdb;

		$item_clause     = null !== $item_id ? " AND sale.item_id=" . $item_id : '';
		$endpoint_clause = null !== $endpoint ? " AND license.endpoint='".esc_sql( $endpoint )."'" : '';

		$keys = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT license.*, sale.license_expires_on, sale.item_id, sale.variation_id, sale.customer_id
				FROM ".self::table( 'license_keys' )." license 
				INNER JOIN ".self::table( 'sales' )." sale ON sale.sale_id=license.sale_id
				WHERE license.sale_id=%d" . $item_clause . $endpoint_clause,
				$sale_id
			)
		);

		return ( is_array( $keys ) && ! empty( $keys ) ) ? $keys : array();
	}

	/**
	 * Get license info
	 *
	 * @param string $license_key
	 * @param integer $item_id
	 * @param string $endpoint
	 * @return array
	 */
	public static function getLicenseInfo( string $license_key, int $item_id, $endpoint = null ) {
		// Check if there is any sale associated with the license key.
		$sale_id  = Crypto::decrypt( $license_key );
		$licenses = $sale_id ? self::getLicenseKeys( (int) $sale_id, $item_id, $endpoint ) : array();

		foreach ( $licenses as $license ) {
			if ( $license->license_key !== $license_key ) {
				continue;
			}

			$var_info = Apps::getVariationInfo( new \WC_Product_Variation( (int) $license->variation_id ) );
			$customer = get_userdata( $license->customer_id );
			$data     = array();

			$data['item_id']       = (int) $license->item_id;
			$data['license_id']    = (int) $license->license_id;
			$data['license_key']   = $license_key;
			$data['endpoint']      = $license->endpoint;
			$data['expires_on']    = $license->license_expires_on;
			$data['item_name']      = get_the_title( Apps::getProductID( $license->item_id ) );
			$data['plan_name']     = $var_info['label'];
			$data['customer_id']   = $license->customer_id;
			$data['licensee_name'] = $customer ? $customer->display_name : '(Customer Not Found)';

			return $data;
		}
	}
}