<?php
/**
 * Content management request handler
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\AdminSetting;
use Solidie\Models\Contents;
use Solidie\Models\FileManager;
use Solidie\Models\Reaction;
use Solidie\Models\Release;
use Solidie\Models\User;

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
		'updateContentSlug'     => array(),
		'deleteContent'         => array(),
		'getSingleContent'      => array(
			'nopriv' => true,
		),
		'loadFile'              => array(
			'nopriv' => true,
		),
		'reactToContent' => array(
		),
		'fetchReleases' => array(
		),
		'updateAppRelease' => array(
		),
		'deleteAppRelease' => array(
		),
	);

	/**
	 * Provide content list for various area like dashboard, gallery and so on.
	 *
	 * @param array $filters Content filter arguments
	 * @param bool  $is_contributor_inventory Whether it is frontend contributor dashboard
	 * @return void
	 */
	public static function getContentList( array $filters, bool $is_contributor_inventory = false ) {

		if ( $is_contributor_inventory ) {
			$filters['contributor_id'] = get_current_user_id();
		}

		$content_list = Contents::getContents( $filters );
		$segmentation = Contents::getContents( $filters, true );

		wp_send_json_success(
			array(
				'contents'          => $content_list,
				'segmentation'      => $segmentation,
				'gallery_permalink' => Contents::getGalleryPermalink( $filters['content_type'] ),
			)
		);
	}

	/**
	 * Create or update content from frontend dashboard
	 *
	 * @param array $content Content data
	 * @param array $thumbnail Thumbnail file
	 * @param array $sample_images Sample image/video files
	 * @param array $sample_image_ids Existing sample image IDs to delete removed ones
	 * @param array $downloadable_file Main downloadable file
	 * @param array $preview Preview file
	 * @return void
	 */
	public static function createOrUpdateContent( array $content, array $thumbnail = array(), array $sample_images = array(), array $sample_image_ids = array(), array $downloadable_file = array(), array $preview = array() ) {

		// If it is edit, make sure the user is privileged to.
		if ( ! empty( $content['content_id'] ) ) {
			self::contentAccessCheck( $content['content_id'], get_current_user_id() );
		}

		$files = compact(
			'thumbnail',
			'sample_images',
			'downloadable_file',
			'preview',
			'sample_image_ids'
		);

		$content_id = Contents::updateContent( $content, $files );

		if ( ! empty( $content_id ) ) {
			wp_send_json_success(
				array(
					'message' => ! empty( $content['content_id'] ) ? esc_html__( 'Saved successfully.', 'solidie' ) : esc_html__( 'Created successfully.', 'solidie' ),
					'content' => Contents::getContentByContentID( $content_id ),
				)
			);
		} else {
			wp_send_json_error( array( 'message' => esc_html__( 'Something went wrong!', 'solidie' ) ) );
		}
	}

	/**
	 * Update content slug
	 *
	 * @param integer $content_id The content ID to update slug for
	 * @param string  $content_slug The content slug to set
	 * @return void
	 */
	public static function updateContentSlug( int $content_id, string $content_slug ) {

		self::contentAccessCheck( $content_id, get_current_user_id() );

		$new_slug = Contents::setContentSlug( $content_id, $content_slug );
		wp_send_json_success(
			array(
				'content_permalink' => Contents::getPermalink( $content_id ),
				'content_slug'      => $new_slug,
			)
		);
	}

	/**
	 * Delete content
	 *
	 * @param int $content_id The content ID to delete by
	 * @return void
	 */
	public static function deleteContent( int $content_id ) {

		self::contentAccessCheck( $content_id, get_current_user_id() );

		Contents::deleteContent( $content_id );
		wp_send_json_success();
	}

	/**
	 * Get single content for both single view and inventory screen.
	 * Conntent slug will be provided if it is single screen.
	 * Otherwise content ID will be provided if called from editor.
	 *
	 * @param string $content_slug The content slug to edit by
	 * @param int    $content_id The content to get content by
	 * @param bool   $is_editor Whether it is in editor request
	 * 
	 * @return void
	 */
	public static function getSingleContent( string $content_slug = '', int $content_id = 0, bool $is_editor = false ) {

		// Get the content ID by slug if slug is not empty
		if ( ! empty( $content_slug ) ) {
			$content_id = Contents::getContentIdBySlug( $content_slug );
		}

		// Now get the content by content ID
		$content = $content_id ? Contents::getContentByContentID( $content_id, null, false ) : null;
		

		if ( empty( $content ) ) {
			wp_send_json_error( array( 'message' => esc_html__( 'Content not found', 'solidie' ) ) );
			exit;
		}

		// If editor, make sure the autor requested, or the admin who can do anything
		if ( $is_editor ) {
			self::contentAccessCheck( $content['content_id'], get_current_user_id() );
		}

		$feedback_settings = AdminSetting::getFeedbackSettings( $content['content_type'] );

		// Get contributor info
		if ( $feedback_settings['contributor'] ) {
			$content['contributor'] = User::getUserData( $content['contributor_id'] );
		}

		$content['reactions'] = ( object ) Reaction::getStats( $content_id, get_current_user_id() );

		// Determine free download label and description
		$free_label = __( 'Free', 'solidie' );
		$free_desc  = __( 'This content is eligible to download for free', 'solidie' );
		
		$saved_label = AdminSetting::get( 'general.free_download_label' );
		if ( ! empty( $saved_label ) ) {
			$free_label = $saved_label;
		}

		$saved_desc = AdminSetting::get( 'general.free_download_description' );
		if ( ! empty( $saved_desc ) ) {
			$free_desc = $saved_desc;
		}
		
		wp_send_json_success(
			array(
				'content'                   => $content,
				'free_download_label'       => apply_filters( 'solidie_free_download_label', $free_label, $content ),
				'free_download_description' => apply_filters( 'solidie_free_download_description', $free_desc, $content ),
			)
		);
	}

	/**
	 * Add content access checker
	 *
	 * @param int $content_id
	 * @param int $user_id
	 * @return void
	 */
	public static function contentAccessCheck( $content_id, $user_id ) {
		if ( ! Contents::isUserCapableToManage( $content_id, $user_id ) ) {
			wp_send_json_error( array( 'message' => __( 'Access denied!', 'solidie' ) ) );
		}
	}

	/**
	 * Load file
	 *
	 * @param int    $file_id The file ID to download
	 * @param string $content_slug The content slug to download latest release file from
	 *
	 * @return void
	 */
	public static function loadFile( int $file_id = 0, string $content_slug = '' ) {
		if ( ! empty( $content_slug ) ) {
			$content_id     = Contents::getContentIdBySlug( $content_slug );
			$latest_release = ! empty( $content_id ) ? Release::getRelease( $content_id ) : null;
			$file_id        = ! empty( $latest_release ) ? $latest_release['file_id'] : 0;
		}
		FileManager::downloadFile( $file_id );
	}

	/**
	 * Aply reaction to a content
	 *
	 * @param integer $content_id The content ID to react to
	 * @param integer $reaction The value to set. Check reactions table-column comments to know meaning of values.
	 * @param string  $reaction_type Reaction type
	 * @return void
	 */
	public static function reactToContent( int $content_id, int $reaction, string $reaction_type ) {
		
		$u_id = get_current_user_id();
		
		// Apply reaction
		( new Reaction( $reaction_type, $content_id ) )->applyReaction( $reaction, $u_id );

		// Send update reactions
		wp_send_json_success(
			array(
				'reactions' => Reaction::getStats( $content_id, $u_id )
			)
		);
	}

	/**
	 * Get release for release manager editor.
	 *
	 * @param integer $content_id
	 * @return void
	 */
	public static function fetchReleases( int $content_id ) {
		$releases = Release::getReleases( $content_id, 1, 1000 );
		wp_send_json_success( array( 'releases' => $releases ) );
	}

	/**
	 * Create or update an app release
	 *
	 * @param array $release Release data
	 * @param array $file The file to release
	 *
	 * @return void
	 */
	public static function updateAppRelease( array $release, array $file = array() ) {
		
		self::contentAccessCheck( $release['content_id'], get_current_user_id() );

		$release = array(
			'content_id' => $release['content_id'],
			'version'    => $release['version'],
			'changelog'  => strip_tags( $release['changelog'] ),
			'release_id' => $release['release_id'],
			'file'       => $file
		);

		$error_message = Release::pushRelease( $release );

		if ( is_string( $error_message ) ) {
			wp_send_json_error( array( 'message' => $error_message ) );
		}

		wp_send_json_success( array( 'releases' => Release::getReleases( $release['content_id'], 1, 1000 ) ) );
	}

	/**
	 * Delete a release
	 *
	 * @param integer $release_id
	 * @return void
	 */
	public static function deleteAppRelease( int $release_id ) {

		$content_id = Release::getContentIdByReleaseId( $release_id, 0 );

		self::contentAccessCheck( $content_id, get_current_user_id() );
		
		Release::deleteRelease( $release_id );

		wp_send_json_success( array( 'message' => __( 'The release has been deleted', 'solidie' ) ) );
	}
}
