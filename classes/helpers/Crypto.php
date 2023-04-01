<?php

namespace AppStore\Helpers;

class Crypto {

	public static function encrypt( $privateKey ) {
		$privateKey 	= 'AA74CDCC2BBRT935136HH7B63C27'; // user define key
		$secretKey      = '5fgf5HJ5g27'; // user define secret key
		$encryptMethod  = "AES-256-CBC";
		$string 	= 'IB12345'; // user define value

		$key     = hash('sha256', $privateKey);
		$ivalue  = substr(hash('sha256', $secretKey), 0, 16); // sha256 is hash_hmac_algo
		$result      = openssl_encrypt($string, $encryptMethod, $key, 0, $ivalue);
		echo $output = base64_encode($result);  // output is a encripted value
	}

	public static function decrypt() {

	}

	public static function hash() {

	}

	public static function hashVerify() {

	}
}