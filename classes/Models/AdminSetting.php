<?php
/**
 * Admin settings manafer
 *
 * @package solidie
 */

namespace Solidie\Models;

/**
 * AdminSettings class
 */
class AdminSetting {
	/**
	 * Option name to save as. It will be encoded before save. Site host will be used as salt in disguise mode.
	 *
	 * @var string
	 */
	const OPTION_NAME = 'solidie_store_admin_settings';

	/**
	 * Save admin settings
	 *
	 * @param array $settings Settings array to save
	 * @param bool  $merge Whether to merge or not
	 *
	 * @return bool
	 */
	public static function save( $settings, $merge = true ) {

		// In case you need to update only on option inside the array
		if ( true === $merge ) {
			$settings = array_merge( self::get(), $settings );
		}

		update_option( self::OPTION_NAME, $settings, true );
		do_action( 'solidie_settings_updated', $settings );

		return true;
	}

	/**
	 * Get Solidie option
	 *
	 * @param string|null                $key Settings key to get individual value
	 * @param string|int|array|bool|null $default The fallback to return
	 *
	 * @return string|int|array|bool|null
	 */
	public static function get( $key = null, $default = null ) {
		// Get all from saved one
		$options = get_option( self::OPTION_NAME );
		$options = is_array( $options ) ? $options : array();

		// Replace default settings in manifest with saved values resursively.
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

	/**
	 * Return filtered settings ideally for frontend view. Sensitive data will be excluded.
	 *
	 * @return array
	 */
	public static function getFilteredSettings() {
		$settings = self::get();

		// Assign content type label
		foreach ( $settings['contents'] as $type => $content ) {
			$settings['contents'][ $type ]['label'] = Manifest::getContentTypeLabel( $type );
		}

		return apply_filters( 'solidie_filter_settings_data', $settings );
	}
}
