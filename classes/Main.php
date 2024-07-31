<?php
/**
 * App initiator class
 *
 * @package solidie
 */

namespace Solidie;

use SolidieLib\_Array;
use SolidieLib\Dispatcher;

use Solidie\Helpers\Utilities;
use Solidie\Setup\OpenGraph;
use Solidie\Setup\Scripts;
use Solidie\Setup\AdminPage;
use Solidie\Setup\Cron;
use Solidie\Setup\Database;
use Solidie\Setup\Media;
use Solidie\Setup\Promotion;
use Solidie\Setup\Route;
use Solidie\Setup\Shortcode;
use Solidie\Setup\User;

use Solidie\Controllers\ContentController;
use Solidie\Controllers\SettingsController;
use Solidie\Controllers\CategoryController;
use Solidie\Controllers\CommentController;
use Solidie\Controllers\LessonController;

use Solidie\Models\User as ModelsUser;

/**
 * Main class to initiate app
 */
class Main {
	/**
	 * Configs array
	 *
	 * @var object
	 */
	public static $configs;

	function __construct() {
		add_action( 'plugins_loaded', array( $this, 'registerControllers' ), 101 );
	}

	/**
	 * Initialize Plugin
	 *
	 * @param object $configs Plugin configs for start up
	 *
	 * @return void
	 */
	public function init( object $configs ) {

		// Store configs in runtime static property
		self::$configs           = $configs;
		self::$configs->api_host = 'development' === $configs->mode ? 'http://localhost:10019' : 'https://solidie.com';
		self::$configs->dir      = dirname( $configs->file ) . '/';
		self::$configs->basename = plugin_basename( $configs->file );

		// Loading Autoloader
		spl_autoload_register( array( $this, 'loader' ) );

		// Retrieve plugin info from index
		$manifest      = _Array::getManifestArray( $configs->file, ARRAY_A );
		self::$configs = (object) array_merge( $manifest, (array) self::$configs );

		// Prepare the unique app name
		self::$configs->app_id = Utilities::getAppId( self::$configs->url );

		// Register Activation/Deactivation Hook
		register_activation_hook( self::$configs->file, array( $this, 'activate' ) );

		// Core Modules
		new Database();
		new Route();
		new Scripts();
		new Shortcode();
		new AdminPage();
		new Media();
		new User();
		new OpenGraph();
		new Cron();
		new Promotion();
	}

	/**
	 * Register controller methods
	 *
	 * @return void
	 */
	public function registerControllers() {

		new Dispatcher(
			self::$configs->app_id,
			array(
				ContentController::class,
				SettingsController::class,
				CategoryController::class,
				CommentController::class,
				LessonController::class,
			)
		);

		add_filter( 
			'solidie_controller_roles_' . self::$configs->app_id, 
			function ( $roles ) {
				if ( in_array( 'administrator', $roles ) ) {
					$roles[] = ModelsUser::getSolidieAdminRole();
				}
				return $roles;
			}
		);
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
}
