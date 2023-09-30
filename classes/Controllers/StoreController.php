<?php

namespace Solidie\Controllers;

use Solidie\Models\Store;

class StoreController {
	const PREREQUISITES = array(
		'createStore' => array()
	);

	/**
	 * Create store
	 *
	 * @return void
	 */
	public static function createStore() {
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

}