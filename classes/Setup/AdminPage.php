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

	const HOME_SLUG          = 'solidie-home';
	const CONTENT_TYPES_SLUG = 'solidie-content-types';
	const SETTINGS_SLUG      = 'solidie-settings';
	const INVENTORY_SLUG     = 'solidie-inventory';

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

		$role = apply_filters( 'solidie_administrative_role', 'administrator' );

		// Main page
		add_menu_page(
			esc_html__( 'Solidie', 'solidie' ),
			esc_html__( 'Solidie', 'solidie' ),
			$role,
			Main::$configs->root_menu_slug,
			array( $this, 'homePage' ),
			Main::$configs->dist_url . 'libraries/menu-icon.svg'
		);

		// Register solidie dashboard home
		add_submenu_page(
			Main::$configs->root_menu_slug,
			esc_html__( 'Home', 'solidie' ),
			esc_html__( 'Home', 'solidie' ),
			$role,
			Main::$configs->root_menu_slug,
			array( $this, 'homePage' )
		);

		// Register inventory
		add_submenu_page(
			Main::$configs->root_menu_slug,
			esc_html__( 'Inventory', 'solidie' ),
			esc_html__( 'Inventory', 'solidie' ),
			$role,
			self::INVENTORY_SLUG,
			array( $this, 'inventoryPage' )
		);

		// Content tyoes setting page
		add_submenu_page(
			Main::$configs->root_menu_slug,
			esc_html__( 'Content Types', 'solidie' ),
			esc_html__( 'Content Types', 'solidie' ),
			$role,
			self::CONTENT_TYPES_SLUG,
			array( $this, 'contentTypesPage' )
		);

		// General settings page
		add_submenu_page(
			Main::$configs->root_menu_slug,
			esc_html__( 'Settings', 'solidie' ),
			esc_html__( 'Settings', 'solidie' ),
			$role,
			self::SETTINGS_SLUG,
			array( $this, 'settingsPage' )
		);
	}

	/**
	 * Main page content
	 *
	 * @return void
	 */
	public function homePage() {
		echo '<div id="Solidie_Backend_Dashboard"></div>';
	}

	/**
	 * Backend dashboard inventory
	 *
	 * @return void
	 */
	public function inventoryPage() {
		echo '<div id="Solidie_Backend_Inventory" data-categories="' . esc_attr( wp_json_encode( Category::getCategories() ) ) . '"></div>';
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
