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
	);

	/**
	 * Provide content list for various area like dashboard, catalog and so on.
	 *
	 * @return void
	 */
	public static function getContentList( array $data ) {
		$content_list = Contents::getContents( $data );
		wp_send_json_success( array( 'contents' => $content_list ) );
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
}
