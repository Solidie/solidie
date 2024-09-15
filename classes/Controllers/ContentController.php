<?php
/**
 * Content management request handler
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Helpers\Geo;
use Solidie\Models\AdminSetting;
use Solidie\Models\AttachmentLog;
use Solidie\Models\Category;
use Solidie\Models\Contents;
use Solidie\Models\FileManager;
use Solidie\Models\Reaction;
use Solidie\Models\Release;
use Solidie\Models\User;
use SolidieLib\FileManager as SolidieLibFileManager;

/**
 * Content manager class
 */
class ContentController {

	const PREREQUISITES = array(
		'getContentList'        => array(
			'nopriv' => true,
		),
		'createOrUpdateContent' => array(),
		'createBulkContent'     => array(),
		'updateContentSlug'     => array(),
		'getContentEditorResource'     => array(),
		'deleteContent'         => array(),
		'getSingleContent'      => array(
			'nopriv' => true,
		),
		'loadFile'              => array(
			'nopriv' => true,
		),
		'getSimilarContents'    => array(
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
		'changeContentStatus' => array(
		),
		'uploadContentDescMedia' => array(
		),
		'enableInitialContentType' => array(
			'role' => 'administrator'
		)
	);

	/**
	 * Provide content list for various area like dashboard, gallery and so on.
	 *
	 * @param array $filters Content filter arguments
	 * @param bool  $is_contributor_inventory Whether it is user dashboard
	 * @param bool  $is_gallery Whether loaded in gallery
	 * @return void
	 */
	public static function getContentList( array $filters, bool $is_contributor_inventory = false, bool $is_gallery = false ) {

		if ( $is_contributor_inventory ) {
			$filters['contributor_id'] = get_current_user_id();
		}

		if ( $is_gallery ) {
			$filters['content_status'] = 'publish';
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
	 * Undocumented function
	 *
	 * @param array $content
	 * @param array $bulk_files
	 * @return void
	 */
	public static function createBulkContent( array $content, array $bulk_files, array $thumbnails = array() ) {

		if ( empty( $bulk_files ) ) {
			wp_send_json_error( array( 'message' => __( 'Files were not uploaded or there is an error', 'solidie' ) ) );
			return;
		}

		$bulk_files = SolidieLibFileManager::organizeUploadedHierarchy( $bulk_files );
		$thumbnails = ! empty( $thumbnails ) ? SolidieLibFileManager::organizeUploadedHierarchy( $thumbnails ) : array();
		$content['content_id'] = 0;

		$submitted = 0;
		$resp      = array();

		error_log( var_export( $bulk_files, true ) );
		error_log( var_export( $thumbnails, true ) );

		foreach ( $bulk_files as $index => $file ) {

			$resp    = self::createOrUpdateContent( $content, $file, $thumbnails[ $index ], true );
			$success = $resp === true || ( $resp['success'] ?? false ) === true;
			
			if ( $success ) {
				$submitted++;
			}
		}

		if ( $submitted === 0 ) {
			wp_send_json_error( array( 'message' => $resp['message'] ?? __( 'No content could be created', 'solidie' ) ) );
		} else {
			wp_send_json_success( array( 'message' => sprintf( __( '%d content created', 'solidie' ), $submitted ) ) );
		}
	}

	/**
	 * Create or update content from user dashboard
	 *
	 * @param array $content
	 * @param array $downloadable_file
	 * @param array $thumbnail
	 * @param boolean $return_response
	 * @param array $sample_images
	 * @param array $sample_image_ids
	 * @param array $preview
	 * @return void
	 */
	public static function createOrUpdateContent( 
		array $content, 
		array $downloadable_file = array(), 
		array $thumbnail = array(), 
		bool $return_response = false,
		array $sample_images = array(), 
		array $sample_image_ids = array(), 
		array $preview = array()
	) {

		$user_id = get_current_user_id();

		$proceed = apply_filters(
			'solidie_before_create_update_content', 
			true,
			compact( 
				'content', 
				'thumbnail', 
				'sample_images', 
				'sample_image_ids', 
				'downloadable_file', 
				'preview'
			)
		);

		if ( true !== $proceed ) {
			if ( $return_response === true ) {
				return $proceed;
			} else {
				wp_send_json_error( $proceed );
			}
		}

		// If it is edit, make sure the user is privileged to.
		if ( ! empty( $content['content_id'] ) ) {
			self::contentAccessCheck( $content['content_id'], $user_id );
		}

		$files = compact(
			'thumbnail',
			'sample_images',
			'downloadable_file',
			'preview',
			'sample_image_ids'
		);

		// Determine the content status
		$approval       = AdminSetting::get( 'public_contribution_approval' );
		$administrative = User::hasAdministrativeRole( $user_id );
		$status         = $content['content_status'] ?? '';
		
		if ( $status !== 'draft' ) {
			if ( ! $administrative && ( $approval === 'new_update' || ( $approval === 'new' && empty( $content['content_id'] ) ) ) ) {
				$content['content_status'] = 'pending';
				
			} else {
				$content['content_status'] = ! empty( $status ) ? $status : 'publish';
			}
		}
		
		if ( empty( $content['contributor_id'] ) || ! ( $content['is_admin'] ?? false ) || ! $administrative ) {
			$content['contributor_id'] = $user_id;
		}

		$content_id = Contents::updateContent( $content, $files );
		$response   = array();

		if ( ! empty( $content_id ) ) {
			
			$message = 'pending' === $content['content_status'] ? __( 'Submitted for review successfully', 'solidie' ) : __( 'Saved successfully', 'solidie' );

			$response = array(
				'success' => true,
				'message' => ! empty( $content['content_id'] ) ? $message : null,
				'content' => Contents::getContentByContentID( $content_id, null, false ),
			);
		} else {
			$response = array( 
				'message' => esc_html__( 'Something went wrong!', 'solidie' )
			);
		}

		if ( $return_response === true ) {
			return $response;

		} elseif ( $response['success'] ?? false ) {
			wp_send_json_success( $response );

		} else {
			wp_send_json_error( $response );
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
				'message'           => __( 'Content slug updated successfully!', 'solidie' ),
			)
		);
	}

	/**
	 * Get content editor resources
	 *
	 * @return void
	 */
	public static function getContentEditorResource( string $country_code = '' ) {
		wp_send_json_success(
			array(
				'categories'    => Category::getCategories(),
				'countries'     => Geo::getCountriesOptions(),
				'states'        => ! empty( $country_code ) ? Geo::getStatesOptions( $country_code ) : array(),
				'currency_code' => Geo::getCurrencyCode( $country_code )
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

		// Admin can delete no matter the condition
		// Contributor can only if deletion enabled for them
		if ( 
			User::hasAdministrativeRole( get_current_user_id() ) || 
			( AdminSetting::get( 'public_contribution_deletion' ) && self::contentAccessCheck( $content_id, get_current_user_id() ) ) 
		) {
			
			Contents::deleteContent( $content_id );
			wp_send_json_success();
		
		} else {
			wp_send_json_error( array( 'message' => __( 'You are not authorized to delete!', 'solidie' ) ) );
		}
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
	public static function getSingleContent( string $content_slug = '', int $content_id = 0, string $content_type='', bool $is_editor = false ) {

		// Get the content ID by slug if slug is not empty
		if ( ! empty( $content_slug ) ) {
			$content_id = Contents::getContentIdBySlug( $content_slug );
		}

		// Now get the content by content ID
		$content = $content_id ? Contents::getContentByContentID( $content_id, null, ! $is_editor ) : null;
		if ( empty( $content ) ) {
			wp_send_json_error( array( 'message' => __( 'The content was not found', 'solidie' ) ) );
		}

		// Check if the content type is enabled
		$content_type = empty( $content_type ) ? $content['content_type'] : $content_type;
		if ( ! AdminSetting::get( 'contents.' . $content_type . '.enable' ) ) {
			wp_send_json_error( array( 'message' => __( 'The content type is not enabled', 'solidie' ) ) );
		}

		// Check if content exist
		if ( empty( $content ) ) {
			wp_send_json_error( array( 'message' => esc_html__( 'Content not found', 'solidie' ) ) );
			exit;
		}

		// If editor, make sure the author requested, or the admin who can do anything
		if ( $is_editor ) {
			self::contentAccessCheck( $content['content_id'], get_current_user_id() );
		}

		$feedback_settings = AdminSetting::getFeedbackSettings( $content['content_type'] );

		// Remove contributor info from single content view if not enabled
		if ( empty( $feedback_settings['contributor'] ) && isset( $content['contributor'] ) ) {
			unset( $content['contributor'] );
		}

		// Add content reactions
		$content['reactions'] = ( object ) Reaction::getStats( $content_id, get_current_user_id() );

		// Determine free download label and description
		$free_label = __( 'Free', 'solidie' );
		$free_desc  = __( 'This content is eligible to download for free', 'solidie' );
		
		$saved_label = AdminSetting::get( 'free_download_label' );
		if ( ! empty( $saved_label ) ) {
			$free_label = $saved_label;
		}

		// Add description for free contents
		$saved_desc = AdminSetting::get( 'free_download_description' );
		if ( ! empty( $saved_desc ) ) {
			$free_desc = $saved_desc;
		}
		
		wp_send_json_success(
			array(
				'content' => $content,
				'settings' => array_merge(
					$feedback_settings,
					array(
						'free_download_label'       => apply_filters( 'solidie_free_download_label', $free_label, $content ),
						'free_download_description' => apply_filters( 'solidie_free_download_description', $free_desc, $content ),
					)
				) 
			)
		);
	}

	/**
	 * Add content access checker
	 *
	 * @param int $content_id
	 * @param int $user_id
	 * @return bool
	 */
	public static function contentAccessCheck( $content_id, $user_id ) {
		if ( ! Contents::isUserCapableToManage( $content_id, $user_id ) ) {
			wp_send_json_error( array( 'message' => __( 'You are not authorized!', 'solidie' ) ) );
		}
		return true;
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
			'changelog'  => strip_tags( ( string ) ( $release['changelog'] ?? '' ) ),
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

	/**
	 * Change content status
	 *
	 * @param integer $content_id
	 * @param string $status
	 * @param boolean $is_admin
	 * @return void
	 */
	public static function changeContentStatus( int $content_id, string $status, bool $is_admin ) {
		// Check content access
		self::contentAccessCheck( $content_id, get_current_user_id() );

		$content        = Contents::getContentByContentID( $content_id );
		$current_status = $content['content_status'];

		// Contributor can only unpublish from published status
		if ( ! $is_admin ) {
			if ( 
				! in_array( $status, array( 'publish', 'unpublish' ) ) 
				|| ( $status === 'unpublish' && ! in_array( $current_status, array( 'publish', 'draft' ) ) ) 
				|| ( $status === 'publish' && ! in_array( $current_status, array( 'draft', 'unpublish' ) ) )
			) {
				wp_send_json_error( array( 'message' => __( 'You are not authorized for the action!', 'solidie' ) ) );
			}
		} else {
			// As it is admin action, validate role
			if ( ! User::hasAdministrativeRole( get_current_user_id() ) ) {
				wp_send_json_error( array( 'message' => __( 'You are not authorized for the action!', 'solidie' ) ) );
			}
		}

		if ( ! in_array( $status, Contents::CONTENT_STATUSES ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid content status', 'solidie' ) ) );
		}

		// Looks ok
		Contents::changeContentStatus( $content_id, $status );

		wp_send_json_success( array( 'message' => __( 'Content status has been changed', 'solidie' ) ) );
	}

	/**
	 * Store content description attachment
	 *
	 * @param integer $content_id
	 * @param array $file
	 * @param int $lesson_id
	 * @return void
	 */
	public static function uploadContentDescMedia( int $content_id, array $file, int $lesson_id = 0 ) {

		$attachment_id = FileManager::uploadFile( $file, $content_id, $lesson_id );

		( new AttachmentLog( $content_id, $lesson_id ) )->logMediaAttachment( $attachment_id );
		
		if ( ! empty( $attachment_id ) ) {
			wp_send_json_success( 
				array(
					'file_id'  => $attachment_id, 
					'file_url' => FileManager::getMediaLink( $attachment_id ) 
				) 
			);
		} else {
			wp_send_json_error( array( 'message' => __( 'Unsupported file or something went wrong!', 'solidie' ) ) );
		}
	}

	public static function enableInitialContentType( string $content_type ) {
		AdminSetting::toggleContentType( $content_type, true );
		wp_send_json_success();
	}

	public static function getSimilarContents( int $content_id, string $content_type ) {
		wp_send_json_success(
			array(
				'contents' => Contents::getSimilarContents( $content_id, $content_type )
			)
		);
	}
}
