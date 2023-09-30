<?php

namespace Solidie\Models;

use Solidie\Helpers\_Array;

class AdminSetting {
	/**
	 * Option name to save as. It will be encoded before save. Site host will be used as salt in disguise mode. 
	 *
	 * @var string
	 */
	private static $name = 'solidie_store_admin_settings';

	/**
	 * Save admin settings
	 *
	 * @param array $settings
	 * @return void
	 */
	public static function save( $settings ) {
		if ( ! current_user_can( 'administrator' ) ) {
			return false;
		}

		$settings = _Array::castRecursive( is_array( $settings ) ? $settings : array() );
		$settings = array_replace_recursive( self::get(), $settings );

		update_option( self::$name, $settings, true );
		do_action( 'solidie_settings_updated' );
		return true;
	}

	/**
	 * Get Solidie option
	 *
	 * @param string|null $key
	 * @param string|int|array|bool|null $default
	 * 
	 * @return string|int|array|bool|null
	 */
	public static function get( $key = null, $default = null ) {		
		// Get all from saved one
		$options = get_option( self::$name, array() );
		$options = is_array( $options ) ? $options : array();
		$options = array_replace_recursive( Manifest::getManifest()['settings'], $options );
		
		// Return all options, maybe for settings page
		if ( null === $key ) {
			return $options;
		}

		// Get options by dot pointer
		$pointers     = explode( '.', $key );
		$return_value = $options;

		// Loop through every pointer and go deeper in the array
		foreach ( $pointers as $pointer ) {
			if ( is_array( $return_value ) && isset( $return_value[ $pointer ] ) ) {
				$return_value = $return_value[ $pointer ];
				continue;
			}
			
			$return_value = $default;
			break;
		}

		return $return_value;
	}
}