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
		'saveGeneralSettings' => array(
			'role' => 'administrator',
		),
	);

	/**
	 * Save general settings
	 *
	 * @param array $settings General settings to save
	 *
	 * @return void
	 */
	public static function saveGeneralSettings( array $settings ) {
		
		if ( ! is_array( $settings['general'] ?? null ) || ! is_array( $settings['contents'] ?? null ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid settings data', 'solidie' ) ) );
			exit;
		}

		$settings = array(
			'general'  => $settings['general'],
			'contents' => $settings['contents']
		);

		AdminSetting::save( $settings, false );

		wp_send_json_success( array( 'message' => esc_html__( 'Settings saved successfully!', 'solidie' ) ) );
	}
}
