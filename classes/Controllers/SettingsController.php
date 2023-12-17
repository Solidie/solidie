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
		'saveAdminSettings' => array(
			'role' => 'administrator',
		),
	);

	/**
	 * Admin Dashboard Settings save
	 *
	 * @param array $data Request data
	 * @return void
	 */
	public static function saveAdminSettings( array $data ) {
		if ( empty( $data['solidie_settings'] ) || ! is_array( $data['solidie_settings'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid Payload!', 'solidie' ) ) );

		} else {
			$saved = AdminSetting::save( $data['solidie_settings'] );
			if ( true === $saved ) {
				wp_send_json_success( array( 'message' => __( 'Settings Saved Successfully!', 'solidie' ) ) );
			} else {
				wp_send_json_error( array( 'message' => __( 'Failed to save settings!', 'solidie' ) ) );
			}
		}
		exit;
	}
}
