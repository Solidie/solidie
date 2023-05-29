<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Main;
use Solidie\Store\Models\AdminSetting;
use Solidie\Store\Models\FrontendDashboard as FrontendDashboardModel;
use Solidie\Store\Models\Store;

class FrontendDashboard extends Main {
	public function __construct() {
		add_action( 'generate_rewrite_rules', array( $this, 'add_rewrite_rules' ) );
		add_action( 'wp', array( $this, 'support_dashboard_sub_page' ) );
		add_filter( 'page_template', array( $this, 'force_template_for_dashboard' ) );
		add_filter( 'solidie_frontend_dashboard_data', array( $this, 'solidie_frontend_dashboard_data' ) );
	}

	/**
	 * Add support for frontend dashboard subpage
	 *
	 * @return void
	 */
	public function support_dashboard_sub_page() {
		global $wp_query;
		if ( ! $wp_query->is_main_query() && ! is_admin() || ! is_page() || FrontendDashboardModel::getPageID() != get_the_ID() ) {
			return;
		}

		$permalink = get_permalink( get_the_ID() );
		$url_path  = parse_url( self::$configs->current_url, PHP_URL_PATH );
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
			$wp_query->set( 'solidie_dashboard_page', $sub_pages[0] );
		} else if( count( $sub_pages ) === 3 && $sub_pages[0] === 'store' ) {
			$wp_query->set( 'solidie_dashboard_store', $sub_pages[1] );
			$wp_query->set( 'solidie_dashboard_store_sub_page', $sub_pages[2] );
		}
	}

	/**
	 * Rewrite rules
	 *
	 * @param object $wp_rewrite
	 * @return void
	 */
	public function add_rewrite_rules( $wp_rewrite ) {
		$page_id = FrontendDashboardModel::getPageID();
		if ( empty( $page_id ) ) {
			return;
		}
		$page_name = get_post_field( 'post_name', $page_id );

		$new_rules = array( 
			"({$page_name})/(.+?)/?$" => 'index.php?pagename=' . $wp_rewrite->preg_index( 1 ) . '&solidie_dashboard_page=' . $wp_rewrite->preg_index( 2 ),
			"({$page_name})/(store)/(.+?)/(.+?)/?$" => 'index.php?pagename=' . $wp_rewrite->preg_index( 1 ) . '&solidie_dashboard_store=' . $wp_rewrite->preg_index( 3 ) . '&solidie_dashboard_store_sub_page=' . $wp_rewrite->preg_index( 4 )
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
		if ( FrontendDashboardModel::is_dashboard() ) {
			$template = self::$configs->dir . 'templates/frontend-dashboard.php';
		}

		return $template;
	}

	/**
	 * Provide data to render frontend dashboard based on
	 *
	 * @param array $data
	 * @return array
	 */
	public function solidie_frontend_dashboard_data( array $data ) {
		if ( ! is_array( $data ) ) {
			$data = array();
		}
		
		$data['stores']        = Store::getStoresForKeeper( get_current_user_id() );
		$data['dashbaord_url'] = FrontendDashboardModel::getUrl();
		$data['avatar_url']    = get_avatar_url( get_current_user_id(), array( 'size'=> 120 ) );

		return $data;
	}
}