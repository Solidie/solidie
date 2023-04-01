<?php

namespace AppStore\Models;

class DB {
	/**
	 * Get prefixed table name
	 *
	 * @param string $name
	 * @param array $arguments
	 * @return void
	 */
	public static function __callStatic( string $name, array $arguments ) {
		global $wpdb;
		return strpos( $name, 'app_' ) === 0 ? $wpdb->prefix . $name : $name;
    }
}