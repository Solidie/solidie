<?php
/**
 * The utilities functionalities
 *
 * @package solidie
 */

namespace Solidie\Helpers;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use SolidieLib\_Number;
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


	/**
	 * Get limit for queries
	 *
	 * @param int|null $limit The limit to prepare
	 * @return int
	 */
	public static function getLimit( $limit = null ) {
		if ( ! is_numeric( $limit ) ) {
			$limit = AdminSetting::get( 'pagination_contents_per_page', 20 );
		}
		return apply_filters( 'solidie_query_result_count', _Number::getInt( $limit, 1 ) );
	}

	/**
	 * Get page num to get results for
	 *
	 * @param int|null $page The page to prepare
	 * @return int
	 */
	public static function getPage( $page = null ) {
		return _Number::getInt( $page, 1 );
	}
}
