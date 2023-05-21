<?php

namespace Solidie\AppStore\Helpers;

class _String {
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
}
