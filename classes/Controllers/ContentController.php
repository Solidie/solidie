<?php
/**
 * Content management request handler
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\Contents;
use Solidie\Models\FileManager;
use Solidie\Models\Release;

// To Do: Add three custom rules;
// finance-manager who disburse payments,
// content-reviewer who review submissions from contributors,
// and contributor who uploads their contents.

/**
 * Content manager class
 */
class ContentController {

	const PREREQUISITES = array(
		'getContentList'        => array(
			'nopriv' => true,
		),
		'createOrUpdateContent' => array(),
		'fetchReleases'         => array(),
		'versionRelease'        => array(),
		'deleteContent'         => array(),
		'getSingleContent'      => array(),
		'loadFile'              => array(
			'nopriv' => true,
		),
	);

	/**
	 * Provide content list for various area like dashboard, catalog and so on.
	 *
	 * @param array $data Request data
	 * @return void
	 */
	public static function getContentList( array $data ) {

		$content_list = Contents::getContents( $data );
		$segmentation = Contents::getContents( $data, true );

		wp_send_json_success(
			array(
				'contents'          => $content_list,
				'segmentation'      => $segmentation,
				'catalog_permalink' => Contents::getCatalogPermalink( $data['content_type'] )
			)
		);
	}

	/**
	 * Create or update content from frontend dashboard
	 *
	 * @param array $data Request data
	 * @param array $files Request files
	 *
	 * @return void
	 */
	public static function createOrUpdateContent( array $data, array $files ) {

		// To Do: Before updating, Check if the product created by current user or the user is administrator/editor or privileged

		$content_id = Contents::updateContent( $data, $files );

		if ( ! empty( $content_id ) ) {
			wp_send_json_success(
				array(
					'message' => ! empty( $data['content_id'] ) ? __( 'Saved successfully.', 'solidie' ) : __( 'Created successfully.', 'solidie' ),
					'content' => Contents::getContentByContentID( $content_id ),
				)
			);
		} else {
			wp_send_json_error( array( 'message' => __( 'Something went wrong!', 'solidie' ) ) );
		}
	}

	/**
	 * Get content release history
	 *
	 * @param array $data Request data
	 * @return void
	 */
	public static function fetchReleases( array $data ) {
		$releases = Contents::getReleases( (int) $data['content_id'] );
		wp_send_json_success( array( 'releases' => $releases ) );
	}

	/**
	 * Create or update version
	 *
	 * @param array $data Request data
	 * @param array $files Request files
	 * @return void
	 */
	public static function versionRelease( array $data, array $files ) {
		// Check if main three parameter received
		if ( empty( $data['version'] ) || empty( $data['changelog'] ) || empty( $data['content_id'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Required release data missing!', 'solidie' ) ) );
			exit;
		}

		// File is required for new release, release id will be falsy if it is new release.
		if ( empty( $data['release_id'] ) ) {
			if ( empty( $files['file'] ) || ! empty( $files['file']['error'] ) ) {
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
				'file'       => ! empty( $files['file'] ) ? $files['file'] : null,
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
	 * @param array $data Request data
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
	 * @param array $data Request data
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
		do_action( 'solidie_load_file_before', $data );
		FileManager::downloadFile( $data['file_id'] ?? 0 );
	}
}
