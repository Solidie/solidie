<?php
/**
 * File uploader functionalities
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Main;
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

		// File id place holder
		$attachment_id = null;

		// Create necessary directory if not created already
		self::$rel_path = self::createUploadDir( $content_id, $lesosn_id );

		// Add filters
		add_filter( 'upload_dir', array( __CLASS__, 'customUploadDirectory' ) );

		// Alter the name and handle upload
		$upload = wp_handle_upload( $file, array( 'test_form' => false ) );

		if ( isset( $upload['file'] ) ) {
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

			// Generate meta data for the file
			$attachment_data = wp_generate_attachment_metadata( $attachment_id, $upload['file'] );
			wp_update_attachment_metadata( $attachment_id, $attachment_data );
			update_post_meta( $attachment_id, self::SOLIDIE_FILE_IDENTIFIER_META_KEY, true );
		} else {
			$attachment_id = null;
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
		return array(
			'file_id'   => $file_id,
			'file_url'  => self::getMediaLink( $file_id ),
			'file_name' => basename( get_attached_file( $file_id ) ),
			'mime_type' => get_post_mime_type( $file_id ),
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

		$mime_type = mime_content_type( $path );
		$file_size = filesize( $path );

		// Set the headers for caching
		$last_modified = gmdate( 'D, d M Y H:i:s', filemtime( $path ) ) . ' GMT';
		$etag          = md5_file( $path );

		header( 'Last-Modified: ' . $last_modified );
		header( 'ETag: ' . $etag );
		header( 'Cache-Control: public, max-age=86400' );
		header( 'Expires: 86400' );

		// Check if the file has been modified
		if ( isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) && strtotime( sanitize_text_field( wp_unslash( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) ) ) >= filemtime( $path ) ) {
			header( 'HTTP/1.1 304 Not Modified' );
			exit;
		}

		if ( isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) && trim( sanitize_text_field( wp_unslash( $_SERVER['HTTP_IF_NONE_MATCH'] ) ) ) === $etag ) {
			header( 'HTTP/1.1 304 Not Modified' );
			exit;
		}

		header( 'Content-Type: ' . $mime_type . '; charset=utf-8' );
		header( 'Content-Length: ' . $file_size );

		// if ( ! in_array( strtolower( explode( '/', $mime_type )[0] ) , array( 'audio', 'video', 'image' ) ) ) {
			header( 'Content-Disposition: attachment; filename=' . basename( $path ) );
		// }

		readfile( $path );
		exit;
	}
}
