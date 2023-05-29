<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Helpers\Nonce;
use Solidie\Store\Main;

class Scripts extends Main {
	public function __construct() {
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

		return apply_filters( 'solidie_script_data', $data );
	}

	public function commonScripts() {
		wp_add_inline_script( 'jquery', 'window.Solidie = ' . json_encode( $this->getAppData() ), 'before' );
	}

	public function adminScripts() {
		wp_enqueue_script( 'solidie-admin-script', self::$configs->dist_url . 'admin-dashboard.js', array( 'jquery' ), self::$configs->version );
	}

	public function frontendScripts() {

	}
}