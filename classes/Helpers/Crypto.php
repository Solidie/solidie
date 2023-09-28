<?php

namespace Solidie\Helpers;

class Crypto {
	/**
	 * Return encrypted license key
	 *
	 * @param string $string
	 * @return string
	 */
	public static function encrypt( string $string ) {
		$string = $string . '-' . _String::getRandomString();
		$salt   = openssl_random_pseudo_bytes(16); // Generate a 16-byte salt
		$key    = openssl_pbkdf2('sha256', $salt, 32, 10000, 'sha256'); // Derive a 32-byte encryption key from the password and salt
		$cipher = openssl_encrypt($string, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, str_repeat("\0", 16)); // Encrypt the string with AES-256-CBC
		return base64_encode($salt . $cipher); // Combine the salt and ciphertext and encode as base64
	}

	/**
	 * Return decrypted
	 *
	 * @param string $string
	 * @return string|null
	 */
	public static function decrypt( string $string ) {
		$data      = base64_decode($string);
		$salt      = substr($data, 0, 16); // Extract the salt from the encoded string
		$cipher    = substr($data, 16);
		$key       = openssl_pbkdf2('sha256', $salt, 32, 10000, 'sha256'); // Derive the decryption key from the password and salt
		$decrypted = openssl_decrypt($cipher, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, str_repeat("\0", 16)); // Decrypt the ciphertext with AES-256-CBC
		$decrypted = explode('-', $decrypted);
		$count     = count( $decrypted );
		return $count > 1 ? implode( '-', array_slice( $decrypted, 0, $count-1 ) ) : null;
	}
}
