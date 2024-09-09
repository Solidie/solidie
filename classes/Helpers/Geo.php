<?php
/**
 * The utilities functionalities
 *
 * @package solidie
 */

namespace Solidie\Helpers;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use SolidieLib\_Array;

/**
 * The class
 */
class Geo {

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

	public static function getCountryName( $code ) {
		$countries = include Main::$configs->dir . 'data/countries.php';
		return $countries[ $code ] ?? null;
	}

	public static function getStateName( $country_code, $state_code ) {
		$states = include Main::$configs->dir . 'data/states.php';
		return ( $states[ $country_code ] ?? array() )[ $state_code ] ?? null;
	}

	public static function getCurrencyCode( $country_code ) {

		$currency_code = include Main::$configs->dir . 'data/locale-info.php';
		$currency_code = ( $currency_code[ $country_code ] ?? array() )['currency_code'] ?? null;

		return $currency_code;
	}

	/**
	 * Get enable countries for content type
	 *
	 * @param string $content_type
	 * @return array
	 */
	public static function getEnableCountriesPerContentType() {
		
		$contents   = _Array::getArray( AdminSetting::get( 'contents' ) );
		$_countries = include Main::$configs->dir . 'data/countries.php';
		$data       = array();

		foreach ( $contents as $content_type => $content ) {
			$codes = _Array::getArray( $content['supported_countries'] ?? null );
			if ( empty( $codes ) ) {
				continue;
			}

			$data[ $content_type ] = array();

			foreach ( $codes as $code ) {
				if ( ! empty( $_countries[ $code ] ) ) {
					$data[ $content_type ][ $code ] = array(
						'country_name' => $_countries[ $code ],
						'states'       => self::getStatesOptions( $code )
					);
				}
			}
		}

		return $data;
	}
}
