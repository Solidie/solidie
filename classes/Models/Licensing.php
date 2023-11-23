<?php

namespace Solidie\Models;

use Solidie\Helpers\Crypto;

class Licensing {
	/**
	 * Generate license keys for content sale
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
				DB::license_keys(),
				$license_key
			);
		}
	}

	/**
	 * Get license keys
	 *
	 * @param integer $sale_id
	 * @param integer|null $content_id
	 * @param string|null $endpoint
	 * 
	 * @return array
	 */
	public static function getLicenseKeys( int $sale_id, $content_id = null, $endpoint = null ) {
		global $wpdb;

		$content_clause     = null !== $content_id ? " AND sale.content_id=" . $content_id : '';
		$endpoint_clause = null !== $endpoint ? " AND license.endpoint='".esc_sql( $endpoint )."'" : '';

		$keys = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT license.*, sale.license_expires_on, sale.content_id, sale.variation_id, sale.customer_id, content.content_type
				FROM " . DB::license_keys() . " license 
					INNER JOIN " . DB::sales() . " sale ON sale.sale_id=license.sale_id
					INNER JOIN " . DB::contents() . " content ON sale.content_id=content.content_id
					WHERE license.sale_id=%d" . $content_clause . $endpoint_clause,
				$sale_id
			)
		);

		return ( is_array( $keys ) && ! empty( $keys ) ) ? $keys : array();
	}

	/**
	 * Get license info
	 *
	 * @param string $license_key
	 * @param integer $content_id
	 * @param string $endpoint
	 * @return array
	 */
	public static function getLicenseInfo( string $license_key, int $content_id, $endpoint = null ) {
		// Check if there is any sale associated with the license key.
		$sale_id  = Crypto::decrypt( $license_key );
		$licenses = $sale_id ? self::getLicenseKeys( (int) $sale_id, $content_id, $endpoint ) : array();

		foreach ( $licenses as $license ) {
			if ( $license->license_key !== $license_key ) {
				continue;
			}

			$var_info = Contents::getVariationInfo( new \WC_Product_Variation( (int) $license->variation_id ), $license->content_type );
			$customer = get_userdata( $license->customer_id );
			$data     = array();

			$data['content_id']       = (int) $license->content_id;
			$data['license_id']    = (int) $license->license_id;
			$data['license_key']   = $license_key;
			$data['endpoint']      = $license->endpoint;
			$data['expires_on']    = $license->license_expires_on;
			$data['content_title']      = get_the_title( Contents::getProductID( $license->content_id ) );
			$data['plan_name']     = $var_info['label'];
			$data['customer_id']   = $license->customer_id;
			$data['licensee_name'] = $customer ? $customer->display_name : '(Customer Not Found)';

			return $data;
		}
	}
}