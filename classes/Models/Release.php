<?php
/**
 * Release management
 *
 * @package solidie
 */

namespace Solidie\Models;

use SolidieLib\_Array;
use SolidieLib\_String;

/**
 * Release class
 */
class Release {

	/**
	 * Get content ID by release ID
	 *
	 * @param int $release_id
	 * @param mixed $fallback
	 * @return int|null
	 */
	public static function getContentIdByReleaseId( $release_id, $fallback = null ) {
		return Field::releases()->getField( array( 'release_id' => $release_id ), 'content_id', $fallback );
	}

	/**
	 * Delete file for a single release
	 *
	 * @param int|array $release_ids Release ID or array of release IDs
	 * @return void
	 */
	public static function deleteRelease( $release_ids, $delete_release_row = true ) {

		$release_ids = _Array::getArray( $release_ids, true );
		if ( empty( $release_ids ) ) {
			return;
		}

		$ids_places = _String::getSQLImplodesPrepared( $release_ids );

		global $wpdb;
		$file_ids = $wpdb->get_col(
			"SELECT file_id FROM {$wpdb->solidie_releases} WHERE release_id IN ({$ids_places})"
		);

		// Delete file IDs from file system
		FileManager::deleteFile( $file_ids );

		// Delete release rows
		if ( $delete_release_row ) {
			foreach ( $release_ids as $id ) {
				Field::releases()->deleteField( array( 'release_id' => $id ) );
			}
		}
	}

	/**
	 * Delete releases from a specific content
	 *
	 * @param int $content_id The content ID to delete releases for
	 * @return void
	 */
	public static function deleteReleaseByContentId( $content_id ) {
		global $wpdb;
		$release_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT release_id FROM {$wpdb->solidie_releases} WHERE content_id=%d",
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
			return esc_html__( 'Content not found to release', 'solidie' );
		}

		if ( empty( $data['release_id'] ) && empty( $data['file'] ) ) {
			// First release must need uploaded file.
			// Return as both file and 
			return esc_html__( 'First release must need downloadable file', 'solidie' );;
		}
		
		$release = array(
			'version'      => $data['version'],
			'changelog'    => ( string ) ( $data['changelog'] ?? '' ),
			'content_id'   => $data['content_id'],
			'release_date' => ! empty( $data['release_date'] ) ? $data['release_date'] : gmdate('Y-m-d H:i:s')
		);

		global $wpdb;

		// Process file if exists.
		if ( ! empty( $data['file'] ) && ! empty( $data['file']['tmp_name'] ) ) {
			// Delete old file as release ID exists in the data array
			if ( ! empty( $data['release_id'] ) ) {
				self::deleteRelease( $data['release_id'], false );
			}

			// Upload new one
			$file_id = FileManager::uploadFile( $data['file'], $data['content_id'] );
			if ( ! $file_id ) {
				return esc_html__( 'Error in file saving!', 'solidie' );
			}

			// Link new one to the release
			$release['file_id'] = $file_id;
		}

		if ( empty( $data['release_id'] ) ) {
			$wpdb->insert( $wpdb->solidie_releases, $release );
		} else {
			Field::releases()->updateField(
				$release,
				array( 'release_id' => $data['release_id'] )
			);
		}

		return true;
	}

	/**
	 * Get release history. No matter what the defined version is, the order will be latest first.
	 *
	 * @param integer      $content_id The content ID to get releases for
	 * @param integer|null $page Paginated page number
	 * @param integer|null $limit Release per page
	 * @param string|null  $version Specific version to get
	 * @param int          $license_id In case license ID matters
	 * @param string       $endpoint Specific endpoint
	 * @return array
	 */
	public static function getReleases( int $content_id, int $page = 1, int $limit = 20, string $version = null, $license_id = 0, $endpoint = 'N/A' ) {

		global $wpdb;

		$offset         = $limit * ( $page - 1 );
		$version_clause = ! empty( $version ) ? $wpdb->prepare( ' AND version=%s', $version ) : '';

		$releases = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT 
					_release.*, 
					content.content_title, 
					content.content_slug, 
					UNIX_TIMESTAMP(_release.release_date) as release_date, 
					content.product_id, 
					content.content_type
				FROM {$wpdb->solidie_releases} _release
					INNER JOIN {$wpdb->solidie_contents} content ON content.content_id=_release.content_id
				WHERE 
					_release.content_id=%d {$version_clause} 
				ORDER BY _release.release_id DESC LIMIT %d, %d",
				$content_id,
				$offset,
				$limit
			),
			ARRAY_A
		);

		$new_array         = array();
		$content_permalink = Contents::getPermalink( $content_id );

		// Loop through releases and add more data like download URL
		foreach ( $releases as $release ) {
			
			$release   = _Array::castRecursive( $release );
			$file_path = get_attached_file( $release['file_id'], true );
			$mime      = get_post_mime_type( $release['file_id'] );

			$arg_payload = array(
				'release'    => $release,
				'license_id' => $license_id,
				'endpoint'   => $endpoint,
			);

			$release['download_url']      = apply_filters( 'solidie_release_download_link', FileManager::getMediaLink( 0, array( 'content_slug' => $release['content_slug'] ) ), $arg_payload );
			$release['file_name']         = $file_path ? basename( $file_path ) : null;
			$release['changelog']         = $release['changelog'] ? ( string ) $release['changelog'] : '';
			$release['content_permalink'] = $content_permalink;
			$release['mime_type']         = ! empty( $mime ) ? $mime : '';
			
			// Store the release in the new array
			$new_array[] = $release;
		}

		return $new_array;
	}

	/**
	 * Get a single release. Latest one will be returned if version is not specified.
	 *
	 * @param integer     $content_id The content ID to get single release for
	 * @param string|null $version If specific version needed
	 * @param int         $license_id License ID
	 * @param string      $endpoint Endpoint
	 * @return array
	 */
	public static function getRelease( int $content_id, string $version = null, $license_id = 0, $endpoint = 'N/A' ) {
		$relases = self::getReleases( $content_id, 1, 1, $version, $license_id, $endpoint );
		return ( is_array( $relases ) && ! empty( $relases ) ) ? $relases[0] : null;
	}

	/**
	 * Increase single release download count
	 *
	 * @param int $file_id The file ID to increase download count for
	 *
	 * @return void
	 */
	public static function increaseDownloadCount( $file_id ) {

		$release = Field::releases()->getField(
			array( 'file_id' => $file_id ),
			array( 'release_id', 'content_id' )
		);

		if ( empty( $release ) ) {
			return;
		}

		global $wpdb;

		// Increase specific release ID count
		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$wpdb->solidie_releases} SET download_count=download_count+1 WHERE release_id=%d",
				$release['release_id']
			)
		);

		// Add as popularity now
		Popularity::logDownload( $release['content_id'] );
	}
}
