<?php

namespace AppStore\Models;

use AppStore\Base;

class Release extends Base {
	/**
	 * Undocumented function
	 *
	 * @param integer $app_id
	 * @param integer|null $page
	 * @param integer|null $limit
	 * @param string|null $version
	 * @return array
	 */
	public static function getReleases( int $app_id, int $page = 1, int $limit = 20, string $version = null ) {
		global $wpdb;

		$offset         = $limit * ( $page - 1 );
		$version_clause = $version ? " AND version=" . esc_sql( $version ) : '';

		$releases = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM ".self::table( 'releases' )." WHERE app_id=%d ".$version_clause." LIMIT %d, %d",
				$app_id,
				$offset,
				$limit
			)
		);

		$new_array = array();

		// Loop through releases and add more data like download URL
		foreach ( $releases as $release ) {
			$file_url  = wp_get_attachment_url( $release->file_id );
			$file_path = get_attached_file( $release->file_id );

			// To Do: Check if the file really exists in file system or cloud
			if ( ! $file_url ) {
				continue;
			}

			$release->file_url  = $file_url;
			$release->file_path = $file_path ? $file_path : null;
			$release->mime_type = get_post_mime_type( $release->file_id );
			
			// Store the release in the new array
			$new_array[] = $release;
		}

		return $new_array;
	} 

	/**
	 * Undocumented function
	 *
	 * @param integer $app_id
	 * @param string|null $version
	 * @return object
	 */
	public static function getRelease( int $app_id, string $version = null ) {
		$relases = self::getReleases( $app_id, 1, 1, $version );
		return ( is_array( $relases ) && ! empty( $relases ) ) ? $relases[0] : null;
	}
}