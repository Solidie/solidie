<?php
/**
 * File uploader functionalities
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Main;
use SolidieLib\_Array;
use SolidieLib\FileManager as SolidieLibFileManager;

/**
 * File and directory handler class
 */
class FileManager extends SolidieLibFileManager {

	/**
	 * Custom uploaded file identifier meta key
	 *
	 * @var string
	 */
	const SOLIDIE_FILE_IDENTIFIER_META_KEY = 'solidie_content_file';

	/**
	 * Custom uploaded file identifier meta key
	 *
	 * @var string
	 */
	const SOLIDIE_FILE_CLOUD_KEY = 'solidie_content_file_cloud_data';

	/**
	 * Specify where to store files
	 *
	 * @var string
	 */
	const SOLIDIE_CONTENTS_DIR = 'solidie-content-files';

	/**
	 * Replacable relapath for the content to make available in upload_dir hook callback
	 *
	 * @var string
	 */
	public static $rel_path;

	/**
	 * Alter upload directory by hook
	 *
	 * @param array $upload Dir configs
	 * @return array
	 */
	public static function customUploadDirectory( $upload ) {
		// Define the new upload directory
		$upload_dir = '/' . self::$rel_path;

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
	 * Create custom directory for files
	 *
	 * @param int $content_id Create directory for specific content, ideally job application.
	 * @param int $lesson_id The lesson ID
	 * 
	 * @return string
	 */
	private static function createUploadDir( $content_id, $lesosn_id = null ) {

		$wp_upload_dir = wp_upload_dir(); // Get the path and URL of the wp-uploads directory

		// Create the full path of the custom directory
		$rel_path        = self::SOLIDIE_CONTENTS_DIR . '/' . $content_id . ( ! empty( $lesosn_id ) ? '/' . $lesosn_id : '' );
		$custom_dir_path = $wp_upload_dir['basedir'] . '/' . $rel_path;
		$htaccess_path   = $wp_upload_dir['basedir'] . '/' . self::SOLIDIE_CONTENTS_DIR . '/.htaccess';

		// Create the directory if it doesn't exist
		if ( ! is_dir( $custom_dir_path ) ) {
			wp_mkdir_p( $custom_dir_path );
		}

		// Add direct file download restriction apache server.
		if ( ! file_exists( $htaccess_path ) ) {
			file_put_contents( $htaccess_path, 'deny from all' );
		}

		return $rel_path;
	}

	/**
	 * Get dir path for speficic content
	 *
	 * @param int $content_id The content ID to get directory for
	 * @param int $lesson_id To delete only the lesson directory
	 *
	 * @return string
	 */
	public static function getContentDir( $content_id, $lesson_id = null ) {
		if ( empty( $content_id ) ) {
			$content_id = 0;
		}

		$wp_upload_dir = wp_upload_dir();
		return $wp_upload_dir['basedir'] . '/' . self::SOLIDIE_CONTENTS_DIR . '/' . $content_id . ( ! empty( $lesson_id ) ? '/' . $lesson_id : '' );
	}

	/**
	 * Process upload of a file using native WP methods
	 *
	 * @param array $file File array with size, tmp_name etc.
	 * @param int   $content_id The content/application ID to upload file for
	 * @param int   $lesson_id The lesson id ID to upload file for
	 * 
	 * @return int|null
	 */
	public static function uploadFile( $file, $content_id, $lesosn_id = null ) {

		$attachment_id = null;
		$upload        = null;
		$cloud         = null;
		$is_cloud      = AdminSetting::get( 'do_space_enable' );

		// Alter the name and handle upload
		if ( $is_cloud ) {
			$cloud = ( new CloudStorage() )->uploadFile( $file, sprintf( '/%s/%s/%d/', self::SOLIDIE_CONTENTS_DIR, date( 'Y-m' ), $content_id ) );
			if ( ! empty( $cloud ) && is_array( $cloud ) ) {
				$upload = array(
					'file'      => false,
					'url'       => $cloud['file_url'],
					'type'      => $cloud['mime_type'],
					'cloud_key' => $cloud['file_id']
				);
			}
		} else {

			// Create necessary directory if not created already
			self::$rel_path = self::createUploadDir( $content_id, $lesosn_id );

			// Add filters
			add_filter( 'upload_dir', array( __CLASS__, 'customUploadDirectory' ) );

			$upload = wp_handle_upload( $file, array( 'test_form' => false ) );
		}

		if ( is_array( $upload ) && isset( $upload['file'] ) ) {
			// Create a post for the file
			$attachment    = array(
				'post_mime_type' => $upload['type'],
				'post_title'     => $file['name'],
				'post_content'   => '',
				'post_status'    => 'private',
				'guid'           => $upload['url'],
			);
			$attachment_id = wp_insert_attachment( $attachment, $upload['file'] );
			require_once ABSPATH . 'wp-admin/includes/image.php';

			update_post_meta( $attachment_id, self::SOLIDIE_FILE_IDENTIFIER_META_KEY, true );

			// Store the cloud file key in attachment meta data
			if ( $is_cloud ) {
				
				$meta_data = array(
					'file'     => str_replace( ' ', '-', sanitize_text_field( $file['name'] ) ),
					'filesize' => $file['size'],
					'sizes'    => array()
				);
				
				update_post_meta( $attachment_id, self::SOLIDIE_FILE_CLOUD_KEY, $cloud );
				update_post_meta( $attachment_id, '_wp_attachment_metadata', $meta_data );
				update_post_meta( $attachment_id, '_wp_attached_file', $meta_data['file'] );

			} else {
				// Generate meta data for the file
				$attachment_data = wp_generate_attachment_metadata( $attachment_id, $upload['file'] );
				wp_update_attachment_metadata( $attachment_id, $attachment_data );
			}
		}
		
		// Remove filters
		remove_filter( 'upload_dir', array( __CLASS__, 'customUploadDirectory' ) );

		return $attachment_id;
	}

	/**
	 * Get file information by ID
	 *
	 * @param int $file_id The file ID to get info of
	 *
	 * @return array
	 */
	public static function getFileInfo( $file_id ) {

		$mime = get_post_mime_type( $file_id );

		return array(
			'file_id'   => $file_id,
			'file_url'  => self::getMediaLink( $file_id ),
			'file_name' => basename( get_attached_file( $file_id, true ) ),
			'mime_type' => ! empty( $mime ) ? $mime : '',
		);
	}

	/**
	 * Extract file IDs from html content
	 *
	 * @param string $html
	 * @return array
	 */
	public static function getFileIDsFromContent( $html ) {

		$ids = array();

		// Define the regex pattern to match data-solidie-file-id attributes
		$pattern = '/data-solidie-file-id\s*=\s*["\']([^"\']+)["\']/';
		
		// Perform the regex match
		preg_match_all( $pattern, ( is_string( $html ) ? $html : '' ), $matches );
		
		// Extract the matched IDs
		if ( ! empty( $matches[1] ) ) {
			$ids = $matches[1];
		}

		return array_unique( array_map( 'intval', $ids ) );
	}

	/**
	 * Parse files IDs from content description, lesson and delete them
	 *
	 * @param string $html
	 * @return void
	 */
	public static function deleteFilesFromContent( $html ) {
		self::deleteFile( self::getFileIDsFromContent( $html ) );
	}

	/**
	 * Delete removed media by ID that are no more in updated lesson
	 *
	 * @param string $old_html
	 * @param string $new_html
	 * @param mixed $name
	 * @return void
	 */
	public static function deleteRemovedFilesFromContent( $old_html, $new_html, $content_id, $lesson_id = 0 ) {

		// Get the IDs that exist in old content, but not in updated
		$existing_ids = FileManager::getFileIDsFromContent( $old_html );
		$updated_ids  = FileManager::getFileIDsFromContent( $new_html );
		$removed_ids  = array_diff( $existing_ids, $updated_ids );

		// Get the IDs that were logged, but the content/lesson was not saved with them
		// Then merge with removed IDs to delete all at once
		$logged_ids   = ( new AttachmentLog( $content_id, $lesson_id ) )->getMediaAttachmentLog( true );
		$unsaved_ids  = array_diff( $logged_ids, $updated_ids );
		$removed_ids  = array_unique( array_merge( $removed_ids, $unsaved_ids ) );
		
		FileManager::deleteFile( $removed_ids );
	}

	/**
	 * Generate restricted file link to access application files
	 *
	 * @param integer $file_id  File ID to generate URL for
	 * @param array   $add_args Additional arguments to combine with download URL
	 *
	 * @return string
	 */
	public static function getMediaLink( int $file_id, array $add_args = array() ) {

		if ( apply_filters( 'solidie_is_file_free', $file_id, true ) ) {
			$cloud = _Array::getArray( get_post_meta( $file_id, self::SOLIDIE_FILE_CLOUD_KEY, true ) );
			if ( ! empty( $cloud['file_url'] ) && false === strpos( ( $cloud['mime_type'] ?? '' ), 'audio' ) ) {
				return $cloud['file_url'];
			}
		}

		$ajaxurl      = admin_url( 'admin-ajax.php' );
		$nonce_action = '_solidie_' . str_replace( '-', '_', gmdate( 'Y-m-d' ) );
		$nonce        = wp_create_nonce( $nonce_action );

		$args = array(
			'action'  => Main::$configs->app_id . '_loadFile',
			'file_id' => $file_id,
			// 'nonce'        => $nonce,
			// 'nonce_action' => $nonce_action,
		);

		return add_query_arg( array_merge( $args, $add_args ), $ajaxurl );
	}

	/**
	 * Process file downloading
	 *
	 * @param int $file_id The file ID to download
	 *
	 * @return void
	 */
	public static function downloadFile( $file_id ) {

		$path = ! empty( $file_id ) ? get_attached_file( $file_id ) : null;
		if ( empty( $path ) ) {
			http_response_code( 404 );
			exit;
		}

		do_action( 'solidie_load_file_before', $file_id );
		Release::increaseDownloadCount( $file_id );

		$cloud     = _Array::getArray( get_post_meta( $file_id, self::SOLIDIE_FILE_CLOUD_KEY, true ) );
		$meta      = _Array::getArray( maybe_unserialize( get_post_meta( $file_id, '_wp_attachment_metadata', true ) ) );
		$read_path = $cloud['file_url'] ?? $path;
		$mime_type = $cloud['mime_type'] ?? mime_content_type( $path );
		$file_size = $meta['filesize'] ?? filesize( $path );

		// Set the headers for caching
		$last_modified = gmdate( 'D, d M Y H:i:s', strtotime( get_post_field( 'post_modified', $file_id ) )  ) . ' GMT';
		
		header( 'Last-Modified: ' . $last_modified );
		header( 'Cache-Control: public, max-age=86400' );
		header( 'Expires: 86400' );
		header( 'Content-Type: ' . $mime_type . '; charset=utf-8' );
		header( 'Content-Length: ' . $file_size );
		header( 'Content-Disposition: attachment; filename=' . basename( $path ) );

		readfile( $read_path );

		exit;
	}

	/**
	 * Delete file middleare to delete cloud file if it is
	 *
	 * @param int|array $file_id
	 * @return void
	 */
	public static function deleteFile( $file_ids ) {

		$file_ids    = _Array::getArray( $file_ids, true );
		$cloud_store = new CloudStorage();

		foreach ( $file_ids as $file_id ) {
	
			$cloud = get_post_meta( $file_id, self::SOLIDIE_FILE_CLOUD_KEY, true );

			if ( empty( $cloud ) || ! is_array( $cloud ) ) {
				parent::deleteFile( $file_id );
			}

			// Delete from cloud if it is not stored locally
			if ( ! empty( $cloud['file_id'] ) ) {
				$cloud_store->deleteFile( $cloud['file_id'] );
			}
		}
	}
}
