<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Helpers\Nonce;
use Solidie\Store\Main;
use Solidie\Store\Models\AdminSetting;
use Solidie\Store\Models\Contents as ContentModel;
use Solidie\Store\Models\Release;
use Solidie\Store\Models\Store;

class Dispatcher {
	
	// To Do: Secure all the endpoint after MVP implementation
	private static $endpoints = array(
		'get_content_list',
		'save_admin_settings',
		'create_store',
		'create_or_update_content',
		'fetch_releases',
		'version_release',
		'get_purchased_contents',
	);

	function __construct() {
		foreach ( self::$endpoints as $endpoint ) {
			add_action( 'wp_ajax_' . Main::$configs->content_name . '_' . $endpoint, function() use($endpoint) {
				$this->dispatch($endpoint);
			} );
		}
	}

	public function dispatch( $endpoint ) {
		// Verify nonce
		Nonce::verify();

		// Remove action
		if ( isset( $_POST['action'] ) ) {
			unset( $_POST['action'] );
		}
		if ( isset( $_GET['action'] ) ) {
			unset( $_GET['action'] );
		}

		// Now pass to the controller
		if ( method_exists( $this, $endpoint ) ) {
			$this->$endpoint();
		} else {
			wp_send_json_error( array( 'message' => 'Invalid Endpoint' ) );
			exit;
		}
	}

	/**
	 * Provide content list for various area like dashboard, catalog and so on.
	 *
	 * @return void
	 */
	private function get_content_list() {
		$content_list = ContentModel::getContents( $_POST );
		wp_send_json_success( array( 'contents' => $content_list ) );
	}

	/**
	 * Admin Dashboard Settings save
	 *
	 * @return void
	 */
	private function save_admin_settings() {
		if ( empty( $_POST['solidie_settings'] ) || ! is_array( $_POST['solidie_settings'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid Payload!', 'solidie' ) ) );

		} else {
			$saved = AdminSetting::save( $_POST['solidie_settings'] );
			if ( $saved === true ) {
				wp_send_json_success( array( 'message' => __( 'Settings Saved Successfully!', 'solidie' ) ) );
			} else {
				wp_send_json_error( array( 'message' => __( 'Could not save settings!', 'solidie' ) ) );
			}
		}
		exit;
	}

	/**
	 * Create store
	 *
	 * @return void
	 */
	private function create_store() {
		$store_name = sanitize_text_field( $_POST['store_name'] );

		if ( empty( $store_name ) ) {
			wp_send_json_error( array( 'message' => 'Invalid Store Name' ) );
			exit;
		}

		$store_url = Store::createStore( $store_name );

		wp_send_json_success( array(
			'store_url' => $store_url
		) );
	}

	/**
	 * Create or update content from frontend dashboard
	 *
	 * @return void
	 */
	private function create_or_update_content() {
		$content_data = $_POST['content_data'];
		$store_id = (int)$_POST['store_id'];
		$user_id = get_current_user_id();

		if ( ! Store::hasKeeperRole( $store_id, $user_id, array( 'admin', 'editor' ) ) ) {
			wp_send_json_error( array( 'message' => 'You are not allowed to manage content in the store' ) );
			exit;
		}
		
		// To Do: Check if the product is in the store actually

		ContentModel::updateContent( $store_id, $content_data );

		wp_send_json_success();
	}

	/**
	 * Get content release history
	 *
	 * @return void
	 */
	private function fetch_releases() {
		$releases = ContentModel::getReleases( (int) $_POST['content_id'] );
		wp_send_json_success( array( 'releases' => $releases ) );
	}

	/**
	 * Create or update version
	 *
	 * @return void
	 */
	private function version_release() {
		// Check if main three parameter received
		if ( empty( $_POST['version'] ) || empty( $_POST['changelog'] ) || empty( $_POST['content_id'] ) ) {
			wp_send_json_error( array( 'message' => _x( 'Required release data missing!', 'solidie', 'solidie' ) ) );
			exit;
		}

		// File is required for new release, release id will be falsy if it is new release.
		if ( empty( $_POST['release_id'] ) ) {
			if ( empty( $_FILES['file'] ) || ! empty( $_FILES['file']['error'] ) ) {
				wp_send_json_error( array( 'message' => _x( 'Valid file is required for new release!', 'solidie', 'solidie' ) ) );
				exit;
			}
		}

		// To Do: Check if current user can create/update release for the content

		$error_message = Release::pushRelease(
			array(
				'version'    => $_POST['version'],
				'changelog'  => $_POST['changelog'],
				'content_id'    => $_POST['content_id'],
				'release_id' => ! empty( $_POST['release_id'] ) ? (int) $_POST['release_id'] : 0,
				'file'       => ! empty( $_FILES['file'] ) ? $_FILES['file'] : null
			)
		);

		if ( empty( $error_message ) ) {
			wp_send_json_success();
		} else {
			wp_send_json_error( array( 'message' => $error_message ) );
		}
		
		exit;
	}

	/**
	 * Get purchased content list for personal dashboard
	 *
	 * @return void
	 */
	public function get_purchased_contents() {
		$content_list = ContentModel::getContents( array_merge( $_POST, array( 'customer_id' => get_current_user_id() ) )  );
		wp_send_json_success( array( 'contents' => $content_list ) );
	}
}