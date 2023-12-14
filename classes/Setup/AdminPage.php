<?php

namespace Solidie\Setup;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Contents;
use Solidie\Models\Manifest;
use Solidie\Setup\AdminPage as SetupAdminPage;

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
			__( 'Solidie', 'solidie' ),
			__( 'Solidie', 'solidie' ),
			'administrator',
			Main::$configs->root_menu_slug,
			array( $this, 'mainPage' )
		);

		// Setting page
		add_submenu_page( 
			Main::$configs->root_menu_slug, 
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
		echo '<div id="Solidie_Backend_Dashboard"></div>';
	}
	
	/**
	 * Setting page content
	 *
	 * @return void
	 */
	public function settingPage() {
		echo '<div id="Solidie_AdminSettings" 
				   data-saved-settings="' . esc_attr( json_encode( (object)AdminSetting::get() ) ) . '" 
				   data-manifest="' . esc_attr( json_encode( Manifest::getManifest() ) ) . '"></div>';
	}
}