<?php
/**
 * Database importer for Solidie
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Main;
use Solidie\Models\DB;

/**
 * The database manager class
 */
class Database {

	/**
	 * Constructor that registeres hook to deploy database on plugin activation
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'solidie_activated', array( $this, 'importDB' ) );
	}

	/**
	 * Import database
	 *
	 * @return void
	 */
	public function importDB() {
		$sql_path = Main::$configs->dir . 'dist' . DIRECTORY_SEPARATOR . 'libraries' . DIRECTORY_SEPARATOR . 'db.sql';
		DB::import( file_get_contents( $sql_path ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	}
}
