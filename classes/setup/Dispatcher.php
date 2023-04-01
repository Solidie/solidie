<?php

namespace AppStore\Setup;

use AppStore\Helpers\Nonce;
use AppStore\Models\AdminSetting;
use AppStore\Models\Apps as AppModel;

class Dispatcher {
	private static $endpoints = array(
		'get_my_app_list',
		'save_admin_settings'
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
		Nonce::verify();

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
}