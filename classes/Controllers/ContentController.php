<?php

namespace Solidie\Controllers;

use Solidie\Models\Contents;
use Solidie\Models\Release;
use Solidie\Models\Sale;
use Solidie\Models\Store;

// To Do: Add three custom rules; 
// finance-manager who disburse payments, 
// content-reviewer who review submissions from contributors, 
// and contributor who uploads their contents.

class ContentController {

	const PREREQUISITES = array(
		'getContentList' => array(
			'nopriv' => true
		),
		'createOrUpdateContent' => array(
		),
		'fetchReleases' => array(),
		'versionRelease' => array(),
		'deleteContent' => array(),
		'getSingleContent' => array(),
		'loadFile' => array(),
	);

	/**
	 * Provide content list for various area like dashboard, catalog and so on.
	 *
	 * @return void
	 */
	public static function getContentList( array $data ) {
		$content_list = Contents::getContents( $data );
		$segmentation = ! empty( $data['segmentation'] ) ? Contents::getContents( $data, true ) : null;

		wp_send_json_success( array( 
			'contents' => $content_list,
			'segmentation' => $segmentation
		) );
	}

	/**
	 * Create or update content from frontend dashboard
	 *
	 * @param $data Request data
	 * @param $files Request files
	 * 
	 * @return void
	 */
	public static function createOrUpdateContent( array $data, array $files ) {

		// To Do: Before updating, Check if the product created by current user or the user is administrator/editor or privileged

		$content_id = Contents::updateContent( $data, $files );

		if ( ! empty( $content_id ) ) {
			wp_send_json_success();
		} else {
			wp_send_json_error( array( 'message' => __( 'Something went wrong!', 'solidie' ) ) );
		}
	}

	/**
	 * Get content release history
	 *
	 * @return void
	 */
	public static function fetchReleases( array $data ) {
		$releases = Contents::getReleases( (int) $data['content_id'] );
		wp_send_json_success( array( 'releases' => $releases ) );
	}

	/**
	 * Create or update version
	 *
	 * @return void
	 */
	public static function versionRelease( array $data ) {
		// Check if main three parameter received
		if ( empty( $data['version'] ) || empty( $data['changelog'] ) || empty( $data['content_id'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Required release data missing!', 'solidie' ) ) );
			exit;
		}

		// File is required for new release, release id will be falsy if it is new release.
		if ( empty( $data['release_id'] ) ) {
			if ( empty( $_FILES['file'] ) || ! empty( $_FILES['file']['error'] ) ) {
				wp_send_json_error( array( 'message' => __( 'Valid file is required for new release!', 'solidie' ) ) );
				exit;
			}
		}

		// To Do: Check if current user can create/update release for the content

		$error_message = Release::pushRelease(
			array(
				'version'    => $data['version'],
				'changelog'  => $data['changelog'],
				'content_id' => $data['content_id'],
				'release_id' => ! empty( $data['release_id'] ) ? (int) $data['release_id'] : 0,
				'file'       => ! empty( $_FILES['file'] ) ? $_FILES['file'] : null
			),
			false
		);

		if ( true === $error_message ) {
			wp_send_json_success();
		} else {
			wp_send_json_error( array( 'message' => $error_message ) );
		}
	}

	/**
	 * Delete content
	 *
	 * @param array $data
	 * @return void
	 */
	public static function deleteContent( array $data ) {
		// To Do: Check if the user is authorized to delete the content
		Contents::deleteContent( (int) $data['content_id'] ?? 0 );
		wp_send_json_success();
	}

	/**
	 * Get single content for both single view and edit
	 *
	 * @param array $data
	 * @return void
	 */
	public static function getSingleContent( array $data ) {

		if ( ! empty( $data['content_slug'] ) ) {
			$data['content_id'] = Contents::getContentIdBySlug( $data['content_slug'] );
		}

		$content = Contents::getContentByContentID( (int) $data['content_id'] ?? 0, null, false );
		if ( ! empty( $content ) ) {
			wp_send_json_success( array( 'content' => $content ) );
		} else {
			wp_send_json_error( array( 'message' => __( 'Content not found', 'solidie' ) ) );
		}
	}

	/**
	 * Load file
	 *
	 * @param array $data Request data
	 * @return void
	 */
	public static function loadFile( array $data ) {
		$file_id = $data['file_id'] ?? 0;
		$path    = get_attached_file( $file_id );

		if ( empty( $path ) || ! is_readable( $path ) ) {
			http_response_code( 404 );
			exit;
		}

		$mime_type = mime_content_type( $path );
		$file_size = filesize( $path );

		// Set the headers for caching
		$last_modified = gmdate( 'D, d M Y H:i:s', filemtime( $path ) ) . ' GMT';
		$etag          = md5_file( $path );

		header('Last-Modified: ' . $last_modified );
		header('ETag: ' . $etag );
		header('Cache-Control: public, max-age=604800'); // Set the caching time in seconds (e.g., 1 week)
		header( 'Expires: 604800' );

		// Check if the file has been modified
		if ( isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) && strtotime( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) >= filemtime( $path ) ) {
			header('HTTP/1.1 304 Not Modified');
			exit;
		}

		if ( isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) && trim( $_SERVER['HTTP_IF_NONE_MATCH'] ) === $etag ) {
			header('HTTP/1.1 304 Not Modified');
			exit;
		}

		header( 'Content-Type: ' . $mime_type . '; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=' . basename( $path ) );
		header( 'Content-Length: ' . $file_size );
		
		readfile( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_readfile
		exit;
	}
}
