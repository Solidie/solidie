<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Main;
use Solidie\Store\Models\AdminSetting;
use Solidie\Store\Models\Apps;
use Solidie\Store\Models\Page as PageModel;

class AdminPage extends Main {

	/**
	 * The pagename for Solidie
	 *
	 * @var string
	 */
	public static $pagename_key = 'solidie_pagename';

	function __construct() {
		add_action( 'admin_menu', array( $this, 'registerMenu' ) );
		add_action( 'rewrite_rules_array', array( $this, 'rebuild_permalinks' ) );
		add_action( 'solidie_settings_updated', array( $this, 'trigger_rewrite_rules' ) );
		add_filter( 'query_vars', array( $this, 'register_pagename' ) );
		add_filter( 'template_include', array( $this, 'register_template' ) );
		add_action( 'wp', array( $this, 'recirect_product' ) );
	}

	/**
	 * Register var
	 *
	 * @param array $vars
	 * 
	 * @return array
	 */
	public function register_pagename ($vars) {
		$vars[] = self::$pagename_key;
		return $vars;
	} 

	/**
	 * Undocumented function
	 *
	 * @param string $template
	 * @return string
	 */
	function register_template( $template ) {
		if ( get_query_var( self::$pagename_key ) ) {
			// Load your custom template file here
			$template = self::$configs->dir . 'templates/index.php';
		}

		return $template;
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
			self::$configs->root_menu_slug,
			array( $this, 'mainPage' )
		);

		// Setting page
		add_submenu_page( 
			self::$configs->root_menu_slug, 
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
		?>This is main page content<?php
	}
	
	/**
	 * Setting page content
	 *
	 * @return void
	 */
	public function settingPage() {
		// $pages    = PageModel::getPageList();
		$settings = (object)AdminSetting::get();

		echo '<div class="wrap" id="Solidie_AdminSettings" 
				   data-saved-settings="' . esc_attr( json_encode( $settings ) ) . '"></div>';
	}

	/**
	 * Trigger rewrite rules on Solidie settings update
	 *
	 * @return void
	 */
	public function trigger_rewrite_rules() {
		flush_rewrite_rules();
	}

	/**
	 * Add custom Rewrite rules
	 *
	 * @param array $rules
	 * @return array
	 */
	public function rebuild_permalinks( $rules ) {
		$settings = AdminSetting::get();
		$slugs = array(
			$settings['dashboard']['slug'],
			$settings['catalog']['slug'],
		);

		// Loop through content types and register their slug
		foreach ( $settings['contents'] as $content ) {
			if ( ( $content['enable'] ?? false ) == true && ! empty( $content['slug'] ) && $content['slug'] !== 'wp-admin' ) {
				$slugs[] = $content['slug'];
			}
		}

		// Register to rules now
		$new_rules = array();
		foreach ( $slugs as $slug ) {
			$template = 'index.php?' . self::$pagename_key . '=' . $slug;
			$new_rules[ $slug . '/?$' ] = $template;
			$new_rules[ $slug . '/(.+?)/?$' ] = $template;
		}

		return $new_rules + $rules;
	}

	/**
	 * Redirect WooCommerce prodcuct to our custom URLs
	 *
	 * @return void
	 */
	public function recirect_product() {
		$product_id = get_the_ID();

		if ( is_admin() || ! is_singular() || ! Apps::isProductApp( $product_id ) ) {
			return;
		}

		$permalink = Apps::getPermalink( $product_id );
		wp_safe_redirect( $permalink, 301 );
		exit;
	}
}