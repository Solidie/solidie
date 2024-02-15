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
		$this->prepareTableNames();
		add_action( 'solidie_activated', array( $this, 'importDB' ) );
	}

	/**
	 * Import database
	 *
	 * @return void
	 */
	public function importDB() {
		$sql_path = Main::$configs->dir . 'dist' . DIRECTORY_SEPARATOR . 'libraries' . DIRECTORY_SEPARATOR . 'db.sql';
		DB::import( file_get_contents( $sql_path ) );
	}

	/**
	 * Add table names into wpdb object
	 *
	 * @return void
	 */
	private function prepareTableNames() {
		global $wpdb;

		// WP and Plugin prefix
		$prefix = $wpdb->prefix . Main::$configs->db_prefix;

		$wpdb->solidie_categories   = $prefix . 'categories';
		$wpdb->solidie_contents     = $prefix . 'contents';
		$wpdb->solidie_content_meta = $prefix . 'content_meta';
		$wpdb->solidie_license_keys = $prefix . 'license_keys';
		$wpdb->solidie_popularity   = $prefix . 'popularity';
		$wpdb->solidie_releases     = $prefix . 'releases';
		$wpdb->solidie_sales        = $prefix . 'sales';
		$wpdb->solidie_tokens       = $prefix . 'tokens';
		$wpdb->solidie_comments     = $prefix . 'comments';
		$wpdb->solidie_reactions    = $prefix . 'reactions';
	}
}
