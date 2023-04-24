<?php

namespace AppStore\Setup;

use AppStore\Base;
use AppStore\Models\Licensing;

class RestAPI extends Base {
	private static $required_fields = array(
		'app_id',
		'license_key',
		'endpoint',
		'action'
	);

	private static $actions = array(
		'license-activate',
		'update-check',
		'update-download'
	);

	public function setup() {
		add_action( 'init', array( $this, 'add_license_api' ) );
	}
	
	public function add_license_api() {
		// Check if it is api request
		$current_url = trim( APPSTORE_CURRENT_URL, '/' );
		if ( get_home_url() . '/appstore/api' !== $current_url ) {
			return;
		}

		// Loop through required fields and check if exists
		foreach ( self::$required_fields as $field ) {
			if ( empty( $_POST[ $field ] ) ) {
				wp_send_json_error( array( 'message' => sprintf( 'Invalid Parameters. Required fields: %s.', implode( ', ', self::$required_fields ) ) ) );
				wp_die();
			}

			$_POST[ $field ] = sanitize_text_field( $_POST[ $field ] );
		}

		// Check if valid action and id
		$_POST['app_id'] = (int)$_POST['app_id'];
		if ( ! in_array( $_POST['action'], self::$actions ) || ! $_POST['app_id'] ) {
			wp_send_json( array( 'message' => 'Invalid Action or App Id' ) );
			wp_die();
		}

		// Check and get license data. It will terminate if the license is not usable.
		$license_data = $this->getLicenseData();

		// Process request
		switch ( $_POST['action'] ) {
			case 'license-activate' :
				$this->license_activate( $license_data );
				break;

			case 'update-check' :
				$this->update_check( $license_data );
				break;

			case 'update-download' :
				$this->update_download( $license_data );
				break;

			default :
				wp_send_json_error( array( 'message' => _x( 'Something went wrong', 'appstore', 'appstore' ) ) );
				wp_die();
		}
	}

	private function getLicenseData() {
		$license_info = Licensing::getLicenseInfo( $_POST['license_key'], $_POST['app_id'] );

		// If no license found, then it is either malformed or maybe app id is not same for the license
		if ( ! is_array( $license_info ) || empty( $license_info ) ) {
			wp_send_json_error( array( 'message' => _x( 'Invalid License Key', 'appstore', 'appstore' ) ) );
			wp_die();
		}

		// If the action is activate, then current endpoint must be null or same as provided endpoint (In case duplicate call) which means slot availabe for the dnpoint. 
		if ( $_POST['action'] == 'license-activate' && null !== $license_info['endpoint'] && $_POST['endpoint'] !== $license_info['endpoint']) {
			wp_send_json_error( array( 'message' => _x( 'The license key is in use already.', 'appstore', 'appstore' ) ) );
			wp_die();
		}

		// If the action is non activate, then the both endpoint must match to check update or download. 
		if ( $_POST['action'] !== 'license-activate' && $license_info['endpoint'] !== $_POST['endpoint'] ) {
			wp_send_json_error( array( 'message' => _( 'The license key is not associated with your endpoint.', 'appstore', 'appstore' ) ) );
			wp_die();
		}

		return $license_info;
	}

	/**
	 * Activate license key
	 *
	 * @param array $license
	 * @return void
	 */
	private function license_activate( array $license ) {
		global $wpdb;

		$wpdb->update(
			self::table( 'license_keys' ),
			array( 'endpoint' => $_POST['endpoint'] ),
			array( 'license_id' => $license['license_id'] )
		);

		wp_send_json_success(
			array(
				'message'     => _x( 'License activated succefully', 'appstore', 'appstore' ),
				'license_key' => $license['license_key'],
				'endpoint'    => $_POST['endpoint'],
				'app_name'    => $license['app_name'],
				'plan_name'   => $license['plan_name'],
				'expires_on'  => $license['expires_on'],
			)
		);

		wp_die();
	}

	private function update_check( $license ) {
		
	}

	private function update_download( $license ) {
		// Readfile contents
	}
}