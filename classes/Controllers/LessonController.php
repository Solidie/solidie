<?php
/**
 * Tutorial lessons controller
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\Tutorial;

class LessonController {
	const PREREQUISITES = array(
		'updateLessonsHierarchy' => array(

		),
		'getLessonsHierarchy' => array(

		),
		'fetchLessonSingle' => array(
			'nopriv' => true
		),
		'updateLessonSingle' => array(

		)
	);

	/**
	 * Update lessons definitions
	 *
	 * @return void
	 */
	public static function updateLessonsHierarchy( array $lessons, int $content_id ) {
		
		// Content authentication
		ContentController::contentAccessCheck( $content_id, get_current_user_id() );

		Tutorial::updateLessonsHierarchy( $content_id, $lessons );

		wp_send_json_success( array( 'lessons' => Tutorial::getLessonsRecursive( $content_id ) ) );
	}

	/**
	 * Get lessons structure for a tutorial
	 *
	 * @param integer $content_id
	 * @return void
	 */
	public static function getLessonsHierarchy( int $content_id ) {
		// To Do: Restrict paid tutorial if not purchased
		// To Do: Add a setting to enable login requirement to download/read free contents.
		wp_send_json_success( array( 'lessons' => Tutorial::getLessonsRecursive( $content_id ) ) );
	}

	/**
	 * Get single lesson content and data by lesson ID
	 *
	 * @param integer $content_id
	 * @param integer $lesson_id
	 * @return void
	 */
	public static function fetchLessonSingle( int $content_id, int $lesson_id, bool $is_editor = false ) {
		
		// If editor, then must be admin or the author
		if ( $is_editor ) {
			ContentController::contentAccessCheck( $content_id, get_current_user_id() );
		
		} else {
			// To Do: If not editor, then make sure either free or purchased the content is
		}

		$lesosn = Tutorial::getLesson( $content_id, $lesson_id, ! $is_editor ? 'publish' : null );

		if ( empty( $lesosn ) ) {
			wp_send_json_error( array( 'message' => __( 'Lesson not found', 'solidie' ) ) );
		}

		wp_send_json_success( array( 'lesson' => $lesosn ) );
	}

	/**
	 * Update single lesson info
	 *
	 * @param integer $content_id
	 * @param integer $lesson_id
	 * @param string $lesson_title
	 * @param string $lesson_content
	 * @param integer $parent_id
	 * @return void
	 */
	public static function updateLessonSingle( int $content_id, int $lesson_id, string $lesson_title, string $lesson_content, int $parent_id = 0 ) {

		if ( ! empty( $content_id ) ) {
			ContentController::contentAccessCheck( $content_id, get_current_user_id() );
		}

		$lesson_status  = 'publish';
		$payload = compact( 'content_id', 'lesson_id', 'lesson_content', 'parent_id', 'lesson_status' );
		$updated = Tutorial::updateLessonSingle( $payload );

		if ( ! $updated ) {
			wp_send_json_error( array( 'message' => __( 'Something went wrong!', 'solidie' ) ) );
		}

		wp_send_json_success( array( 'message' => __( 'Lesson has been published successfully!', 'solidie' ) ) );
	}
}
