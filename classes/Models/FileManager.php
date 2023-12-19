<?php
/**
 * File uploader functionalities
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Main;

/**
 * File and directory handler class
 */
class FileManager {

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
	const SOLIDIE_COTNENTS_DIR = 'solidie-content-files';

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
	 * @return string
	 */
	private static function createUploadDir( $content_id ) {

		$wp_upload_dir = wp_upload_dir(); // Get the path and URL of the wp-uploads directory

		// Create the full path of the custom directory
		$rel_path        = self::SOLIDIE_COTNENTS_DIR . '/' . $content_id;
		$custom_dir_path = $wp_upload_dir['basedir'] . '/' . $rel_path;
		$htaccess_path   = $wp_upload_dir['basedir'] . '/' . self::SOLIDIE_COTNENTS_DIR . '/.htaccess';

		// Create the directory if it doesn't exist
		if ( ! is_dir( $custom_dir_path ) ) {
			wp_mkdir_p( $custom_dir_path );
		}

		// Add direct file download restriction apache server.
		if ( ! file_exists( $htaccess_path ) ) {
			file_put_contents( $htaccess_path, 'deny from all' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_file_put_contents
		}

		// To Do: nginx doesn't restrict per directory, rather show instruction in dashboard how to restrict directory.

		return $rel_path;
	}

	/**
	 * Get dir path for speficic content
	 *
	 * @param int $content_id The content ID to get directory for
	 * @return string
	 */
	public static function getContentDir( $content_id ) {
		if ( empty( $content_id ) ) {
			$content_id = 0;
		}

		$wp_upload_dir = wp_upload_dir();
		return $wp_upload_dir['basedir'] . '/' . self::SOLIDIE_COTNENTS_DIR . '/' . $content_id;
	}

	/**
	 * Process upload of a file using native WP methods
	 *
	 * @param int    $content_id The content/application ID to upload file for
	 * @param array  $file       File array with size, tmp_name etc.
	 * @param string $file_title Custom file title to use
	 * @return int|null
	 */
	public static function uploadFile( $content_id, array $file, string $file_title ) {

		// File id place holder
		$attachment_id = null;

		// Create necessary directory if not created already
		self::$rel_path = self::createUploadDir( $content_id );

		// Add filters
		add_filter( 'upload_dir', array( __CLASS__, 'customUploadDirectory' ) );

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
			$attachment    = array(
				'post_mime_type' => $upload['type'],
				'post_title'     => $file_title,
				'post_content'   => '',
				'post_status'    => 'private',
				'guid'           => $upload['url'],
			);
			$attachment_id = wp_insert_attachment( $attachment, $file_path );
			require_once ABSPATH . 'wp-admin/includes/image.php';

			// Generate meta data for the file
			$attachment_data = wp_generate_attachment_metadata( $attachment_id, $file_path );
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
	 * Find file object in array and assign dynamic file URL
	 *
	 * @param array $contents The content array to assign dynamic url to
	 * @return array
	 */
	public static function applyDynamics( array $contents ) {
		// Loop through array contents
		foreach ( $contents as $index => $content ) {

			if ( is_array( $content ) ) {
				if ( isset( $content['file_id'], $content['file_url'] ) ) {
					// Assign dynamic url replace for host change support
					$contents[ $index ]['file_url'] = self::getMediaPermalink( $content['file_id'] );
				}

				$contents[ $index ] = self::applyDynamics( $content );
			}
		}

		return $contents;
	}

	/**
	 * Delete WP files
	 *
	 * @param int|array $file_id File ID or array of files IDs
	 * @return void
	 */
	public static function deleteFile( $file_id ) {
		if ( ! is_array( $file_id ) ) {
			$file_id = array( $file_id );
		}

		// Loop through file IDs and delete
		foreach ( $file_id as $id ) {
			if ( ! empty( $id ) && is_numeric( $id ) ) {
				wp_delete_attachment( $id, true );
			}
		}
	}

	/**
	 * Delete directory
	 *
	 * @param string $dir Dir path to delete including files and sub folders
	 * @return bool
	 */
	public static function deleteDirectory( string $dir ) {
		if ( ! is_dir( $dir ) ) {
			return false;
		}

		$files = glob( $dir . '/*' );
		foreach ( $files as $file ) {
			is_dir( $file ) ? self::deleteDirectory( $file ) : unlink( $file );
		}

		return rmdir( $dir );
	}

	/**
	 * Organize uploaded files hierarchy
	 *
	 * @param array $file_s The file holder array to organize
	 * @return array
	 */
	public static function organizeUploadedHierarchy( array $file_s ) {
		$new_array = array();

		$columns = array( 'name', 'size', 'type', 'tmp_name', 'error' );

		// Loop through data types like name, tmp_name etc.
		foreach ( $columns as $column ) {

			if ( ! isset( $file_s[ $column ] ) ) {
				continue;
			}

			// Loop through data
			foreach ( $file_s[ $column ] as $post_name => $data_list ) {

				if ( ! isset( $new_array[ $post_name ] ) ) {
					$new_array[ $post_name ] = array();
				}

				if ( ! is_array( $data_list ) ) {
					$new_array[ $post_name ][ $column ] = $data_list;
					continue;
				}

				foreach ( $data_list as $index => $data ) {
					if ( ! isset( $new_array[ $post_name ][ $index ] ) ) {
						$new_array[ $post_name ][ $index ] = array();
					}

					$new_array[ $post_name ][ $index ][ $column ] = $data;
				}
			}
		}

		return $new_array;
	}

	/**
	 * Generate restricted file link to access application files
	 *
	 * @param integer $file_id  File ID to generate URL for
	 * @param array   $add_args Additional arguments to combine with download URL
	 *
	 * @return string
	 */
	public static function getMediaPermalink( int $file_id, array $add_args = array() ) {

		$ajaxurl      = admin_url( 'admin-ajax.php' );
		$nonce_action = '_solidie_' . str_replace( '-', '_', gmdate( 'Y-m-d' ) );
		$nonce        = wp_create_nonce( $nonce_action );

		$args = array(
			'action'       => Main::$configs->app_id . '_loadFile',
			'file_id'      => $file_id,
			'nonce'        => $nonce,
			'nonce_action' => $nonce_action,
		);

		$args = array_merge( $args, $add_args );
		$url  = add_query_arg( $args, $ajaxurl );

		return apply_filters( 'solidie_media_permalink', $url );
	}

	/**
	 * List files in a directory
	 *
	 * @param string $directory The directory to list files in
	 * @return array
	 */
	public static function getFilesInDirectory( string $directory ) {

		$files = array();

		// Check if the directory exists
		if ( is_dir( $directory ) ) {
			$iterator = new \DirectoryIterator( $directory );

			foreach ( $iterator as $file_info ) {
				if ( $file_info->isFile() ) {
					$filename           = pathinfo( $file_info->getFilename(), PATHINFO_FILENAME );
					$files[ $filename ] = $file_info->getPathname();
				}
			}
		}

		return $files;
	}
}
