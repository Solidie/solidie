<?php

namespace Solidie\Setup;

use Solidie\Helpers\Colors;
use Solidie\Main;
use Solidie\Models\AdminSetting;
use Solidie\Models\FrontendDashboard;

// To Do: Load frontend scripts only in catalog and single content page when not in development mode
// To Do: Load frontend dashboard script only in the dashboard
// To Do: Load backend dashboard script only in solidie backend pages
// To Do: Pass sales data to solidie (if the plan is reveneue share) from only JS as it is encoded and hard to reverse engineer. TBD how to get the data in JS first.

class Scripts {

	public function __construct() {

		add_action( 'admin_enqueue_scripts', array( $this, 'adminScripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontendScripts' ) );

		// Vars
		add_action( 'wp_head', array( $this, 'loadVariables' ), 1000 );
		add_action( 'admin_head', array( $this, 'loadVariables' ), 1000 );
	}

	public function loadVariables() {

		// Load dynamic colors
		$dynamic_colors = Colors::getColors();
		$_colors        = '';
		foreach ( $dynamic_colors as $name => $code ) {
			$_colors .= '--crewmat-color-' . esc_attr( $name ) . ':' . esc_attr( $code ) . ';';
		}
		echo '<style>[id^="Solidie_"],#crewhrm-popup-root{' . $_colors . '}</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		// Load data
		$data = array(
			'ajaxurl'     => admin_url( 'admin-ajax.php' ),
			'home_url'    => get_home_url(),
			'home_path'   => rtrim( parse_url( get_home_url() )['path'] ?? '/', '/' ) . '/',
			'app_name'    => Main::$configs->app_name,
			'nonce'       => wp_create_nonce( Main::$configs->app_name ),
			'colors'      => $dynamic_colors,
			'text_domain' => Main::$configs->text_domain,
			'settings'    => array(
				'contents'  => AdminSetting::get( 'contents' ),
				'dashboard' => AdminSetting::get( 'dashboard' ),
			)
		);
		
		// Determine data pointer
		$pattern = '/\/([^\/]+)\/wp-content\/(plugins|themes)\/([^\/]+)\/.*/';
		preg_match( $pattern, Main::$configs->url, $matches );
		$parsedString = strtolower( "CrewMat_{$matches[1]}_{$matches[3]}" );
		$parsedString = preg_replace( '/[^a-zA-Z0-9_]/', '', $parsedString );
		echo '<script>window.' . $parsedString . '=' . wp_json_encode( $data ) . '</script>';
	}

	public function adminScripts() {
		if ( get_admin_page_parent() == Main::$configs->root_menu_slug  ) {
			wp_enqueue_script( 'solidie-admin-script', Main::$configs->dist_url . 'admin-dashboard.js', array( 'jquery' ), Main::$configs->version, true );
		}
	}

	public function frontendScripts() {
		if ( FrontendDashboard::is_dashboard() ) {
			wp_enqueue_script( 'appstore-frontend-dashboard-script', Main::$configs->dist_url . 'frontend-dashboard.js', array( 'jquery' ), Main::$configs->version, true );
		} else {
			wp_enqueue_script( 'appstore-frontend-script', Main::$configs->dist_url . 'frontend.js', array( 'jquery' ), Main::$configs->version, true );
		}
	}
}