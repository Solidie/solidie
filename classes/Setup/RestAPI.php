<?php

namespace Solidie\Setup;

use Solidie\Helpers\Crypto;
use Solidie\Main;
use Solidie\Models\Contents;
use Solidie\Models\DB;
use Solidie\Models\Hit;
use Solidie\Models\Licensing;
use Solidie\Models\Release;

class RestAPI {
	const API_PATH               = '/solidie/api'; // The API entry point 
	const DOWNLOAD_LINK_VALIDITY = 720; // in minutes. 12 hours here as WordPress normally checks for updates every 12 hours.

	/**
	 * Required fields for all type of actions like update check, download update etc.
	 *
	 * @var array
	 */
	private static $required_fields = array(
		'content_name',
		'license_key',
		'endpoint',
		'action'
	);

	public function __construct() {
		// To Do: Convert static entrypoint to dynamic using setting page value
		add_action( 'init', array( $this, 'add_license_api' ) );
	}
	
	/**
	 * The dispatcher to handle different type of actions
	 *
	 * @return void
	 */
	public function add_license_api() {
		// Check if it is api request
		$url         = explode( '?', Main::$configs->current_url );
		$current_url = trim( $url[0], '/' );
		if ( get_home_url() . self::API_PATH !== $current_url ) {
			return;
		}

		// Set locale
		$locale = $_GET['locale'] ?? $_POST['locale'] ?? null;
		if ( ! empty( $locale ) && is_string( $locale ) ) {
			setlocale( LC_ALL, $locale );
		}

		// Process download
		if ( ! empty( $_GET['download'] ) ) {
			$this->update_download();
			exit;
		}

		// Waive license key requirement for free update check
		if ( ( $_POST['action'] ?? '' ) === 'update-check-free' ) {
			unset( self::$required_fields['license_key'] );
		}

		// Loop through required fields and check if exists
		foreach ( self::$required_fields as $field ) {
			if ( empty( $_POST[ $field ] ) || ( $field == 'endpoint' && strpos( $_POST[ $field ], ' ' ) !== false ) ) {
				wp_send_json_error( 
					array(
						'message'        => sprintf( 'Invalid data. Required fields are %s. Whitespace in endpoint is not allowed.', implode( ', ', self::$required_fields ) ),
						'request_params' => $_POST
					) 
				);
				exit;
			}

			$_POST[ $field ] = sanitize_text_field( $_POST[ $field ] );
		}

		// Now process free-update-check
		if ( $_POST['action'] == 'update-check-free' ) {
			$this->update_check_free( $_POST['content_name'] );
			exit;
		}

		// Check and get license data. It will terminate if the license is not usable.
		$license_data = $this->getLicenseData();

		// Process request
		switch ( $_POST['action'] ) {
			case 'activate-license' :
				$this->license_activate( $license_data );
				break;

			case 'update-check' :
				$this->update_check( $license_data );
				break;

			default :
				wp_send_json_error( array( 'message' => _x( 'Invalid action!', 'solidie', 'solidie' ) ) );
				exit;
		}
	}

	private function getLicenseData() {
		$content_id   = Contents::getContentByProduct( $_POST['content_name'], 'content_id' );
		$license_info = $content_id ? Licensing::getLicenseInfo( $_POST['license_key'], $content_id ) : null;

		// If no license found, then it is either malformed or maybe content id is not same for the license
		if ( ! is_array( $license_info ) || empty( $license_info ) ) {
			wp_send_json_error(
				array( 
					'message'   => _x( 'Invalid License Key', 'solidie', 'solidie' ),
					'activated' => false
				) 
			);
			exit;
		}

		// If the action is activate, then current endpoint must be null or same as provided endpoint (In case duplicate call) which means slot availabe for the dnpoint. 
		if ( $_POST['action'] == 'activate-license' && null !== $license_info['endpoint'] && $_POST['endpoint'] !== $license_info['endpoint']) {
			wp_send_json_error(
				array(
					'message'   => _x( 'The license key is in use somewhere else already.', 'solidie', 'solidie' ),
					'activated' => false
				)
			);
			exit;
		}

		// If the action is non activate, then the both endpoint must match to check update or download. 
		if ( $_POST['action'] !== 'activate-license' && $license_info['endpoint'] !== $_POST['endpoint'] ) {
			wp_send_json_error(
				array( 
					'message'   => _x( 'The license key is not associated with your endpoint.', 'solidie', 'solidie' ), 
					'activated' => false
				)
			);
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

		if ( $license['endpoint'] === $_POST['endpoint'] ) {
			$message = _x( 'The license is activated already', 'solidie', 'solidie' );
		} else {
			$wpdb->update(
				DB::license_keys(),
				array( 'endpoint' => $_POST['endpoint'] ),
				array( 'license_id' => $license['license_id'] )
			);
		
			$message = _x( 'License activated succefully', 'solidie', 'solidie' );
			Hit::registerHit( 'activate-license', null, $license['license_id'], $_POST['endpoint'] );
		}
		
		wp_send_json_success(
			array(
				'license_key' => $license['license_key'],
				'activated'   => true,
				'licensee'    => $license['licensee_name'],
				'expires_on'  => $license['expires_on'],
				'plan_name'   => $license['plan_name'],
				'message'     => $message,
				'endpoint'    => $_POST['endpoint'],
			)
		);
		exit;
	}

	/**
	 * Update check for content
	 *
	 * @param array $license
	 * @return void
	 */
	private function update_check( array $license ) {
		$release = Release::getRelease( $license['content_id'], null, $license['license_id'] ?? 0, $_POST['endpoint'] );
		if ( ! $release ) {
			wp_send_json_error( array( 'message' => _x( 'No release found.' ) ) );
			exit;
		}

		Hit::registerHit( $_POST['action'], null, $license['license_id'], $_POST['endpoint'] );

		wp_send_json_success(
			array(
				'content_url'       => $release->content_url,
				'version'           => $release->version,
				'host_version'		=> array(),
				'release_datetime'  => $release->release_date,
				'release_timestamp' => $release->release_unix_timestamp,
				'changelog'         => $release->changelog,
				'download_url'      => $release->download_url,
			)
		);
		
		exit;
	}

	/**
	 * Check update for free product
	 *
	 * @param string $content_name
	 * @param string $endpoint
	 * @return void
	 */
	private function update_check_free( string $content_name ) {

		if ( ! Contents::isContentFree( $content_name ) ) {
			wp_send_json_error( array( 'message' => _x( 'The content you\'ve requested update for is not free. Please correct your credentials and try again.', 'solidie', 'solidie' ) ) );
			exit;
		}

		$this->update_check(
			array(
				'content_id' => Contents::getContentByProduct( $content_name, 'content_id' ),
				'license_id' => null, // Means free app
			)
		);
	}

	/**
	 * Download file using token as authenticator.
	 * There's no license key check in here as it is checked critically when generating the download url with token.
	 *
	 * @return void
	 */
	private function update_download() {

		$parse = Crypto::decrypt( $_GET['download'] );
		$parse = $parse ? explode( ' ', $parse ) : array();
		$parse = array_map( 'trim', $parse );
		$parse = array_filter( $parse, function( $s ) {
			return ! ( $s === '' );
		} );

		// Exit if the token is malformed
		if ( count( $parse ) !== 5 || ! is_numeric( $parse[0] ) || ! is_numeric( $parse[1] ) || ! is_numeric( $parse[2] ) ) {
			wp_send_json_error( array( 'message' => _x( 'Invalid Request', 'solidie', 'solidie' ) ) );
			exit;
		}

		$content_id = (int) $parse[0];
		$license_id = (int) $parse[1]; // 0 means it is free content or authenticated download.
		$token_time = (int) $parse[2];
		$endpoint   = $parse[3];
		$version    = $parse[4];

		// Exit if link is older than defined time
		if ( $token_time < time() - ( self::DOWNLOAD_LINK_VALIDITY * 60 ) ) {
			wp_send_json_error( array( 'message' => sprintf( _x( 'Download link expired as it is older than %d minutes.', 'solidie', 'solidie' ), self::DOWNLOAD_LINK_VALIDITY ) ) );
			exit;
		}

		// Exit if license id is not 0 (that indecates free or authenticated download) and also the content is not free, and not even the user is authenticated.
		if ( empty( $license_id ) && ! Contents::isContentFree( $content_id ) && ! Contents::canDownloadByUser( $content_id, get_current_user_id() ) ) {
			wp_send_json_error( array( 'message' => _x( 'Sorry! You are not allowed to download.', 'solidie', 'solidie' ) ) );
			exit;
		}

		// Exit if the release is no more though the earlier checks passed.
		$release = Release::getRelease( $content_id, $version, $license_id, $endpoint );
		if ( ! $release ) {
			wp_send_json_error( array( 'message' => _x( 'No release found.', 'solidie', 'solidie' ) ) );
			exit;
		}

		// If file path exists, it means the file resides in the server itself. Otherwise the remote cloud server url will be available.
		$file_source = $release->file_path ?? $release->file_url;
		$file_name   = $release->content_name . ' - ' . $release->version . '.' . pathinfo( basename( $file_source ), PATHINFO_EXTENSION );
		if ( ! $file_source ) {
			wp_send_json_error( array( 'message' => _x( 'Release file not found.', 'solidie', 'solidie' ) ) );
			exit;
		}

		// Register download counter. BTW, license id 0 means it's free.
		Hit::registerHit( 'update-download', $release->release_id, ($license_id===0 ? null : $license_id), $endpoint );
		
		nocache_headers();
		header( 'Content-Type: ' . $release->mime_type . '; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=' . $file_name );
		header( 'Pragma: no-cache' );
		header( 'Expires: 0' );
		readfile( $file_source );
		exit;
	}
}