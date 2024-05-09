<?php
/**
 * Admin settings manafer
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Helpers\_Array;

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
	 * Save a single setting by key and value
	 *
	 * @param string $key
	 * @param mixed $value
	 * @return void
	 */
	public static function saveSingle( $key, $value ) {
		self::save( array( 'general' => array( $key => $value ) ), true );
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

		// Easy access to general settings
		if ( $key !== 'contents' && strpos( $key, '.' ) === false ) {
			$key = 'general.' . $key;
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
	 * Get the page ID set for gallery
	 *
	 * @param mixed $default
	 * @return int
	 */
	public static function getGalleryPageId( $default = null ) {
		return self::get( 'gallery_page_id', $default );
	}

	/**
	 * Return content settings
	 *
	 * @return array
	 */
	public static function getContentSettings() {
		// All the settings to get
		$contents  = self::get( 'contents' );
		$new_array = array();

		// Assign content type label
		foreach ( $contents as $type => $content ) {

			$label = Manifest::getContentTypeLabel( $type );
			if ( ! empty( $label ) ) {
				$content['label']   = $label;
				$new_array[ $type ] = $content;
			}
		}

		return $new_array;
	}

	/**
	 * Get supported reaction settings for the content type
	 *
	 * @param string $content_type
	 * @return array
	 */
	public static function getFeedbackSettings( $content_type ) {

		$content = self::get( 'contents.' . $content_type );
		if ( empty( $content ) || ! is_array( $content ) ) {
			return array();
		}

		$type         = $content['reaction_type'] ?? null;
		$like         = 'like' === $type;
		$dislike      = $like && ( bool ) ( $content['enable_dislike'] ?? false );
		$rating       = 'rating' === $type;

		return array(
			'like'        => $like,
			'dislike'     => $dislike,
			'rating'      => $rating,
			'comment'     => ( bool ) ( $content['enable_comment'] ?? false ),
			'thumbnail'   => ( bool ) ( $content['show_thumbnail'] ?? false ),
			'wishlist'    => ( bool ) ( $content['enable_wishlist'] ?? false ),
			'sharing'     => ( bool ) ( $content['enable_sharing'] ?? false ),
			'contributor' => ( bool ) ( $content['show_contributor_info'] ?? false ),
		);
	}
}
