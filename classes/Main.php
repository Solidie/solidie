<?php

namespace Solidie;

use Solidie\Helpers\_Array;
use Solidie\Helpers\Crypto;
use Solidie\Setup\Dispatcher;
use Solidie\Setup\Scripts;
use Solidie\Setup\AdminPage;
use Solidie\Setup\Utilities;
use Solidie\Setup\Media;
use Solidie\Setup\RestAPI;
use Solidie\Setup\WooCommerce;
use Solidie\Setup\WooCommerceSubscription;
use Solidie\Models\DB;
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
		self::$configs      = $configs;
		self::$configs->dir = dirname( $configs->file ) . '/';

		// Loading Autoloader
		spl_autoload_register( array( $this, 'loader' ) );

		$manifest = _Array::getManifestArray( $configs->file, ARRAY_A );
		self::$configs = (object) array_merge( $manifest, (array) self::$configs );

		// Register Activation/Deactivation Hook
		register_activation_hook( self::$configs->file, array( $this, 'activate' ) );
		register_deactivation_hook( self::$configs->file, array( $this, 'deactivate' ) );

		// Assign crypto
		self::$configs->crypto = Crypto::class;

		// Add prefix to linked table
		$table_name = $configs->linked_table;
		self::$configs->linked_table = DB::$table_name();
		
		// Core Modules
		new Utilities();
		new Dispatcher();
		new Scripts();
		new AdminPage();
		new WooCommerce();
		new WooCommerceSubscription();
		new RestAPI();
		new Media();

		// Register plugin updater (Registered content name, content main file, parent menu for license page, continous update check bool)
		// new Updater( $configs );
	}

	/**
	 * Autload classes
	 *
	 * @param string $class_name The class name to load file for
	 * @return void
	 */
	public function loader( $class_name ) {
		if ( class_exists( $class_name ) ) {
			return;
		}

		$class_name = preg_replace(
			array( '/([a-z])([A-Z])/', '/\\\/' ),
			array( '$1$2', DIRECTORY_SEPARATOR ),
			$class_name
		);

		$class_name = str_replace( 'Solidie' . DIRECTORY_SEPARATOR, 'classes' . DIRECTORY_SEPARATOR, $class_name );
		$file_name  = self::$configs->dir . $class_name . '.php';

		if ( file_exists( $file_name ) ) {
			require_once $file_name;
		}
	}

	/**
	 * Execute activation hook
	 *
	 * @return void
	 */
	public static function activate() {
		do_action( 'solidie_activated' );
	}

	/**
	 * Execute deactivation hook
	 *
	 * @return void
	 */
	public static function deactivate() {
		do_action( 'solidie_deactivated' );
	}
}