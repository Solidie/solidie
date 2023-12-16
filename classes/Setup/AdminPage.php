<?php

namespace Solidie\Setup;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Category;
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
			__( 'Content Types', 'tutor' ),
			 __( 'Content Types', 'tutor' ), 
			 'administrator', 
			 'content-types', 
			 array( $this, 'contentTypesPage' ) 
		);
	}

	/**
	 * Main page content
	 *
	 * @return void
	 */
	public function mainPage() {
		echo '<div id="Solidie_Backend_Dashboard" data-categories="' . esc_attr( json_encode( Category::getCategories() ) ) . '"></div>';
	}
	
	/**
	 * Setting page content
	 *
	 * @return void
	 */
	public function contentTypesPage() {
		echo '<div id="Solidie_ContentTypeSettings" 
				   data-categories="' . esc_attr( json_encode( Category::getCategories() ) ) . '"
				   data-saved-settings="' . esc_attr( json_encode( (object)AdminSetting::get() ) ) . '" 
				   data-manifest="' . esc_attr( json_encode( Manifest::getManifest() ) ) . '"></div>';
	}
}
