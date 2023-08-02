<?php

namespace Solidie\Store\Models;

use Solidie\Store\Helpers\Crypto;
use Solidie\Store\Main;
use Solidie\Store\Setup\RestAPI;

class Release extends Main {
	/**
	 * Mime types that can be enabled in setting
	 *
	 * @var array
	 */
	public static $mimes = array(
		'zip' => 'application/zip',
		'apk' => 'application/vnd.android.package-archive', 
		'exe' => 'application/x-msdownload', 
		'msi' => 'application/x-msi',
		'deb' => 'application/x-debian-package',
		'rpm' => 'application/x-rpm',
		'pkg' => 'application/octet-stream',
		'dmg' => 'application/x-apple-diskimage',
	);

	/**
	 * Mime types that are enabled by default
	 *
	 * @var array
	 */
	public static $default_mimes = array( 'zip' );

	/**
	 * Release file indentifier meta key
	 *
	 * @var string
	 */
	public static $release_meta_key = 'solidie_is_release_file';

	/**
	 * Option key to set specific mime type to upload release files
	 *
	 * @var string
	 */
	public static $mime_option_key = 'solidie_allowed_mime_types';

	/**
	 * Specify where to store release files
	 *
	 * @var string
	 */
	public static $custom_dir = 'solidie-releases';

	/**
	 * Replacable file id to make available in upload_dir hook callback
	 *
	 * @var int
	 */
	public static $content_id = 0;

	/**
	 * Alter upload directory by hook
	 *
	 * @param string $upload
	 * @return void
	 */
	public static function custom_upload_directory( $upload ) {
		// Define the new upload directory
		$upload_dir = '/' . self::$custom_dir . '/' . self::$content_id;

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
	 * Add support for release file types
	 *
	 * @param array $mimes
	 * @return array
	 */
	public static function upload_mimes( $existing_mimes ) {
		// Get enabled mimes from settings
		$mimes = get_option( self::$mime_option_key );
		if ( empty( $mimes ) || ! is_array( $mimes ) ) {
			// Set default if settings is not saved yet
			$mimes = self::$default_mimes;
		}

		// Get all allowed types
		$allowed_types = self::getAllowedMimes();

		// Loop through setting mimes and set to alter if it is still available in allowed types
		foreach ( $mimes as $mime ) {
			if ( isset( $allowed_types[ $mime ] ) ) {
				$existing_mimes[ $mime ] = $allowed_types[ $mime ];
			}
		}
		
    	return $existing_mimes;
	}

	/**
	 * Get allowed mime types
	 *
	 * @return array
	 */
	public static function getAllowedMimes() {
		return apply_filters( 'solidie_allowed_mime_types', self::$mimes );
	}

	/**
	 * Create custom directory for release files
	 *
	 * @param int $content_id
	 * @return void
	 */
	private static function createUploadDir( $content_id ) {
		
		$wp_upload_dir = wp_upload_dir(); // Get the path and URL of the wp-uploads directory

		// Create the full path of the custom directory
		$custom_dir_path = $wp_upload_dir['basedir'] . '/' . self::$custom_dir . '/' . $content_id;
		$htaccess_path   = $wp_upload_dir['basedir'] . '/' . self::$custom_dir . '/.htaccess';

		// Create the directory if it doesn't exist
		if ( ! is_dir( $custom_dir_path ) ) {
			wp_mkdir_p( $custom_dir_path );
		}

		// Add direct file download restriction apache server.
		if ( ! file_exists( $htaccess_path ) ) {
			file_put_contents( $htaccess_path, 'deny from all' );
		}

		// To Do: nginx doesn't restrict per directory, rather show instruction in dashboard how to restrict directory.
	}

	/**
	 * Process upload of a file using native WP methods
	 *
	 * @param int $content_id
	 * @param array $file
	 * @param string $file_title
	 * @return void
	 */
	private static function uploadFile( $content_id, array $file, string $file_title ) {
		// Store to make available in upload_dir hook handler
		self::$content_id = $content_id;

		// File id place holder
		$attachment_id = null;

		// Create necessary directory if not created already
		self::createUploadDir( $content_id );

		// Add filters
		add_filter( 'upload_dir', array( __CLASS__, 'custom_upload_directory' ) );
		add_filter( 'upload_mimes', array( __CLASS__, 'upload_mimes' ) );

		// Set the upload directory
		$upload_dir = wp_upload_dir()['path'];
		$file_title = preg_replace( '/-+/', '-', str_replace( ' ', '', $file_title ) );
		$file_name  = $file_title . '.' . pathinfo( $file['name'], PATHINFO_EXTENSION );
		$file_path  = $upload_dir . '/' . $file_name;

		// Alter the name and handle upload
		$file['name'] = $file_name;
		$upload       = wp_handle_upload( $file, array( 'test_form' => false ) );

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
			update_post_meta( $attachment_id, self::$release_meta_key, true );
		} else {
			// Error uploading the file
			error_log( __FILE__ . ' ' . __LINE__ . ' ' . var_export( $upload['error'], true ) ) ;
		}

		// Remove filters
		remove_filter( 'upload_dir', array( __CLASS__, 'custom_upload_directory' ) );
		remove_filter( 'upload_mimes', array( __CLASS__, 'upload_mimes' ) );

		return $attachment_id;
	}

	/**
	 * Delete file for a single release
	 *
	 * @param int|array $release_ids Release ID or array of release IDs
	 * @return void
	 */
	private static function deleteFile( $release_ids ) {
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
		$content = Contents::getContentByContentID( $data['content_id'] );
		if ( empty( $content ) ) {
			return _x( 'Content not found to release', 'solidie', 'solidie' );
		}
		
		$release = array(
			'version'   => $data['version'],
			'changelog' => $data['changelog'],
			'content_id'    => $data['content_id'],
		);

		global $wpdb;

		// Process file if exists.
		if ( ! empty( $data['file'] ) ) {
			// Delete old one
			if ( ! empty( $data['release_id'] ) ) {
				self::deleteFile( $data['release_id'] );
			}

			// Upload new one
			$file_id = self::uploadFile( $data['content_id'], $data['file'], $content->content_name . ' - ' . $data['version'] );
			if ( ! $file_id ) {
				return _x( 'Error in file saving!', 'solidie', 'solidie' );
			}

			// Link new one to the release
			$release['file_id'] = $file_id;
		}

		if ( empty( $data['release_id'] ) ) {
			$wpdb->insert( self::table( 'releases' ), $release );
		} else {
			$wpdb->update(
				self::table( 'releases' ),
				$release,
				array(
					'release_id' => $data['release_id']
				)
			);
		}
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
				"SELECT _release.*, product.post_title AS content_name, UNIX_TIMESTAMP(_release.release_date) as release_unix_timestamp, content.product_id, content.content_type
				FROM ".self::table( 'releases' )." _release
				INNER JOIN ".self::table('contents')." content ON content.content_id=_release.content_id
				INNER JOIN {$wpdb->posts} product ON content.product_id=product.ID
				WHERE _release.content_id=%d ".$version_clause." ORDER BY _release.release_date DESC LIMIT %d, %d",
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

			$release->download_url = get_home_url() . RestAPI::API_PATH . '/?download=' . urlencode( Crypto::encrypt( $release->content_id . ' ' . $license_id . ' ' . time() . ' ' . $endpoint . ' ' . $release->version ) ); // Empty license id means it's free t download. It will be checked during download.
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