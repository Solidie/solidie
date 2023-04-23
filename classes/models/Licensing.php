<?php

namespace AppStore\Models;

use AppStore\Base;

class Licensing extends Base{
	/**
	 * Generate random string
	 *
	 * @param integer $length
	 * @return string
	 */
	public static function generateRandomString($length = 5) {
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
	 * @param integer $sale_id
	 * @return string
	 */
	private static function encrypt( int $sale_id ) {
		$string = (string) $sale_id;
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
	 * @return int|null
	 */
	private static function decrypt( string $license_key ) {
		$data      = base64_decode($license_key);
		$salt      = substr($data, 0, 16); // Extract the salt from the encoded string
		$cipher    = substr($data, 16);
		$key       = openssl_pbkdf2('sha256', $salt, 32, 10000, 'sha256'); // Derive the decryption key from the password and salt
		$decrypted = openssl_decrypt($cipher, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, str_repeat("\0", 16)); // Decrypt the ciphertext with AES-256-CBC
		$decrypted = explode('-', $decrypted);
		return count( $decrypted ) === 2 ? (int)$decrypted[0] : null;
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

		// Generate license keys
		global $wpdb;
		for( $i = 0; $i < $limit; $i++ ) {
			$license_key = array(
				'sale_id'     => $sale_id,
				'license_key' => self::encrypt( $sale_id ),
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
	 * @return array
	 */
	public static function getLicenseKeys( int $sale_id ) {
		global $wpdb;
		$keys = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT license_key FROM " . self::table( 'license_keys' ) . " WHERE sale_id=%d",
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
	public static function getLicenseInfo( string $license_key, int $app_id, string $endpoint ) {
		$data = array();

		// Check if there is any sale associated with the license key.
		$sale_id = self::decrypt( $license_key );

		var_dump( $sale_id, $license_key );

		if ( ! $sale_id || ! in_array( $license_key, self::getLicenseKeys( $sale_id ) ) ) {
			$data['is_valid'] = false;
			$data['message']  = __( 'Invalid license key' );
			return $data;
		}

		$data['v'] = 's';

		return $data;
	}
}