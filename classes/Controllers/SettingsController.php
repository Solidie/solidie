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
	 * @param array $content_types Content Types to save
	 * @return void
	 */
	public static function saveContentTypes( array $content_types ) {
		AdminSetting::save( array( 'contents' => $content_types ) );
		wp_send_json_success( array( 'message' => esc_html__( 'Content types saved successfully!', 'solidie' ) ) );
	}

	/**
	 * Save general settings
	 *
	 * @param array $settings General settings to save
	 *
	 * @return void
	 */
	public static function saveGeneralSettings( array $settings ) {
		
		if ( empty( $settings['general'] ) || empty( $settings['contents'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid settings data', 'solidie' ) ) );
			exit;
		}

		$settings = array(
			'general'  => $settings['general'],
			'contents' => $settings['contents']
		);

		AdminSetting::save( $settings );

		wp_send_json_success( array( 'message' => esc_html__( 'Settings saved successfully!', 'solidie' ) ) );
	}
}
