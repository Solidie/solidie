<?php
/**
 * Script registrars
 *
 * @package solidie
 */

namespace Solidie\Setup;

use SolidieLib\Colors;
use Solidie\Helpers\Utilities;
use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Contents;
use Solidie\Models\User;
use Solidie_Pro\Setup\Dashboard as FEDashboard;
use SolidieLib\Variables;

/**
 * Script class
 */
class Scripts {

	/**
	 * Scripts constructor, register script hooks
	 *
	 * @return void
	 */
	public function __construct() {

		// Load scripts
		add_action( 'admin_enqueue_scripts', array( $this, 'adminScripts' ), 11 );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontendScripts' ), 11 );

		// Register script translations
		add_action( 'admin_enqueue_scripts', array( $this, 'scriptTranslation' ), 9 );
		add_action( 'wp_enqueue_scripts', array( $this, 'scriptTranslation' ), 9 );

		// Load script for pro dashboard, especially for the indentory page.
		add_action( 'solidie_fe_dashboard_js_enqueue_before', array( $this, 'loadScriptForProDashboard' ) );

		// Load text domain
		add_action( 'init', array( $this, 'loadTextDomain' ) );

		// JS Variables
		add_action( 'wp_enqueue_scripts', array( $this, 'loadVariables' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'loadVariables' ) );
	}

	/**
	 * Get solidie color scheme dynamic values
	 *
	 * @return array
	 */
	private function getColorScheme() {
		return array(
			'color_scheme_materials' => AdminSetting::get( 'color_scheme_materials' ),
			'color_scheme_texts'     => AdminSetting::get( 'color_scheme_texts' ),
		);
	}

	/**
	 * Load environment and color variables
	 *
	 * @return void
	 */
	public function loadVariables() {

		// Prepare configs, add color schem
		$configs = Main::$configs;
		$configs->color_scheme = $this->getColorScheme();

		// Get common variables
		$data = ( new Variables( $configs ) )->get();

		// Add additional data to the common data array
		$data = array_replace_recursive(
			$data,
			array(
				'is_pro_installed' => Utilities::isPluginInstalled( Promotion::PRO_PATH, false ),
				'is_pro_active'    => Utilities::isPluginInstalled( Promotion::PRO_PATH, true ),
				'readonly_mode'    => apply_filters( 'solidie_readonly_mode', false ), // It's for solidie demo site only. No other use is expected.
				'has_admin_bar'    => is_admin_bar_showing(),
				'user'             => array(
					'has_administrative'    => User::hasAdministrativeRole( get_current_user_id() ), 
				),
				'settings'         => array(
					'contents' => AdminSetting::getContentSettings(),
					'general'  => array(),
				),
				'configs'          => array(),
				'permalinks'       => array(
					'inventory_backend' => Utilities::getBackendPermalink( AdminPage::INVENTORY_SLUG ),
					'settings'          => Utilities::getBackendPermalink( AdminPage::SETTINGS_SLUG ),
					'dashboard'         => Utilities::getBackendPermalink( Main::$configs->root_menu_slug ),
					'gallery'           => ( object ) Contents::getGalleryPermalink(),
					'gallery_root'      => Contents::getGalleryPermalink( false ),
				),
			)
		);
		
		// Add file configs for content editor
		if ( is_user_logged_in() && ( is_admin() || ( class_exists( FEDashboard::class ) && FEDashboard::isFrontDashboard() ) ) ) {
			$data['configs'] = array_replace(
				$data['configs'],
				array(
					'max_filesize'   => Utilities::convertToBytes( ini_get( 'upload_max_filesize' ) ),
					'max_post_size'  => Utilities::convertToBytes( ini_get( 'post_max_size' ) ),
					'execution_time' => (int) ini_get( 'max_execution_time' )
				)
			);
		}

		// Pass the data through filter
		$data = apply_filters( 'solidie_frontend_variables', $data );

		// Register as localize data
		wp_localize_script( 'solidie-translations', Main::$configs->app_id, $data );
	}

	/**
	 * Load scripts for admin dashboard
	 *
	 * @return void
	 */
	public function adminScripts() {
		if ( Utilities::isAdminDashboard() ) {
			$this->loadTinyMCE();
			wp_enqueue_script( 'solidie-backend', Main::$configs->dist_url . 'admin-dashboard.js', array( 'jquery' ), Main::$configs->version, true );
		}
	}

	/**
	 * Load resource for TinyMCE editor
	 *
	 * @return void
	 */
	public function loadTinyMCE() {
		wp_enqueue_style( 'solidie-backend-tiny-style', Main::$configs->dist_url . 'libraries/tinymce/css/style.css', array(), Main::$configs->version );
		wp_enqueue_script( 'solidie-backend-tiny', Main::$configs->dist_url . 'libraries/tinymce/js/tinymce/tinymce.min.js', array( 'jquery' ) );
	}

	/**
	 * Load scripts for frontend view
	 *
	 * @return void
	 */
	public function frontendScripts() {

		if ( is_front_page() || ( ! is_singular() && ! is_single() )) {
			return;
		}

		if ( ! empty( $GLOBALS['solidie_gallery_data'] ) ) {
			wp_enqueue_style( 'solidie-tiny-styles-css', Main::$configs->dist_url . 'libraries/prism/prism.css', array(), Main::$configs->version );
			wp_enqueue_script( 'solidie-tiny-styles-js', Main::$configs->dist_url . 'libraries/prism/prism.js', array(), Main::$configs->version, true );
		}
		wp_enqueue_script( 'solidie-frontend', Main::$configs->dist_url . 'frontend.js', array( 'jquery' ), Main::$configs->version, true );
	}

	/**
	 * Load scripts to render free page in pro dashboard
	 *
	 * @return void
	 */
	public function loadScriptForProDashboard() {
		$this->loadTinyMCE();
		wp_enqueue_script( 'solidie-frontend-patch', Main::$configs->dist_url . 'frontend-dashboard-patch.js', array( 'jquery' ), Main::$configs->version, true );
	}

	/**
	 * Load text domain for translations
	 *
	 * @return void
	 */
	public function loadTextDomain() {
		load_plugin_textdomain( Main::$configs->text_domain, false, Main::$configs->dir . 'languages' );
	}

	/**
	 * Load translations
	 *
	 * @return void
	 */
	public function scriptTranslation() {

		$domain = Main::$configs->text_domain;
		$dir    = Main::$configs->dir . 'languages/';

		wp_enqueue_script( 'solidie-translations', Main::$configs->dist_url . 'libraries/translation-loader.js', array( 'jquery' ), Main::$configs->version, true );
		wp_set_script_translations( 'solidie-translations', $domain, $dir );
	}
}
