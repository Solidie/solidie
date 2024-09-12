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

	const DB_VERSION_KEY = 'solidie_db_version';

	/**
	 * Constructor that registeres hook to deploy database on plugin activation
	 *
	 * @return void
	 */
	public function __construct() {
		$this->prepareTableNames();
		add_action( 'solidie_activated', array( $this, 'importDB' ) );
		add_action( 'admin_init', array( $this, 'importDBOnUpdate' ), 0 );
	}

	/**
	 * Trigger import db function on plugin update
	 *
	 * @return void
	 */
	public function importDBOnUpdate() {

		$last_version = get_option( self::DB_VERSION_KEY );
		
		if ( empty( $last_version ) || version_compare( $last_version, Main::$configs->version, '<' ) ) {
			$this->importDB();
		}
	}

	/**
	 * Import database
	 *
	 * @return void
	 */
	public function importDB() {
		
		$sql_path = Main::$configs->dir . 'dist/libraries/db.sql';
		DB::import( file_get_contents( $sql_path ) );
		update_option( self::DB_VERSION_KEY, Main::$configs->version, true );

		do_action( 'solidie_db_deployed' );
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

		$wpdb->solidie_categories        = $prefix . 'categories';
		$wpdb->solidie_contents          = $prefix . 'contents';
		$wpdb->solidie_content_meta      = $prefix . 'content_meta';
		$wpdb->solidie_license_keys      = $prefix . 'license_keys';
		$wpdb->solidie_popularity        = $prefix . 'popularity';
		$wpdb->solidie_releases          = $prefix . 'releases';
		$wpdb->solidie_sales             = $prefix . 'sales';
		$wpdb->solidie_tokens            = $prefix . 'tokens';
		$wpdb->solidie_comments          = $prefix . 'comments';
		$wpdb->solidie_reactions         = $prefix . 'reactions';
		$wpdb->solidie_lessons           = $prefix . 'lessons';
		$wpdb->solidie_content_pack_link = $prefix . 'content_pack_link';
		$wpdb->solidie_withdrawals       = $prefix . 'withdrawals';
		$wpdb->solidie_blocks            = $prefix . 'blocks';
		$wpdb->solidie_messages          = $prefix . 'messages';
	}
}
