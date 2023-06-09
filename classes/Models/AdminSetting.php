<?php

namespace Solidie\Store\Models;

class AdminSetting {
	/**
	 * Option name to save as. It will be encoded before save. Site host will be used as salt in disguise mode. 
	 *
	 * @var string
	 */
	private static $name = '_item_store_admin_settings';

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

		$options = get_option( self::$name, array() );
		$options = array_merge( $options, $settings );

		update_option( self::$name, $settings );
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
		$options = get_option( self::$name, array() );
		
		if ( ! $key ) {
			return $options;
		}

		return isset( $options[ $key ] ) ? $options[ $key ] : $default;
	}
}