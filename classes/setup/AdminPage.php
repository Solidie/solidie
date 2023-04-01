<?php

namespace AppStore\Setup;

use AppStore\Models\Page as PageModel;

class AdminPage {
	private $page;

	function __construct() {
		$this->page = new PageModel();
	}

	public function setup() {
		add_action( 'admin_menu', array( $this, 'registerMenu' ) );
	}

	/**
	 * Register admin menu pages
	 *
	 * @return void
	 */
	public function registerMenu() {
		// Main page
		add_menu_page(
			__( 'AppStore', 'appstore' ),
			__( 'AppStore', 'appstore' ),
			'administrator',
			'appstore',
			array( $this, 'mainPage' )
		);

		// Setting page
		add_submenu_page( 
			'appstore', 
			__( 'Settings', 'tutor' ),
			 __( 'Settings', 'tutor' ), 
			 'administrator', 
			 'settings', 
			 array( $this, 'settingPage' ) 
		);
	}

	/**
	 * Main page content
	 *
	 * @return void
	 */
	public function mainPage() {
		?>This is content<?php
	}
	
	/**
	 * Setting page content
	 *
	 * @return void
	 */
	public function settingPage() {
		$pages = $this->page->getPageList();
		echo '<div class="wrap" id="AppStore_AdminSettings" data-pages="' . esc_attr( json_encode( $pages ) ) . '"></div>';
	}
}