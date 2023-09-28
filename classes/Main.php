<?php

namespace Solidie\Store;

use Solidie\Store\Helpers\Crypto;
use Solidie\Store\Setup\Dispatcher;
use Solidie\Store\Setup\Scripts;
use Solidie\Store\Setup\AdminPage;
use Solidie\Store\Setup\Utilities;
use Solidie\Store\Setup\Media;
use Solidie\Store\Setup\RestAPI;
use Solidie\Store\Setup\WooCommerce;
use Solidie\Store\Setup\WooCommerceSubscription;
use Solidie\Store\Models\AdminSetting;

use Solidie\SalesReporter\Report;
use Solidie\Store\Setup\Shortcode;
use Solidie\Updater\Updater;

class Main {
	/**
	 * Configs array
	 *
	 * @var object
	 */
	public static $configs;

	/**
	 * Initialize Plugin
	 * 
	 * @param object $configs
	 * 
	 * @return void
	 */
	public function init( object $configs ) {

		// Store configs in runtime static property
		self::$configs = $configs;
		self::$configs->crypto = Crypto::class;

		// Add prefix to linked table
		self::$configs->linked_table = self::table( $configs->linked_table );
		
		// Core Modules
		new Utilities();
		new Dispatcher();
		new Scripts();
		new AdminPage();
		new WooCommerce();
		new WooCommerceSubscription();
		new RestAPI();
		new Media();
		new Shortcode();

		// Register sales reporter to solidie website
		new Report( $configs );
		
		// Register plugin updater (Registered content name, content main file, parent menu for license page, continous update check bool)
		new Updater( $configs );
	}

	protected static function table( string $table_name ) {
		global $wpdb;
		return $wpdb->prefix . self::$configs->db_prefix . $table_name;
	}

	protected static function getSiteCommissionRate() {
		return AdminSetting::get( 'site_commision_rate', 0 );
	}
}