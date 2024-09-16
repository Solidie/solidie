<?php
/**
 * The utilities functionalities
 *
 * @package solidie
 */

namespace Solidie\Helpers;

use Solidie\Main;
use SolidieLib\Utilities as LibUtils;

/**
 * The class
 */
class Utilities extends LibUtils{

	/**
	 * Check if the page is a Crew Dashboard
	 *
	 * @param string $sub_page Optional sub page name to match too
	 * @return boolean
	 */
	public static function isAdminDashboard( $sub_page = null ) {
		return self::isAdminScreen( Main::$configs->root_menu_slug, $sub_page );
	}

	/**
	 * Wrapper function for gmdate('Y-m-d H:i:s')
	 *
	 * @return string
	 */
	public static function gmDate() {
		return gmdate( 'Y-m-d H:i:s' );
	}

	/**
	 * Convert units to byte
	 *
	 * @param string $size Such as 100M
	 * @return int
	 */
	public static function convertToBytes($size) {

		$unit   = strtoupper( substr( $size, -1 ) );
		$number = (float) substr( $size, 0, -1 );

		switch ( $unit ) {
			case 'K':
				return $number * 1024; // Kilobytes to bytes
			case 'M':
				return $number * 1024 * 1024; // Megabytes to bytes
			case 'G':
				return $number * 1024 * 1024 * 1024; // Gigabytes to bytes
			default:
				return $number; // If no unit, assume the value is already in bytes
		}
	}
}
