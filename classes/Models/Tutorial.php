<?php
/**
 * Tutorial related functionalities
 * @package solidie
 */

namespace Solidie\Models;

class Tutorial {

	private static function getLinearLessonsHierarchy( $lessons ) {
		
		$rows = array();

		foreach ( $lessons as $lesson ) {
			
			$rows[] = array(
				'lessons_id'   => $lesson['lesson_id'],
				'lesson_title' => $lesson['lesson_title']
			);

			$children = $lesson['children'] ?? array();
			if ( ! empty( $children ) ) {
				$rows = array_merge( $rows, self::getLinearLessonsHierarchy( $children ) );
			}
		}

		return $rows;
	}

	private static function getNestedLessonsHierarchy() {
		
	}

	/**
	 * Update lessons hierarchy
	 *
	 * @param array $lessons Nested array of lessons
	 * @return void
	 */
	public static function updateLessonsHierarchy( $content_id, $lessons ) {
		
		$linear = self::getLinearLessonsHierarchy( $lessons );

		$existings    = self::getLessonsDefinitions( $content_id );
		$existing_ids = array_column( $existings, 'lesson_id' );

		// Delete removed ones
		$remaining_ids = array_filter( array_column( $linear, 'lesson_id' ), 'is_numeric' );
		$to_delete = array_diff( $existing_ids, $remaining_ids );


		// Update existing ones

		// Create new ones
		$updates = 
	}

	/**
	 * Get lessons hierarchy for a tutorial content id
	 *
	 * @param int $content_id
	 * @return array
	 */
	public static function getLessonsDefinitions( $content_id, $hierarchical = false ) {
		
		global $wpdb;

		$lessons = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT lesson_id, lesson_title, parent_id, sequence FROM {$wpdb->solidie_lessons} WHERE content_id=%d",
				$content_id
			),
			ARRAY_A
		);

		return $lessons;
	}

	/**
	 * Delete lesson by lesson ID/s
	 *
	 * @param int|array $lesson_id Lesson ID or array of IDs
	 *
	 * @return void
	 */
	public static function deleteLesson( $lesson_id ) {
		
		if ( empty( $lesson_id ) ) {
			return;
		}

		$lesson_ids = is_array( $lesson_id ) ? $lesson_id : array( $lesson_id );

		global $wpdb;

		foreach ( $lesson_ids as $id ) {
			$descendent_ids = self::getDescendentIDs( $id );
			$ids = array_merge( $id, $descendent_ids );

			$wpdb->delete(
				$wpdb->sol
			)
		}
	}

	public static function getDescendentIDs(  )
}
