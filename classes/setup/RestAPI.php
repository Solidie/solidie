<?php

namespace AppStore\Setup;

use AppStore\Base;
use AppStore\Models\Licensing;

// To Do: Check if wp-json can be waived from route path.

class RestAPI extends Base {
	public function setup() {
		add_action( 'rest_api_init', array( $this, 'add_license_api' ) );
	}
	
	public function add_license_api() {
		// Acivate license key
		register_rest_route( 'appstore', '/license/activate', array(
			'methods'  => 'POST',
			'callback' => array( $this, 'activate_key' ),
		));

		// Remove license key
		register_rest_route( 'appstore', '/license/remove', array(
			'methods'  => 'POST',
			'callback' => array( $this, 'remove_key' ),
		));

		// Check app update
		register_rest_route( 'appstore', '/update/check', array(
			'methods'  => 'POST',
			'callback' => array( $this, 'update_check' ),
		));

		// Download app update
		register_rest_route( 'appstore', '/update/download', array(
			'methods'  => 'POST',
			'callback' => array( $this, 'update_download' ),
		));
	}

	private static function validateRequest() {
		$required_fields = array(
			'app_id',
			'license_key',
			'endpoint',
		);

		foreach ( $required_fields as $field ) {
			if ( empty( $_POST[ $field ] ) ) {
				wp_send_json_error( array( 'message' => sprintf( __( 'Invalid Parameters Sent. Required fields: %s.' , 'appstore' ), implode( ', ', $required_fields ) ) ) );
				exit;
			}
		}

		$_POST['app_id'] = (int)$_POST['app_id'];
	}

	/**
	 * Activate license key
	 *
	 * @return void
	 */
	public function activate_key() {
		self::validateRequest();

		// Just return license data. The end app is supposed to restrict functionalities based on it. 
		$license_info = Licensing::getLicenseInfo( $_POST['license_key'], $_POST['app_id'], $_POST['endpoint'] );

		if ( $license_info['is_valid'] ) {
			wp_send_json_success( $license_info );
		} else {
			wp_send_json_error( $license_info );
		}

		exit;
	}
}