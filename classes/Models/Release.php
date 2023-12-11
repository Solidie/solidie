<?php

namespace Solidie\Models;

class Release {
	
	/**
	 * Delete file for a single release
	 *
	 * @param int|array $release_ids Release ID or array of release IDs
	 * @return void
	 */
	private static function deleteRelease( $release_ids ) {
		if ( ! is_array( $release_ids ) ) {
			$release_ids = array( $release_ids );
		}

		$implodes = implode( ',', $release_ids );
		if ( empty( $implodes ) ) {
			return;
		}

		global $wpdb;
		$file_ids = $wpdb->get_col(
			"SELECT file_id FROM " . DB::releases() . " WHERE release_id IN (" . $implodes . ")"
		);

		// Delete file IDs from file system
		FileManager::deleteFile( $file_ids );

		// Delete release rows
		foreach ( $release_ids as $id ) {
			$wpdb->delete(
				DB::releases(),
				array(
					'release_id' => $id
				)
			);
		}
	}

	/**
	 * Delete releases from a specific content
	 *
	 * @param int $content_id
	 * @return void
	 */
	public static function deleteReleaseByContentId( $content_id ) {
		global $wpdb;
		$release_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT release_id FROM " . DB::releases() . " WHERE content_id=%d",
				$content_id
			)
		);

		self::deleteRelease( $release_ids );
	}

	/**
	 * Create or update a release
	 *
	 * @param array $data Release data including file
	 * @return bool
	 */
	public static function pushRelease( array $data ) {
		$content = Contents::getContentByContentID( $data['content_id'] );
		if ( empty( $content ) ) {
			return __( 'Content not found to release', 'solidie'  );
		}
		
		$release = array(
			'version'    => $data['version'],
			'changelog'  => $data['changelog'],
			'content_id' => $data['content_id'],
		);

		global $wpdb;

		// Process file if exists.
		if ( ! empty( $data['file'] ) ) {
			// Delete old file as release ID exists in the data array
			if ( ! empty( $data['release_id'] ) ) {
				self::deleteRelease( $data['release_id'] );
			}

			// Upload new one
			$file_id = FileManager::uploadFile( $data['content_id'], $data['file'], $content['content_title'] . ' - Downloadable' );
			if ( ! $file_id ) {
				return __( 'Error in file saving!', 'solidie'  );
			}

			// Link new one to the release
			$release['file_id'] = $file_id;
		}

		if ( empty( $data['release_id'] ) ) {
			$wpdb->insert( DB::releases(), $release );
		} else {
			$wpdb->update(
				DB::releases(),
				$release,
				array(
					'release_id' => $data['release_id']
				)
			);
		}

		return true;
	}

	/**
	 * Get release history. No matter what the defined version is, the order will be latest first. 
	 *
	 * @param integer $content_id
	 * @param integer|null $page
	 * @param integer|null $limit
	 * @param string|null $version
	 * @return array
	 */
	public static function getReleases( int $content_id, int $page = 1, int $limit = 20, string $version = null, $license_id = 0, $endpoint = 'N/A' ) {
		global $wpdb;

		$offset         = $limit * ( $page - 1 );
		$version_clause = $version ? " AND version='" . esc_sql( $version ) . "'" : '';

		$releases = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT 
					_release.*, 
					content.content_title, 
					UNIX_TIMESTAMP(_release.release_date) as release_unix_timestamp, 
					content.product_id, 
					content.content_type
				FROM ".DB::releases()." _release
					INNER JOIN ".DB::contents()." content ON content.content_id=_release.content_id
				WHERE 
					_release.content_id=%d {$version_clause} 
				ORDER BY _release.release_date DESC LIMIT %d, %d",
				$content_id,
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
			// To Do: Remove file_path and absolute url from response. Rather use a proxy url for direct download in dashboard.
			if ( ! $file_url ) {
				continue;
			}

			// To Do: Ensure version can't contain empty space. Force author to put non-space characters, and also programmatically remove spaces.
			// To Do: Validate the license id is associated with proper content (if not free) and vailidity is not expired.

			$release->download_url = '';
			$release->file_url     = $file_url;
			$release->file_path    = $file_path ? $file_path : null;
			$release->mime_type    = get_post_mime_type( $release->file_id );
			$release->content_url  = Contents::getPermalink( $release->product_id, $release->content_type );
			
			// Store the release in the new array
			$new_array[] = $release;
		}

		return $new_array;
	} 

	/**
	 * Get a single release. Latest one will be returned if version is not specified.
	 *
	 * @param integer $content_id
	 * @param string|null $version
	 * @return object
	 */
	public static function getRelease( int $content_id, string $version = null, $license_id = 0, $endpoint = 'N/A' ) {
		$relases = self::getReleases( $content_id, 1, 1, $version, $license_id, $endpoint );
		return ( is_array( $relases ) && ! empty( $relases ) ) ? $relases[0] : null;
	}
}