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

	/**
	 * Get states from country code
	 *
	 * @param string $country_code
	 * @return array
	 */
	public static function getStatesOptions( $country_code ) {

		$states    = include Main::$configs->dir . 'data/states.php';
		$states    = $states[ $country_code ] ?? array();
		$new_array = array();

		foreach ( $states as $code => $name ) {
			$new_array[] = array(
				'id'    => $code,
				'label' => $name
			);
		}

		return $new_array;
	}

	public static function getCountrName( $code ) {
		$countries = include Main::$configs->dir . 'data/countries.php';
		return $countries[ $code ] ?? null;
	}

	public static function getStateName( $country_code, $state_code ) {
		$states = include Main::$configs->dir . 'data/states.php';
		return ( $states[ $country_code ] ?? array() )[ $state_code ] ?? null;
	}

	public static function getCurrencySymbol( $country_code ) {
		
		$currency_code = include Main::$configs->dir . 'locale-info.php';
		$currency_code = ( $currency_code[ $country_code ] ?? array() )['currency_code'] ?? null;


	}
}
