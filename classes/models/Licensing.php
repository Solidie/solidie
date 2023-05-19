<?php

namespace Solidie\AppStore\Models;

use Solidie\AppStore\Main;

class Licensing extends Main{
	/**
	 * Generate random string
	 *
	 * @param integer $length
	 * @return string
	 */
	public static function generateRandomString( $length = 3 ) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, strlen($characters) - 1)];
		}
		return $randomString;
	}

	/**
	 * Return encrypted license key
	 *
	 * @param string $sale_id
	 * @return string
	 */
	public static function encrypt( string $string ) {
		$string = $string . '-' . self::generateRandomString();
		$salt   = openssl_random_pseudo_bytes(16); // Generate a 16-byte salt
		$key    = openssl_pbkdf2('sha256', $salt, 32, 10000, 'sha256'); // Derive a 32-byte encryption key from the password and salt
		$cipher = openssl_encrypt($string, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, str_repeat("\0", 16)); // Encrypt the string with AES-256-CBC
		return base64_encode($salt . $cipher); // Combine the salt and ciphertext and encode as base64
	}

	/**
	 * Return parsed sale id from license key
	 *
	 * @param string $license_key
	 * @return string|null
	 */
	public static function decrypt( string $license_key ) {
		$data      = base64_decode($license_key);
		$salt      = substr($data, 0, 16); // Extract the salt from the encoded string
		$cipher    = substr($data, 16);
		$key       = openssl_pbkdf2('sha256', $salt, 32, 10000, 'sha256'); // Derive the decryption key from the password and salt
		$decrypted = openssl_decrypt($cipher, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, str_repeat("\0", 16)); // Decrypt the ciphertext with AES-256-CBC
		$decrypted = explode('-', $decrypted);
		$count     = count( $decrypted );
		return $count > 1 ? implode( '-', array_slice( $decrypted, 0, $count-1 ) ) : null;
	}

	/**
	 * Generate license keys for app sale
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
				'license_key' => self::encrypt( (int) $sale_id ),
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
	 * @param integer|null $app_id
	 * @param string|null $endpoint
	 * 
	 * @return array
	 */
	public static function getLicenseKeys( int $sale_id, $app_id = null, $endpoint = null ) {
		global $wpdb;

		$app_clause      = null !== $app_id ? " AND sale.app_id=" . $app_id : '';
		$endpoint_clause = null !== $endpoint ? " AND license.endpoint='".esc_sql( $endpoint )."'" : '';

		$keys = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT license.*, sale.license_expires_on, sale.app_id, sale.variation_id, sale.customer_id
				FROM ".self::table( 'license_keys' )." license 
				INNER JOIN ".self::table( 'sales' )." sale ON sale.sale_id=license.sale_id
				WHERE license.sale_id=%d" . $app_clause . $endpoint_clause,
				$sale_id
			)
		);

		return ( is_array( $keys ) && ! empty( $keys ) ) ? $keys : array();
	}

	/**
	 * Get license info
	 *
	 * @param string $license_key
	 * @param integer $app_id
	 * @param string $endpoint
	 * @return array
	 */
	public static function getLicenseInfo( string $license_key, int $app_id, $endpoint = null ) {
		// Check if there is any sale associated with the license key.
		$sale_id  = self::decrypt( $license_key );
		$licenses = $sale_id ? self::getLicenseKeys( (int) $sale_id, $app_id, $endpoint ) : array();

		foreach ( $licenses as $license ) {
			if ( $license->license_key !== $license_key ) {
				continue;
			}

			$var_info = Apps::getVariationInfo( new \WC_Product_Variation( (int) $license->variation_id ) );
			$customer = get_userdata( $license->customer_id );
			$data     = array();

			$data['app_id']        = (int) $license->app_id;
			$data['license_id']    = (int) $license->license_id;
			$data['license_key']   = $license_key;
			$data['endpoint']      = $license->endpoint;
			$data['expires_on']    = $license->license_expires_on;
			$data['app_name']      = get_the_title( Apps::getProductID( $license->app_id ) );
			$data['plan_name']     = $var_info['label'];
			$data['customer_id']   = $license->customer_id;
			$data['licensee_name'] = $customer ? $customer->display_name : '(Customer Not Found)';

			return $data;
		}
	}
}