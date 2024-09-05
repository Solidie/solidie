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
	 * Countries options
	 *
	 * @return void
	 */
	public static function getCountriesOptions() {

		$countries = include Main::$configs->dir . 'data/countries.php';
		$new_array = array();

		foreach ( $countries as $code => $name ) {
			$new_array[] = array(
				'id'    => $code,
				'label' => $name
			);
		}

		return $new_array;
	}
}
