<?php

namespace AppStore\Setup;

use AppStore\Helpers\Nonce;
use AppStore\Models\AdminSetting;
use AppStore\Models\Apps as AppModel;
use AppStore\Models\Store;

class Dispatcher {
	// To Do: Secure all the endpoint after MVP implementation
	private static $endpoints = array(
		'get_store_app_list',
		'save_admin_settings',
		'create_store',
		'create_or_update_app',
		'get_app_release_history',
		'push_version_release'
	);

	function setup() {
		$this->model = new \stdClass();

		foreach ( self::$endpoints as $endpoint ) {
			add_action( 'wp_ajax_' . $endpoint, function() use($endpoint) {
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
		}
	}

	private function get_store_app_list() {
		$store_id = (int) $_POST['store_id'];
		$app_list = Store::getApps( $store_id );

		wp_send_json_success( array( 'apps' => $app_list ) );
	}

	/**
	 * Admin Dashboard Settings save
	 *
	 * @return void
	 */
	private function save_admin_settings() {
		AdminSetting::save( $_POST );
		wp_send_json_success();
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
	 * Create or update app from frontend dashboard
	 *
	 * @return void
	 */
	private function create_or_update_app() {
		$app_data = $_POST['app_data'];
		$store_id = (int)$_POST['store_id'];
		$user_id = get_current_user_id();

		if ( ! Store::hasKeeperRole( $store_id, $user_id, array( 'admin', 'editor' ) ) ) {
			wp_send_json_error( array( 'message' => 'You are not allowed to manage app in the store' ) );
			exit;
		}
		
		// To Do: Check if the product is in the store actually

		AppModel::updateApp( $store_id, $app_data );

		wp_send_json_success();
	}

	/**
	 * Get app release history
	 *
	 * @return void
	 */
	private function get_app_release_history() {
		$releases = AppModel::getReleases( (int) $_POST['app_id'] );
		wp_send_json_success( array( 'releases' => $releases ) );
	}

	/**
	 * Create or update version
	 *
	 * @return void
	 */
	private function push_version_release() {
		
		wp_send_json_success();
	}
}