<?php
/**
 * Tutorial lessons controller
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\Contents;
use Solidie\Models\Tutorial;

class LessonController {
	const PREREQUISITES = array(
		'saveNewLesson' => array(

		),
		'saveLessonSequence' => array(

		),
		'getLessonsHierarchy' => array(

		),
		'deleteLesson' => array(

		),
		'fetchLessonForEditor' => array(

		),
		'updateLessonSingle' => array(

		),
		'updateLessonSlug' => array(

		),
		'loadLessonInTutorial' => array(
			'nopriv' => true
		)
	);

	/**
	 * Update lessons definitions
	 *
	 * @return void
	 */
	public static function saveLessonSequence( int $content_id, array $sequence ) {
		
		// Content authentication
		ContentController::contentAccessCheck( $content_id, get_current_user_id() );

		Tutorial::saveLessonSequence( $content_id, array_map( 'intval', $sequence ) );

		wp_send_json_success();
	}

	/**
	 * Create new lesson
	 *
	 * @param integer $content_id
	 * @param string $lesson_title
	 * @param integer $parent_id
	 * @return void
	 */
	public static function saveNewLesson( int $content_id, string $lesson_title, int $parent_id = 0) {

		$lesson_id = Tutorial::updateLessonSingle(
			array(
				'content_id'   => $content_id,
				'lesson_title' => $lesson_title,
				'parent_id'    => $parent_id
			)
		);

		wp_send_json_success( 
			array( 
				'message'   => __( 'New lesson created. Add contents now..', 'solidie' ),
				'lessons'   => Tutorial::getLessonsRecursive( $content_id ),
				'lesson_id' => $lesson_id
			) 
		);
	}

	/**
	 * Get lessons structure for a tutorial
	 *
	 * @param integer $content_id
	 * @return void
	 */
	public static function getLessonsHierarchy( int $content_id ) {
		wp_send_json_success( array( 'lessons' => Tutorial::getLessonsRecursive( $content_id ) ) );
	}

	/**
	 * Delete single lesson
	 *
	 * @param integer $content_id
	 * @param integer $lesson_id
	 *
	 * @return void
	 */
	public static function deleteLesson( int $content_id, int $lesson_id ) {

		// Content access check
		ContentController::contentAccessCheck( $content_id, get_current_user_id() );

		Tutorial::deleteLessons( $lesson_id );

		wp_send_json_success(
			array( 
				'message' => __( 'Lesson delete', 'solidie' ),
				'lessons' => Tutorial::getLessonsRecursive( $content_id )
			) 
		);
	}

	/**
	 * Get single lesson content and data by lesson ID for editor only
	 *
	 * @param integer $content_id
	 * @param integer $lesson_id
	 * @return void
	 */
	public static function fetchLessonForEditor( int $content_id, int $lesson_id ) {
		
		// Content access check
		ContentController::contentAccessCheck( $content_id, get_current_user_id() );
			
		// Get lesson
		$lesosn = Tutorial::getLesson( $content_id, $lesson_id );

		if ( empty( $lesosn ) ) {
			wp_send_json_error( array( 'message' => __( 'Lesson not found', 'solidie' ) ) );
		}

		wp_send_json_success( array( 'lesson' => $lesosn ) );
	}

	/**
	 * Update single lesson info
	 *
	 * @param array $lesson
	 * 
	 * @return void
	 */
	public static function updateLessonSingle( array $lesson ) {

		// Check content access
		ContentController::contentAccessCheck( $lesson['content_id'], get_current_user_id() );

		$lesson['lesson_status'] = 'publish';
		$updated                 = Tutorial::updateLessonSingle( $lesson );

		if ( ! $updated ) {
			wp_send_json_error( array( 'message' => __( 'Something went wrong!', 'solidie' ) ) );
		}

		wp_send_json_success( array( 'message' => __( 'Lesson has been published successfully!', 'solidie' ) ) );
	}

	/**
	 * Get lesson structure and single content for public view
	 *
	 * @param string $content_slug
	 * @param string $lesson_path
	 * @return void
	 */
	public static function loadLessonInTutorial( string $content_slug, string $lesson_path = '' ) {
		
		// Check if content exists
		$content_id = Contents::getContentIdBySlug( $content_slug );
		if ( empty( $content_id ) ) {
			wp_send_json_error( array( 'message' => __( 'Content not found!', 'solidie' ) ) );
		}

		do_action( 'solidie_load_lesson_before', $content_id, $lesson_path );

		$lesson = null;
		if ( ! empty( $lesson_path ) ) {
			$lesson_id = Tutorial::getLessonIdByPath( $lesson_path );
			$lesson    = $lesson_id ? Tutorial::getLesson( $content_id, $lesson_id, 'publish' ) : null;
		}
		
		wp_send_json_success(
			array(
				'lessons' => Tutorial::getLessonsRecursive( $content_id, 'publish' ),
				'lesson'  => $lesson,
			)
		);
	}

	/**
	 * Update lesson slug
	 *
	 * @param integer $content_id
	 * @param integer $lesson_id
	 * @param string $lesson_slug
	 * @return void
	 */
	public static function updateLessonSlug( int $content_id, int $lesson_id, string $lesson_slug ) {
		
		// Check content slug update access
		ContentController::contentAccessCheck( $content_id, get_current_user_id() );

		$new_slug = Tutorial::updateLessonSlug( $content_id, $lesson_id, $lesson_slug );

		wp_send_json_success(
			array(
				'lesson_slug'      => $new_slug,
				'lesson_permalink' => Tutorial::getLessonPermalink( $lesson_id ),
				'message'          => __( 'Lesson slug updated successfully', 'solidie' ),
			)
		);
	}
}
