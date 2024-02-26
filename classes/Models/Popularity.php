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

	/**
	 * To log popularity
	 *
	 * @param int $content_id The content ID to log for
	 *
	 * @return void
	 */
	public static function logDownload( $content_id ) {
		global $wpdb;
		$wpdb->insert(
			$wpdb->solidie_popularity,
			array( 'content_id' => $content_id )
		);
	}

	/**
	 * Delete by content ID
	 *
	 * @param int $content_id
	 * @return void
	 */
	public static function deleteByContentId( $content_id ) {
		Field::popularity()->deleteField( array( 'content_id' => $content_id ) );
	}
}
