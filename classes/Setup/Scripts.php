<?php
/**
 * Script registrars
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Helpers\Colors;
use Solidie\Helpers\Utilities;
use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\Contents;

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

		add_action( 'admin_enqueue_scripts', array( $this, 'adminScripts' ), 11 );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontendScripts' ), 11 );

		add_action( 'solidie_fe_dashboard_js_enqueue_before', array( $this, 'loadScriptForProDashboard' ) );

		// Vars
		add_action( 'wp_head', array( $this, 'loadVariables' ), 1000 );
		add_action( 'admin_head', array( $this, 'loadVariables' ), 1000 );
	}

	/**
	 * Load environment and color variables
	 *
	 * @return void
	 */
	public function loadVariables() {

		// Load dynamic colors
		$dynamic_colors = Colors::getColors();
		$_colors        = '';
		foreach ( $dynamic_colors as $name => $code ) {
			$_colors .= '--crewmat-color-' . esc_attr( $name ) . ':' . esc_attr( $code ) . ';';
		}
		?>
			<style>
				[id^="Solidie_"],[id^="solidie_"],[class^="Solidie_"],[id^="solidie_"],#crewhrm-popup-root{
					<?php echo esc_html( $_colors ); ?>
				}
			</style>
		<?php

		$nonce_action = '_solidie_' . str_replace( '-', '_', gmdate( 'Y-m-d' ) );
		$nonce        = wp_create_nonce( $nonce_action );
		$user         = wp_get_current_user();

		// Load data
		$data = apply_filters(
			'solidie_frontend_variables',
			array(
				'ajaxurl'          => admin_url( 'admin-ajax.php' ),
				'home_url'         => get_home_url(),
				'is_admin'         => is_admin(),
				'action_hooks'     => array(),
				'filter_hooks'     => array(),
				'home_path'        => rtrim( wp_parse_url( get_home_url() )['path'] ?? '/', '/' ) . '/',
				'app_name'         => Main::$configs->app_id,
				'nonce'            => $nonce,
				'nonce_action'     => $nonce_action,
				'is_pro_installed' => Utilities::isProInstalled( false ),
				'is_pro_active'    => Utilities::isProInstalled( true ),
				'colors'           => $dynamic_colors,
				'text_domain'      => Main::$configs->text_domain,
				'date_format'      => get_option( 'date_format' ),
				'time_format'      => get_option( 'time_format' ),
				'readonly_mode'    => apply_filters( 'solidie_readonly_mode', false ), // It's for solidie demo site only. No other use is expected.
				'is_apache'        => is_admin() ? strpos( sanitize_text_field( $_SERVER['SERVER_SOFTWARE'] ?? '' ), 'Apache' ) !== false : null,
				'user'             => array(
					'id'           => get_current_user_id(),
					'first_name'   => $user ? $user->first_name : null,
					'last_name'    => $user ? $user->last_name : null,
					'display_name' => $user ? $user->display_name : null,
				),
				'settings'         => array(
					'contents' => AdminSetting::getContentSettings(),
					'general'  => array(
						'frontend_dashboard_path' => AdminSetting::get( 'general.frontend_dashboard_path' ),
					),
				),
				'permalinks'       => array(
					'inventory_backend' => Utilities::getBackendPermalink( AdminPage::INVENTORY_SLUG ),
					'settings'          => Utilities::getBackendPermalink( AdminPage::SETTINGS_SLUG ),
					'dashboard'         => Utilities::getBackendPermalink( Main::$configs->root_menu_slug ),
					'gallery'           => Contents::getGalleryPermalink(),
				),
			)
		);

		$pointer = Main::$configs->app_id;

		?>
		<script>
			window.<?php echo $pointer; ?> = <?php echo wp_json_encode( $data ); ?>;
			window.<?php echo $pointer; ?>pro = window.<?php echo $pointer; ?>;
		</script>
		<?php
	}

	/**
	 * Load scripts for admin dashboard
	 *
	 * @return void
	 */
	public function adminScripts() {
		if ( Utilities::isAdminDashboard() ) {
			wp_enqueue_script( 'solidie-admin-script', Main::$configs->dist_url . 'admin-dashboard.js', array( 'jquery' ), Main::$configs->version, true );
		}
	}

	/**
	 * Load scripts for frontend view
	 *
	 * @return void
	 */
	public function frontendScripts() {
		wp_enqueue_script( 'solidie-frontend-script', Main::$configs->dist_url . 'frontend.js', array( 'jquery' ), Main::$configs->version, true );
	}

	/**
	 * Load scripts to render free page in pro dashboard
	 *
	 * @return void
	 */
	public function loadScriptForProDashboard() {
		wp_enqueue_script( 'solidie-frontend-dashboard-patch-script', Main::$configs->dist_url . 'frontend-dashboard-patch.js', array( 'jquery' ), Main::$configs->version, true );
	}
}
