<?php

namespace Solidie\AppStore\Setup;

use Solidie\AppStore\Models\AdminSetting;
use Solidie\AppStore\Models\Page as PageModel;

class AdminPage {

	function __construct() {
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
		$pages    = PageModel::getPageList();
		$settings = (object)AdminSetting::get();

		echo '<div class="wrap" id="AppStore_AdminSettings" 
				   data-pages="' . esc_attr( json_encode( $pages ) ) . '" 
				   data-saved-settings="' . esc_attr( json_encode( $settings ) ) . '"></div>';
	}
}