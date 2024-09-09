<?php
/**
 * Admin page setup
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Helpers\Geo;
use Solidie\Helpers\Utilities;
use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Category;
use Solidie\Models\Manifest;
use Solidie\Models\User;

/**
 * Admin page setup handlers
 */
class AdminPage {

	const HOME_SLUG      = 'solidie-home';
	const SETTINGS_SLUG  = 'solidie-settings';
	const INVENTORY_SLUG = 'solidie-inventory';

	/**
	 * Admin page setup hooks register
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'registerMenu' ) );
		add_action( 'admin_notices', array( $this, 'permalinkNotice' ) );
	}

	/**
	 * Show notice that plain permalink structure will not render gallery
	 *
	 * @return void
	 */
	public function permalinkNotice() {
		
		if ( ! Utilities::isAdminDashboard() || ! empty( get_option( 'permalink_structure' ) ) ) {
			return;
		}

		?>
			<div class="notice notice-error">
				<p>
					<?php 
						echo sprintf(
							__( 'Permalink structure must be something other than %splain%s in favour of Solidie. Please %sChange%s it now.', 'solidie' ), 
							'<code>', 
							'</code>', 
							'<a href="' . admin_url( 'options-permalink.php' ) . '">', 
							'</a>' 
						); 
					?>
				</p>
			</div>
		<?php
	}

	/**
	 * Register admin menu pages
	 *
	 * @return void
	 */
	public function registerMenu() {

		$role = User::getSolidieAdminRole();

		// Main page
		add_menu_page(
			esc_html__( 'Solidie', 'solidie' ),
			esc_html__( 'Solidie', 'solidie' ),
			$role,
			Main::$configs->root_menu_slug,
			array( $this, 'homePage' ),
			Main::$configs->dist_url . 'libraries/menu-icon.svg',
			2
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

		do_action( 'solidie_admin_menu_before_settings' );

		// General settings page
		add_submenu_page(
			Main::$configs->root_menu_slug,
			esc_html__( 'Settings', 'solidie' ),
			esc_html__( 'Settings', 'solidie' ),
			$role,
			self::SETTINGS_SLUG,
			array( $this, 'settingsPage' )
		);

		do_action( 'solidie_admin_menu_after_settings' );
	}

	/**
	 * Main page content
	 *
	 * @return void
	 */
	public function homePage() {
		include Main::$configs->dir . 'templates/plugin-home/plugin-home.php';
	}

	/**
	 * Backend dashboard inventory
	 *
	 * @return void
	 */
	public function inventoryPage() {
		echo '<div 
			id="Solidie_Backend_Inventory" 
		></div>';
	}

	/**
	 * Geenral settings page contents
	 *
	 * @return void
	 */
	public function settingsPage() {

		$resources = array(
			'pages'     => Utilities::getPageList( -1 ),
			'countries' => Geo::getCountriesOptions()
		);

		echo '<div 
				id="Solidie_Settings" 
				data-settings="' . esc_attr( wp_json_encode( AdminSetting::get() ) ) . '"
				data-content_list="' . esc_attr( wp_json_encode( Manifest::getManifest()['contents'] ) ) . '"
				data-categories="' . esc_attr( wp_json_encode( Category::getCategories() ) ) . '"
				data-resources="' . esc_attr( wp_json_encode( $resources ) ) . '"></div>';
	}
}
