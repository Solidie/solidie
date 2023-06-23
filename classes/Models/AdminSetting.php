<?php

namespace Solidie\Store\Models;

use Solidie\Store\Main;

class AdminSetting extends Main{
	/**
	 * Option name to save as. It will be encoded before save. Site host will be used as salt in disguise mode. 
	 *
	 * @var string
	 */
	private static $name = 'solidie_store_admin_settings';

	/**
	 * Manifest cache
	 *
	 * @var array
	 */
	private static $manifest = null;

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

		$settings = array_replace_recursive( self::get(), $settings );

		update_option( self::$name, $settings );
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
		if ( null === self::$manifest ) {
			$manifest       = @json_decode( file_get_contents( self::$configs->dir . 'manifest.json' ), true );
			self::$manifest = is_array( $manifest ) ? $manifest : array();
		}
		
		// Get all from saved one
		$options = get_option( self::$name, array() );
		$options = is_array( $options ) ? $options : array();
		
		$options = array_replace_recursive( self::$manifest, $options );
		
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