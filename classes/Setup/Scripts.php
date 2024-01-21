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
use Solidie\Models\Manifest;

// To Do: Load frontend scripts only in catalog and single content page when not in development mode
// To Do: Load frontend dashboard script only in the dashboard
// To Do: Load backend dashboard script only in solidie backend pages
// To Do: Pass sales data to solidie (if the plan is reveneue share) from only JS as it is encoded and hard to reverse engineer. TBD how to get the data in JS first.

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
				[id^="Solidie_"],[id^="solidie_"],#crewhrm-popup-root{
					<?php echo esc_html( $_colors ); ?>
				}
			</style>
		<?php

		$nonce_action = '_solidie_' . str_replace( '-', '_', gmdate( 'Y-m-d' ) );
		$nonce        = wp_create_nonce( $nonce_action );

		// Load data
		$data = apply_filters(
			'solidie_frontend_variables',
			array(
				'ajaxurl'      => admin_url( 'admin-ajax.php' ),
				'home_url'     => get_home_url(),
				'is_admin'     => is_admin(),
				'action_hooks' => array(),
				'filter_hooks' => array(),
				'home_path'    => rtrim( wp_parse_url( get_home_url() )['path'] ?? '/', '/' ) . '/',
				'app_name'     => Main::$configs->app_id,
				'nonce'        => $nonce,
				'nonce_action' => $nonce_action,
				'has_pro'      => Main::$configs->has_pro,
				'colors'       => $dynamic_colors,
				'text_domain'  => Main::$configs->text_domain,
				'date_format'  => get_option( 'date_format' ),
				'time_format'  => get_option( 'time_format' ),
				'settings'     => AdminSetting::getFilteredSettings(),
				'permalinks'   => array(
					'content_types' => admin_url( 'admin.php?page=' . AdminPage::CONTENT_TYPES_SLUG ),
					'dashboard'     => admin_url( 'admin.php?page=' . Main::$configs->root_menu_slug ),
				),
			)
		);

		$pointer = Main::$configs->app_id;

		?>
		<script>
			window.<?php echo esc_html( $pointer ); ?> = JSON.parse("<?php echo esc_attr( wp_json_encode( $data ) ); ?>".replace(/&quot;/g, '"'));
			window.<?php echo esc_html( $pointer ); ?>pro = window.<?php echo esc_html( $pointer ); ?>;
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
