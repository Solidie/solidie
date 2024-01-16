<?php
/**
 * Admin page setup
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Category;
use Solidie\Models\Manifest;

/**
 * Admin page setup handlers
 */
class AdminPage {

	const CONTENT_TYPES_SLUG = 'solidie-content-types';
	const SETTINGS_SLUG      = 'solidie-settings';

	/**
	 * Admin page setup hooks register
	 *
	 * @return void
	 */
	public function __construct() {
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
			array( $this, 'mainPage' ),
			Main::$configs->dist_url . 'libraries/menu-icon.svg'
		);
		add_submenu_page(
			Main::$configs->root_menu_slug,
			__( 'Inventory', 'solidie' ),
			__( 'Inventory', 'solidie' ),
			'administrator',
			Main::$configs->root_menu_slug,
			array( $this, 'mainPage' )
		);

		// Content tyoes setting page
		add_submenu_page(
			Main::$configs->root_menu_slug,
			__( 'Content Types', 'tutor' ),
			__( 'Content Types', 'tutor' ),
			'administrator',
			self::CONTENT_TYPES_SLUG,
			array( $this, 'contentTypesPage' )
		);

		// General settings page
		add_submenu_page(
			Main::$configs->root_menu_slug,
			__( 'Settings', 'tutor' ),
			__( 'Settings', 'tutor' ),
			'administrator',
			self::SETTINGS_SLUG,
			array( $this, 'settingsPage' )
		);
	}

	/**
	 * Main page content
	 *
	 * @return void
	 */
	public function mainPage() {
		echo '<div id="Solidie_Backend_Dashboard" data-categories="' . esc_attr( wp_json_encode( Category::getCategories() ) ) . '"></div>';
	}

	/**
	 * Setting page content
	 *
	 * @return void
	 */
	public function contentTypesPage() {
		echo '<div 
				id="Solidie_ContentTypeSettings" 
				data-categories="' . esc_attr( wp_json_encode( Category::getCategories() ) ) . '"
				data-contents="' . esc_attr( wp_json_encode( (object) AdminSetting::get( 'contents', array() ) ) ) . '" 
				data-content_list="' . esc_attr( wp_json_encode( Manifest::getManifest()['contents'] ) ) . '"></div>';
	}

	/**
	 * Geenral settings page contents
	 *
	 * @return void
	 */
	public function settingsPage() {
		echo '<div 
				id="Solidie_Settings" 
				data-settings="' . esc_attr( wp_json_encode( AdminSetting::get( 'general', array() ) ) ) . '"></div>';
	}
}
