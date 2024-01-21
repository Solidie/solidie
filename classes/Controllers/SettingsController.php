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
		wp_send_json_success( array( 'message' => __( 'Content types saved successfully!', 'solidie' ) ) );
	}

	/**
	 * Save general settings
	 *
	 * @param array $general_settings General settings to save
	 *
	 * @return void
	 */
	public static function saveGeneralSettings( array $general_settings ) {
		AdminSetting::save( array( 'general' => $general_settings ) );
		wp_send_json_success( array( 'message' => __( 'Settings saved successfully!', 'solidie' ) ) );
	}
}
