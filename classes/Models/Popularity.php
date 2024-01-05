<?php
/**
 * Popularity functionalities
 * 
 * @package solidie
 */

namespace Solidie\Models;

/**
 * Popularity class
 */
class Popularity {
	public static function logDownload( $content_id ) {
		global $wpdb;
		$wpdb->insert(
			$wpdb->solidie_popularity,
			array( 'content_id' => $content_id )
		);
	}
}
