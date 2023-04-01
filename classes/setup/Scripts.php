<?php

namespace AppStore\Setup;

use AppStore\Helpers\Nonce;

class Scripts {
	public function setup() {
		add_action( 'admin_enqueue_scripts', array( $this, 'commonScripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'commonScripts' ) );

		add_action( 'admin_enqueue_scripts', array( $this, 'adminScripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontendScripts' ) );
	}

	public function getAppData() {
		$data = array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'nonce'    => Nonce::generate()
		);

		return apply_filters( 'appstore_script_data', $data );
	}

	public function commonScripts() {
		wp_add_inline_script( 'jquery', 'window.AppStore = ' . json_encode( $this->getAppData() ), 'before' );
	}

	public function adminScripts() {
		wp_enqueue_script( 'appstore-admin-script', APPSTORE_DIST_URL . 'admin-dashboard.js', array( 'jquery' ), APPSTORE_VERSION );
	}

	public function frontendScripts() {

	}
}