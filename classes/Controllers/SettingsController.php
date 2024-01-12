<?php
/**
 * Settings controller
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\AdminSetting;

/**
 * Settings controller class and methods
 */
class SettingsController {
	const PREREQUISITES = array(
		'saveContentTypes'    => array(
			'role' => 'administrator',
		),
		'saveGeneralSettings' => array(
			'role' => 'administrator',
		),
	);

	/**
	 * Save content types configuration
	 *
	 * @param array $data Request data
	 * @return void
	 */
	public static function saveContentTypes( array $data ) {
		if ( empty( $data['content_types'] ) || ! is_array( $data['content_types'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid Request Data!', 'solidie' ) ) );
		}

		AdminSetting::save( array( 'contents' => $data['content_types'] ) );
		wp_send_json_success( array( 'message' => __( 'Content types saved successfully!', 'solidie' ) ) );
	}

	/**
	 * Save general settings
	 *
	 * @param array $data Request data
	 *
	 * @return void
	 */
	public static function saveGeneralSettings( array $data ) {
		if ( empty( $data['general_settings'] ) || ! is_array( $data['general_settings'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid Request Data!', 'solidie' ) ) );
		}

		AdminSetting::save( array( 'general' => $data['general_settings'] ) );
		wp_send_json_success( array( 'message' => __( 'Settings saved successfully!', 'solidie' ) ) );
	}
}
