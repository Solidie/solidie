<?php

namespace AppStore;

require_once 'Apps.php';

class Dispatcher {
	private static $endpoints = array(
		'get_my_app_list'
	);

	private $model;

	function __construct() {
		$this->model = new \stdClass();
		$this->model->Apps = new Apps();

		foreach ( self::$endpoints as $endpoint ) {
			add_action( 'wp_ajax_' . $endpoint, function() use($endpoint) {
				$this->dispatch($endpoint);
			} );
		}
	}

	public function dispatch( $endpoint ) {
		// To Do: Check nonce here

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
}