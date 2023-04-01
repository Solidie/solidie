<?php

namespace AppStore\Setup;

use AppStore\Models\AdminSetting;
use AppStore\Models\FrontendDashboard;
use AppStore\Models\Page as PageModel;

class AdminPage {
	private $page;

	function __construct() {
		$this->page = new PageModel();
	}

	public function setup() {
		add_action( 'admin_menu', array( $this, 'registerMenu' ) );
		add_action( 'generate_rewrite_rules', array( $this, 'add_rewrite_rules' ) );
		add_action( 'wp', array( $this, 'support_dashboard_sub_page' ) );
		add_filter( 'page_template', array( $this, 'force_template_for_dashboard' ) );
	}

	/**
	 * Register admin menu pages
	 *
	 * @return void
	 */
	public function registerMenu() {
		// Main page
		add_menu_page(
			__( 'AppStore', 'appstore' ),
			__( 'AppStore', 'appstore' ),
			'administrator',
			'appstore',
			array( $this, 'mainPage' )
		);

		// Setting page
		add_submenu_page( 
			'appstore', 
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
		?>This is content<?php
	}
	
	/**
	 * Setting page content
	 *
	 * @return void
	 */
	public function settingPage() {
		$pages    = $this->page->getPageList();
		$settings = (object)AdminSetting::get();

		echo '<div class="wrap" id="AppStore_AdminSettings" 
				   data-pages="' . esc_attr( json_encode( $pages ) ) . '" 
				   data-saved-settings="' . esc_attr( json_encode( $settings ) ) . '"></div>';
	}

	/**
	 * Add support for frontend dashboard subpage
	 *
	 * @return void
	 */
	public function support_dashboard_sub_page() {
		global $wp_query;
		if ( ! $wp_query->is_main_query() && ! is_admin() || ! is_page() || FrontendDashboard::getPageID() != get_the_ID() ) {
			return;
		}

		$permalink = get_permalink( get_the_ID() );
		$url_path  = parse_url( APPSTORE_CURRENT_URL, PHP_URL_PATH );
		$page_path = parse_url( $permalink, PHP_URL_PATH );
		$sub_pages = array();
		
		if ( strpos( $url_path, $page_path ) ===0 ) {
			$sub_pages = explode( '/', str_replace( $page_path, '', $url_path ) );
			$sub_pages = array_filter( 
				$sub_pages, 
				function($page) {
					return ! empty( $page );
				} 
			);
		}

		$wp_query->set( 'pagename', basename( $page_path ) ); 

		if ( count( $sub_pages ) === 1 ) {
			$wp_query->set( 'appstore_dashboard_page', $sub_pages[0] );
		} else if( count( $sub_pages ) === 3 && $sub_pages[0] === 'store' ) {
			$wp_query->set( 'appstore_dashboard_store', $sub_pages[1] );
			$wp_query->set( 'appstore_dashboard_store_sub_page', $sub_pages[2] );
		}
	}

	/**
	 * Rewrite rules
	 *
	 * @param object $wp_rewrite
	 * @return void
	 */
	public function add_rewrite_rules( $wp_rewrite ) {
		$page_id = FrontendDashboard::getPageID();
		if ( empty( $page_id ) ) {
			return;
		}
		$page_name = get_post_field( 'post_name', $page_id );

		$new_rules = array( 
			"({$page_name})/(.+?)/?$" => 'index.php?pagename=' . $wp_rewrite->preg_index( 1 ) . '&appstore_dashboard_page=' . $wp_rewrite->preg_index( 2 ),
			"({$page_name})/(store)/(.+?)/(.+?)/?$" => 'index.php?pagename=' . $wp_rewrite->preg_index( 1 ) . '&appstore_dashboard_store=' . $wp_rewrite->preg_index( 3 ) . '&appstore_dashboard_store_sub_page=' . $wp_rewrite->preg_index( 4 )
		);

		$wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
	}

	/**
	 * Force custom template for dashboard
	 *
	 * @param string $template
	 * @return string
	 */
	public function force_template_for_dashboard( $template ) {
		if ( is_page() && get_the_ID() == AdminSetting::get( 'dashboard_page_id' ) ) {
			$template = APPSTORE_DIR . 'templates/frontend-dashboard.php';
		}

		return $template;
	}
}