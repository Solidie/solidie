<?php
/**
 * Tutorial lessons controller
 *
 * @package solidie
 */

namespace Solidie\Controllers;

class LessonController {
	const PREREQUISITES = array(
		'updateLessonsHierarchy' => array(

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

		
	}
}
