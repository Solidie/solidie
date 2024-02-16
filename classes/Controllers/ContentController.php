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

		/**
		 * To Do:
		 * Before updating, Check if the product created by current user or the user is administrator/editor or privileged.
		 * It's not necessary currently as only admin can manage contents so far.
		 * It is for future update.
		 */

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
		// To Do: Check if the user is authorized to delete the content
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
	 * @return void
	 */
	public static function getSingleContent( string $content_slug = '', int $content_id = 0 ) {

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

		$feedback_settings = AdminSetting::getFeedbackSettings( $content['content_type'] );

		// Get contributor info
		if ( $feedback_settings['contributor'] ) {
			$content['contributor'] = User::getUserData( $content['contributor_id'] );
		}

		$content['reactions'] = ( object ) Reaction::getStats( $content_id, get_current_user_id() );
		
		wp_send_json_success(
			array(
				'content'                       => $content,
				'free_content_plan_label'       => apply_filters( 'solidie_free_content_plan_label', __( 'Free', 'solidie' ), $content ),
				'free_content_plan_description' => apply_filters( 'solidie_free_content_plan_description', __( 'This content is eligible to download for free', 'solidie' ), $content ),
			)
		);
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
}
