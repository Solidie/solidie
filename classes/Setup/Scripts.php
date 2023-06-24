<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Helpers\Nonce;
use Solidie\Store\Main;
use Solidie\Store\Models\FrontendDashboard;

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
		if ( get_admin_page_parent() == self::$configs->root_menu_slug  ) {
			wp_enqueue_script( 'solidie-admin-script', self::$configs->dist_url . 'admin-dashboard.js', array( 'jquery' ), self::$configs->version );
		}
	}

	public function frontendScripts() {
		if ( FrontendDashboard::is_dashboard() ) {
			wp_enqueue_script( 'appstore-frontend-dashboard-script', self::$configs->dist_url . 'frontend-dashboard.js', array( 'jquery' ), self::$configs->version, true );
		} else {
			wp_enqueue_style( 'appstore-frontend-swipe-script-css', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css' );
			wp_enqueue_script( 'appstore-frontend-swipe-script', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js' );
			wp_enqueue_script( 'appstore-frontend-script', self::$configs->dist_url . 'frontend.js', array( 'jquery' ), self::$configs->version, true );
		}
	}
}