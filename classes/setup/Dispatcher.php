<?php

namespace AppStore\Setup;

use AppStore\Helpers\Nonce;
use AppStore\Models\AdminSetting;
use AppStore\Models\Apps as AppModel;
use AppStore\Models\Store;

class Dispatcher {
	private static $endpoints = array(
		'get_my_app_list',
		'save_admin_settings',
		'create_store'
	);

	private $model;

	function setup() {
		$this->model = new \stdClass();
		$this->model->Apps = new AppModel();

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
			wp_send_json_error( 'Invalid Endpoint' );
		}
	}

	private function get_my_app_list() {
		$app_list = $this->model->Apps->getAppListForUser( get_current_user_id() );
		wp_send_json_success( $app_list );
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
			wp_send_json_error( 'Invalid Store Name' );
			exit;
		}

		$store_url = Store::createStore( $store_name );

		wp_send_json_success( array(
			'store_url' => $store_url
		) );
	}
}