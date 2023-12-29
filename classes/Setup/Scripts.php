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
		echo '<style>[id^="Solidie_"],#crewhrm-popup-root{' . $_colors . '}</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

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
				'nonce'        => wp_create_nonce( Main::$configs->app_id ),
				'has_pro'      => Main::$configs->has_pro,
				'colors'       => $dynamic_colors,
				'text_domain'  => Main::$configs->text_domain,
				'date_format'  => get_option( 'date_format' ),
				'time_format'  => get_option( 'time_format' ),
				'permalinks'   => array(
					'content_types' => admin_url( 'admin.php?page=' . AdminPage::CONTENT_TYPES_SLUG ),
					'dashboard'     => admin_url( 'admin.php?page=' . Main::$configs->root_menu_slug ),
				),
				'settings'     => array(
					'dashboard' => AdminSetting::get( 'dashboard' ),
					'contents'  => array_replace_recursive(
						Manifest::getManifest()['contents'],
						AdminSetting::get( 'contents' )
					),
				),
			)
		);

		$pointer   = Main::$configs->app_id;
		$variables = '<script>
			window.' . $pointer . '=' . wp_json_encode( $data ) . ';
			window.' . $pointer . 'pro=window.' . $pointer . ';
		</script>';

		echo $variables; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
}
