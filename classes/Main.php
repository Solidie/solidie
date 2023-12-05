<?php

namespace Solidie;

use Solidie\Helpers\_Array;
use Solidie\Helpers\Crypto;
use Solidie\Setup\Dispatcher;
use Solidie\Setup\Scripts;
use Solidie\Setup\AdminPage;
use Solidie\Setup\Utilities;
use Solidie\Setup\Media;
use Solidie\Setup\Route;

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

		// Retrieve plugin info from index
		$manifest = _Array::getManifestArray( $configs->file, ARRAY_A );
		self::$configs = (object) array_merge( $manifest, (array) self::$configs );

		// Prepare the unique app name
		$pattern = '/\/([^\/]+)\/wp-content\/(plugins|themes)\/([^\/]+)\/.*/';
		preg_match( $pattern, self::$configs->url, $matches );
		$parsedString = strtolower( "CrewMat_{$matches[1]}_{$matches[3]}" );
		self::$configs->app_name = preg_replace( '/[^a-zA-Z0-9_]/', '', $parsedString );

		// Register Activation/Deactivation Hook
		register_activation_hook( self::$configs->file, array( $this, 'activate' ) );
		register_deactivation_hook( self::$configs->file, array( $this, 'deactivate' ) );

		// Assign crypto
		self::$configs->crypto = Crypto::class;

		// Core Modules
		new Route();
		new Utilities();
		new Dispatcher();
		new Scripts();
		new AdminPage();
		new Media();
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