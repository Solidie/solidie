<?php
/**
 * Tutorial related functionalities
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Helpers\_Array;
use Solidie\Helpers\_String;

// To Do: Add image/video support in lesson content

class Tutorial {

	/**
	 * Insert or update individual lessons structures
	 *
	 * @param int      $content_id The content ID of lessons
	 * @param array    $lessons Nested lessons array
	 * @param int|null $parent_id Parent ID to set
	 *
	 * @return array The IDs that remains after removal of others
	 */
	private static function updateLessonsRecursive( $content_id, $lessons, $parent_id = 0 ) {

		$remaining_ids = array();
		
		global $wpdb;

		foreach ( $lessons as $index => $lesson ) {

			$lesson_id = $lesson['lesson_id'];
			
			$payload = array(
				'lesson_title' => $lesson['lesson_title'],
				'parent_id'    => $parent_id,
				'content_id'   => $content_id,
				'sequence'     => $index + 1
			);

			if ( is_numeric( $lesson_id ) ) {
				
				$wpdb->update(
					$wpdb->solidie_lessons,
					$payload,
					array( 'lesson_id' => $lesson_id )
				);
			} else {
				$wpdb->insert(
					$wpdb->solidie_lessons,
					$payload
				);

				$lesson_id = $wpdb->insert_id;
			}

			$remaining_ids[] = ( int ) $lesson_id;

			$children = $lesson['children'] ?? array();
			if ( ! empty( $children ) ) {
				$left_over_ids = self::updateLessonsRecursive( $content_id, $children, $lesson_id );
				$remaining_ids = array_merge( $remaining_ids, $left_over_ids );
			}
		}

		return $remaining_ids;
	}

	/**
	 * Update lessons hierarchy
	 *
	 * @param array $lessons Nested array of lessons
	 * @return void
	 */
	public static function updateLessonsHierarchy( $content_id, $lessons ) {
		
		error_log( var_export( $lessons, true ) );

		// Update or insert the remaining lessons
		$remaining_ids = self::updateLessonsRecursive( $content_id, $lessons );

		// Get existing lesson IDs of the content
		global $wpdb;
		$existing_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT lesson_id FROM {$wpdb->solidie_lessons} WHERE content_id=%d",
				$content_id
			)
		);

		// Delete the lessons from DB that were removed
		$removed_ids = array_diff( array_map( 'intval', $existing_ids ), $remaining_ids );
		if ( ! empty( $removed_ids ) ) {

			$ids_places = _String::getPlaceHolders( $removed_ids );
			$wpdb->query(
				$wpdb->prepare(
					"DELETE FROM {$wpdb->solidie_lessons} WHERE lesson_id IN ({$ids_places})",
					...$removed_ids
				)
			);
		}
	}

	/**
	 * Get all the descendents IDs
	 *
	 * @param id $id
	 * @return array
	 */
	public static function getLessonsRecursive( $content_id, $lesson_id = 0 ) {
		
		$lessons = array();

		global $wpdb;
		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT 
					lesson_id, 
					lesson_title 
				FROM 
					{$wpdb->solidie_lessons} 
				WHERE 
					content_id=%d 
					AND parent_id=%d 
				ORDER BY sequence ASC",
				$content_id,
				$lesson_id
			),
			ARRAY_A
		);

		foreach ( $results as $lesson ) {
			
			$lesson_id = ( int ) $lesson['lesson_id'];
			
			$lessons[] = array(
				'lesson_id'    => $lesson_id,
				'lesson_title' => $lesson['lesson_title'],
				'children'     => self::getLessonsRecursive( $content_id, $lesson_id )
			);
		}
		
		return $lessons;
	}

	/**
	 * Get single lesson by content and lesson ID
	 *
	 * @param int $content_id
	 * @param int $lesson_id
	 * @return array
	 */
	public static function getLesson( $content_id, $lesson_id, $status = null ) {

		global $wpdb;
		
		$where_clause = '';

		// Status filter
		if ( ! empty( $status ) ) {
			$where_clause .= $wpdb->prepare( ' AND lesson_status=%s', $status );
		}

		$lesson = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT 
					lesson_title, 
					lesson_content, 
					parent_id 
				FROM 
					{$wpdb->solidie_lessons} 
				WHERE 
					lesson_id=%d 
					AND content_id=%d 
					{$where_clause}
				LIMIT 1",
				$lesson_id,
				$content_id
			),
			ARRAY_A
		);

		return ! empty( $lesson ) ? _Array::castRecursive( $lesson ) : null;
	}

	/**
	 * Update single lesson
	 *
	 * @param array $lesson
	 * @return bool
	 */
	public static function updateLessonSingle( array $lesson ) {
		
		$exists = self::getLesson( $lesson['content_id'], $lesson['lesson_id'] );
		if ( empty( $exists ) ) {
			return false;
		}

		global $wpdb;
		$wpdb->update(
			$wpdb->solidie_lessons,
			$lesson,
			array( 
				'lesson_id' => $lesson['lesson_id'], 
				'content_id' => $lesson['content_id'] 
			)
		);

		return true;
	}
}
