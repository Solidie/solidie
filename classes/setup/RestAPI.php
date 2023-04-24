<?php

namespace AppStore\Setup;

use AppStore\Base;
use AppStore\Models\Licensing;
use AppStore\Models\Release;

class RestAPI extends Base {
	const API_PATH               = '/appstore/api';
	const NONCE_ACTION           = 'app_store_download';
	const DOWNLOAD_LINK_VALIDITY = 5; // in minutes.

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
		$url         = explode( '?', APPSTORE_CURRENT_URL );
		$current_url = trim( $url[0], '/' );
		if ( get_home_url() . self::API_PATH !== $current_url ) {
			return;
		}

		// Process download if token and download parameter is present
		if ( ! empty( $_GET['download'] ) ) {
			$this->update_download();
			exit;
		}

		// Loop through required fields and check if exists
		foreach ( self::$required_fields as $field ) {
			if ( empty( $_POST[ $field ] ) ) {
				wp_send_json_error( array( 'message' => sprintf( 'Invalid Parameters. Required fields: %s.', implode( ', ', self::$required_fields ) ) ) );
				exit;
			}

			$_POST[ $field ] = sanitize_text_field( $_POST[ $field ] );
		}

		// Check if valid action and id
		$_POST['app_id'] = (int)$_POST['app_id'];
		if ( ! in_array( $_POST['action'], self::$actions ) || ! $_POST['app_id'] ) {
			wp_send_json( array( 'message' => 'Invalid Action or App Id' ) );
			exit;
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

			default :
				wp_send_json_error( array( 'message' => _x( 'Something went wrong', 'appstore', 'appstore' ) ) );
				exit;
		}
	}

	private function getLicenseData() {
		$license_info = Licensing::getLicenseInfo( $_POST['license_key'], $_POST['app_id'] );

		// If no license found, then it is either malformed or maybe app id is not same for the license
		if ( ! is_array( $license_info ) || empty( $license_info ) ) {
			wp_send_json_error( array( 'message' => _x( 'Invalid License Key', 'appstore', 'appstore' ) ) );
			exit;
		}

		// If the action is activate, then current endpoint must be null or same as provided endpoint (In case duplicate call) which means slot availabe for the dnpoint. 
		if ( $_POST['action'] == 'license-activate' && null !== $license_info['endpoint'] && $_POST['endpoint'] !== $license_info['endpoint']) {
			wp_send_json_error( array( 'message' => _x( 'The license key is in use already.', 'appstore', 'appstore' ) ) );
			exit;
		}

		// If the action is non activate, then the both endpoint must match to check update or download. 
		if ( $_POST['action'] !== 'license-activate' && $license_info['endpoint'] !== $_POST['endpoint'] ) {
			wp_send_json_error( array( 'message' => _x( 'The license key is not associated with your endpoint.', 'appstore', 'appstore' ) ) );
			exit;
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

		exit;
	}

	private function update_check( $license ) {
		$release = Release::getRelease( $license['app_id'] );
		if ( ! $release ) {
			wp_send_json_error( array( 'message' => _x( 'No release found.' ) ) );
			exit;
		}

		wp_send_json_success(
			array(
				'version'      => $release->version,
				'release_date' => $release->release_date,
				'changelog'    => $release->changelog,
				'k' => self::NONCE_ACTION . '-' . $release->app_id,
				'download_url' => add_query_arg(
					array(
						// First one is app id to download release of
						// Second one is the token generating time that can be used to restrict acces in case of expiry
						'download' => urlencode( Licensing::encrypt( $release->app_id . '-' . time() ) ), 
					),
					get_home_url() . self::API_PATH . '/' 
				),
			)
		);
		
		exit;
	}

	private function update_download() {
		$parse = Licensing::decrypt( $_GET['download'] );
		$parse = $parse ? explode( '-', $parse ) : array();

		// Exit if the token is malformed
		if ( count( $parse ) !== 2 || ! is_numeric( $parse[0] ) || ! is_numeric( $parse[1] ) ) {
			wp_send_json_error( array( 'message' => _x( 'Invalid Request', 'appstore', 'appstore' ) ) );
			exit;
		}

		// Exit if link is older than defined time
		if ( (int)$parse[1] < time() - ( self::DOWNLOAD_LINK_VALIDITY * 60 ) ) {
			wp_send_json_error( array( 'message' => sprintf( _x( 'Download link expired as it is older than %d minutes.', 'appstore', 'appstore' ), self::DOWNLOAD_LINK_VALIDITY ) ) );
			exit;
		}

		$release = Release::getRelease( (int) $parse[0] );
		if ( ! $release ) {
			wp_send_json_error( array( 'message' => _x( 'Something went wrong. No release found for this app.', 'appstore', 'appstore' ) ) );
			exit;
		}

		$file_name   = basename( $release->file_path ? $release->file_path : $release->file_url );
		$file_source = $release->file_path ?? $release->file_url;
		if ( ! $file_source ) {
			wp_send_json_error( array( 'message' => _x( 'Something went wrong. Release file not found.', 'appstore', 'appstore' ) ) );
			exit;
		}
		
		nocache_headers();
		header( 'Content-Type: ' . $release->mime_type . '; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=' . $file_name );
		header( 'Pragma: no-cache' );
		header( 'Expires: 0' );

		readfile( $file_source );
		exit;
	}
}