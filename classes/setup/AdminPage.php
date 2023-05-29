<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Main;
use Solidie\Store\Models\AdminSetting;
use Solidie\Store\Models\Page as PageModel;

class AdminPage extends Main {

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
			__( 'Solidie', 'solidie' ),
			__( 'Solidie', 'solidie' ),
			'administrator',
			self::$configs->root_menu_slug,
			array( $this, 'mainPage' )
		);

		// Setting page
		add_submenu_page( 
			self::$configs->root_menu_slug, 
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

		echo '<div class="wrap" id="Solidie_AdminSettings" 
				   data-pages="' . esc_attr( json_encode( $pages ) ) . '" 
				   data-saved-settings="' . esc_attr( json_encode( $settings ) ) . '"></div>';
	}
}