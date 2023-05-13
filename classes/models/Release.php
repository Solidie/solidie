<?php

namespace AppStore\Models;

use AppStore\Base;

class Release extends Base {
	/**
	 * Specify where to store release files
	 *
	 * @var string
	 */
	private static $custom_dir = 'appstore-releases';

	/**
	 * Replacable file id to make available in upload_dir hook callback
	 *
	 * @var int
	 */
	private static $app_id = 0;

	/**
	 * Alter upload directory by hook
	 *
	 * @param string $upload
	 * @return void
	 */
	public static function custom_upload_directory( $upload ) {
		// Define the new upload directory
		$upload_dir = '/uploads/' . self::$custom_dir . '/' . self::$app_id;

		// Get the current upload directory path and URL
		$upload_path = $upload['basedir'] . $upload_dir;
		$upload_url  = $upload['baseurl'] . $upload_dir;

		// Update the upload directory path and URL
		$upload['path']   = $upload_path;
		$upload['url']    = $upload_url;
		$upload['subdir'] = $upload_dir;

		return $upload;
	}

	/**
	 * Create custom directory for release files
	 *
	 * @param int $app_id
	 * @return void
	 */
	private static function createUploadDir( $app_id ) {
		
		$wp_upload_dir = wp_upload_dir(); // Get the path and URL of the wp-uploads directory

		// Create the full path of the custom directory
		$custom_dir_path = $wp_upload_dir['basedir'] . '/' . self::$custom_dir . '/' . $app_id;
		$htaccess_path   = $wp_upload_dir['basedir'] . '/' . self::$custom_dir . '/.htaccess';

		// Create the directory if it doesn't exist
		if ( ! is_dir( $custom_dir_path ) ) {
			wp_mkdir_p( $custom_dir_path );
		}

		// Add direct file download restriction apache server.
		if ( ! file_exists( $htaccess_path ) ) {
			file_put_contents( $htaccess_path, 'deny from all' );
		}

		// To Do: Add restriction for nginx too
	}

	/**
	 * Process upload of a file using native WP methods
	 *
	 * @param int $app_id
	 * @param array $file
	 * @param string $file_title
	 * @return void
	 */
	private static function uploadFile( $app_id, array $file, string $file_title ) {
		// Store to make available in upload_dir hook handler
		self::$app_id = $app_id;

		// File id place holder
		$attachment_id = null;

		// Create necessary directory if not created already
		self::createUploadDir( $app_id );

		// Alter upload directory to custom one for release upload
		add_filter( 'upload_dir', array( __CLASS__, 'custom_upload_directory' ) );

		// Set the upload directory
		$upload_dir = wp_upload_dir()['path'];
		$file_name  = Licensing::generateRandomString( 7 ) . '-' . str_replace( '.', '', (string) microtime( true ) ) . '.' . pathinfo( $file['name'], PATHINFO_EXTENSION );
		$file_path  = $upload_dir . '/' . $file_name;
		$upload     = wp_handle_upload( $file, array( 'test_form' => false ) );

		if ( isset( $upload['file'] ) ) {
			// Create a post for the file
			$attachment = array(
				'post_mime_type' => $upload['type'],
				'post_title'     => $file_title,
				'post_content'   => '',
				'post_status'    => 'private',
				'guid'           => $upload['url']
			);
			$attachment_id = wp_insert_attachment( $attachment, $file_path );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );

			// Generate meta data for the file
			$attachment_data = wp_generate_attachment_metadata( $attachment_id, $file_path );
			wp_update_attachment_metadata( $attachment_id, $attachment_data );
		} else {
			// Error uploading the file
			error_log( var_export( $upload['error'], true ) ) ;
		}

		// Remove divertion after upload done
		remove_filter( 'upload_dir', array( __CLASS__, 'custom_upload_directory' ) );

		return $attachment_id;
	}

	/**
	 * Delete file for a single release
	 *
	 * @param int|array $release_ids Release ID or array of release IDs
	 * @return void
	 */
	public static function deleteFile( $release_ids ) {
		if ( ! is_array( $release_ids ) ) {
			$release_ids = array( $release_ids );
		}

		$implodes = implode( ',', $release_ids );
		if ( empty( $implodes ) ) {
			return;
		}

		global $wpdb;
		$file_ids = $wpdb->get_col(
			"SELECT file_id FROM " . self::table( 'releases' ) . " WHERE release_id IN (" . $implodes . ")"
		);

		if ( ! empty( $file_ids ) && is_array( $file_ids ) ) {
			// Now delete files one by one
			foreach ( $file_ids as $id ) {
				wp_delete_attachment( $id, true );
			}
		}
	}

	/**
	 * Create or update a release
	 *
	 * @param array $data
	 * @return mixed
	 */
	public static function pushRelease( array $data ) {
		$app = Apps::getAppByID( $data['app_id'] );
		if ( empty( $app ) ) {
			return _x( 'App not found to release', 'appstore', 'appstore' );
		}
		
		global $wpdb;

		// Process file if exists.
		if ( ! empty( $data['file'] ) ) {
			// Upload new one
			$file_title = $app->app_title . ' - ' . $data['version'];
			$file_id    = self::uploadFile( $data['app_id'], $data['file'], $file_title );

			if ( ! $file_id ) {
				return _x( 'Error in file saving!', 'appstore', 'appstore' );
			}

			// Delete old one
			if ( ! empty( $data['release_id'] ) ) {
				self::deleteFile( $data['release_id'] );
			}

			// Link new one to the release
			$data['file_id'] = $file_id;
		}

		if ( empty( $data['release_id'] ) ) {
			$wpdb->insert( self::table( 'releases' ), $data );
		} else {
			$wpdb->update(
				self::table( 'releases' ),
				$data,
				array(
					'release_id' => $data['release_id']
				)
			);
		}
	}

	/**
	 * Get release history. No matter what the defined version is, the order will be latest first. 
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

		// To Do: Get product title as release title instead of file title.
		$releases = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT release.*, file.post_name AS release_title, UNIX_TIMESTAMP(release.release_date) as release_unix_timestamp FROM ".self::table( 'releases' )." release
				INNER JOIN {$wpdb->posts} file ON release.file_id=file.ID
				WHERE release.app_id=%d ".$version_clause." ORDER BY release.release_date DESC LIMIT %d, %d",
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
			$release->app_url   = get_permalink( $release->app_id );
			
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