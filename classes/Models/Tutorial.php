<?php
/**
 * Tutorial related functionalities
 * @package solidie
 */

namespace Solidie\Models;

use SolidieLib\_Array;
use SolidieLib\_String;

class Tutorial {

	/**
	 * Update lessons hierarchy
	 *
	 * @param int $content_id
	 * @param array $sequence
	 * @return void
	 */
	public static function saveLessonSequence( $content_id, $sequence ) {
		
		global $wpdb;

		foreach ( $sequence as $id => $value ) {
			$wpdb->update(
				$wpdb->solidie_lessons,
				array( 'sequence' => $value ),
				array( 
					'content_id' => $content_id,
					'lesson_id'  => $id 
				)
			);
		}
	}

	/**
	 * Delete lessons row and related data
	 *
	 * @param int|array $lesson_ids Lesson ID or array of lesson IDs
	 * @return void
	 */
	public static function deleteLessons( $lesson_ids ) {
		
		if ( empty( $lesson_ids ) ) {
			return;
		}

		global $wpdb;
		$ids_places = _String::getSQLImplodesPrepared( _Array::getArray( $lesson_ids, true ) );

		// Get lesson contents to delete attached media
		$_lessons = $wpdb->get_results(
			"SELECT content_id, lesson_id FROM {$wpdb->solidie_lessons} WHERE lesson_id IN ({$ids_places})",
			ARRAY_A
		);
		foreach ( $_lessons as $lesson ) {
			FileManager::deleteDirectory( FileManager::getContentDir( $lesson['content_id'], $lesson['lesson_id'] ) );
		}

		// Delete lesson entries
		$wpdb->query(
			"DELETE FROM 
				{$wpdb->solidie_lessons} 
			WHERE 
				lesson_id IN ({$ids_places})"
		);
	}

	/**
	 * Delete lessons under a content ID
	 *
	 * @param int $content_id
	 * @return void
	 */
	public static function deleteLessonsByContentId( $content_id ) {

		// Retrieving first as we might need to delete linked data first in future
		
		global $wpdb;
		$lessons_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT lesson_id FROM {$wpdb->solidie_lessons} WHERE content_id=%d",
				$content_id
			)
		);

		if ( ! empty( $lessons_ids ) ) {
			self::deleteLessons( $lessons_ids );
		}
	}

	/**
	 * Get nested lessons structure
	 *
	 * @param int $content_id
	 * @param string|null $status
	 * @param integer $lesson_id For internal call only
	 * @param string|null $permalink_base For internal call only
	 *
	 * @return array Nested lessons array
	 */
	public static function getLessonsRecursive( $content_id, $lesson_id = 0, $permalink_base = null ) {
		
		$lessons = array();

		if ( empty( $permalink_base ) ) {
			$permalink_base = Contents::getPermalink( $content_id );
		}

		global $wpdb;
		
		$results = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT 
					lesson_id, 
					lesson_title,
					lesson_slug,
					lesson_status
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
			
			$lesson_id        = ( int ) $lesson['lesson_id'];
			$lesson_permalink = $permalink_base . $lesson['lesson_slug'] . '/';
			
			$lessons[] = array(
				'lesson_id'        => $lesson_id,
				'lesson_permalink' => $lesson_permalink,
				'lesson_title'     => $lesson['lesson_title'],
				'lesson_slug'      => $lesson['lesson_slug'],
				'lesson_status'    => $lesson['lesson_status'],
				'children'         => self::getLessonsRecursive( $content_id, $lesson_id, $lesson_permalink )
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
					lesson_slug,
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

		if ( empty( $lesson ) ) {
			return null;
		}

		$lesson = _Array::castRecursive( $lesson );

		// Assign lesson permalink
		$lesson['lesson_permalink'] = self::getLessonPermalink( $lesson_id );

		return $lesson;
	}

	/**
	 * Get lesson count by tutorial ID
	 *
	 * @param int $content_id
	 * @return int
	 */
	public static function getLessonCount( $content_id, $status = null ) {

		global $wpdb;
		
		$where_clause = '';

		// Status filter
		if ( ! empty( $status ) ) {
			$where_clause .= $wpdb->prepare( ' AND lesson_status=%s', $status );
		}

		return (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT 
					COUNT(lesson_id)
				FROM 
					{$wpdb->solidie_lessons} 
				WHERE 
					content_id=%d 
					{$where_clause}
				LIMIT 1",
				$content_id
			)
		);
	}

	/**
	 * Get lesson permalink by lesson ID
	 *
	 * @param int $lesson_id
	 * @return string
	 */
	public static function getLessonPermalink( $lesson_id ) {
		
		global $wpdb;
		
		$slugs      = array();
		$parent_id  = $lesson_id;
		$content_id = 0;

		do {
			$lesson = $wpdb->get_row(
				$wpdb->prepare(
					"SELECT content_id, parent_id, lesson_slug FROM {$wpdb->solidie_lessons} WHERE lesson_id=%d",
					$parent_id
				),
				ARRAY_A
			);

			$parent_id = ( int ) ( $lesson['parent_id'] ?? null );

			if ( ! empty( $lesson ) ) {
				$content_id = ( int ) $lesson['content_id'];
				array_unshift( $slugs, $lesson['lesson_slug'] );
			}
			
		} while( ! empty( $parent_id ) );

		return Contents::getPermalink( $content_id ) . implode( '/', $slugs ) . '/';
	}

	/**
	 * Update single lesson
	 *
	 * @param array $lesson
	 * @return bool
	 */
	public static function updateLessonSingle( array $lesson ) {
		
		$lesson_id      = ( int ) ( $lesson['lesson_id'] ?? 0 );
		$content_id     = $lesson['content_id'];
		$current_lesson = $lesson_id ? self::getLesson( $content_id, $lesson_id ) : null;

		// Check if the lesson exists if the lesson id is non empty
		if ( $lesson_id && ! $current_lesson ) {
			return false;
		}

		// Delete removed media by ID that are no more in updated lesson
		if ( $current_lesson ) {
			FileManager::deleteRemovedFilesFromContent(
				$current_lesson['lesson_content'] ?? '', 
				$lesson['lesson_content'] ?? '', 
				$content_id, 
				$lesson_id
			);
		}

		$payload = array(
			'lesson_title'   => $lesson['lesson_title'] ?? 'Untitled',
			'lesson_content' => $lesson['lesson_content'] ?? '',
			'lesson_status'  => 'publish',
			'parent_id'      => $lesson['parent_id'],
			'content_id'     => $content_id
		);

		global $wpdb;

		if ( $lesson_id ) {
			$wpdb->update(
				$wpdb->solidie_lessons,
				$payload,
				array( 
					'lesson_id' => $lesson_id, 
					'content_id' => $content_id,
				)
			);
		} else {
			$wpdb->insert(
				$wpdb->solidie_lessons,
				$payload
			);

			$lesson_id = ! empty( $wpdb->insert_id ) ?  $wpdb->insert_id : false;
			
			if ( $lesson_id ) {

				// Assign sequence
				$new_index = $wpdb->get_var(
					$wpdb->prepare(
						"SELECT MAX(sequence)+1 FROM {$wpdb->solidie_lessons} WHERE content_id=%d",
						$content_id
					)
				);
				
				$wpdb->update(
					$wpdb->solidie_lessons,
					array( 'sequence' => $new_index ),
					array( 'lesson_id' => $lesson_id )
				);
				
				// Assign lesson slug
				self::setLessonSlug( $lesson_id, $payload['lesson_title'] );
			}
		}

		return $lesson_id;
	}

	/**
	 * Get lesson ID by lesson slug 
	 *
	 * @param string $path
	 * @return void
	 */
	public static function getLessonIdByPath( string $path ) {

		$segments = explode( '/', $path );
		$lesson_id = null;

		global $wpdb;

		foreach ( $segments as $segment ) {

			$where = '';
			if ( ! empty( $lesson_id ) ) {
				$where .= $wpdb->prepare( ' AND parent_id=%d', $lesson_id );
			}

			$lesson_id = $wpdb->get_var(
				$wpdb->prepare(
					"SELECT lesson_id FROM {$wpdb->solidie_lessons} WHERE lesson_slug=%s {$where} LIMIT 1",
					$segment
				)
			);

			if ( empty( $lesson_id ) ) {
				break;
			}
		}

		return ! empty( $lesson_id ) ? ( int ) $lesson_id : null;
	}

	/**
	 * Get content ID by slug
	 *
	 * @param string $slug The content slug to get content by
	 * @param mixed  $fallback The fallback if content ID not found
	 *
	 * @return int|null
	 */
	public static function getLessonIdBySlug( string $slug, $fallback = null ) {
		return Field::lessons()->getField( array( 'lesson_slug' => $slug ), 'lesson_id', $fallback );
	}

	/**
	 * Set lesson slug
	 *
	 * @param int        $lesson_id The content ID to set slug for
	 * @param string|int $lesson_slug The slug to set for the job
	 *
	 * @return string
	 */
	public static function setLessonSlug( $lesson_id, $lesson_slug, $update_row = true ) {
		$lesson_slug = _String::consolidate( (string) $lesson_slug, true );
		$lesson_slug = strtolower( str_replace( ' ', '-', $lesson_slug ) );
		$lesson_slug = preg_replace( '/[^A-Za-z0-9\-]/u', '', $lesson_slug );
		$lesson_slug = empty( $lesson_slug ) ? 'untitled-lesson' : $lesson_slug;
		$lesson_slug = preg_replace( '/-+/', '-', $lesson_slug );

		$new_slug = $lesson_slug;
		$index    = 0;

		// Get the slug until it's not avaialble in database
		while ( $lesson_id != self::getLessonIdBySlug( $new_slug, $lesson_id ) ) {
			$index++;
			$new_slug = $lesson_slug . '-' . $index;
		}

		if ( $update_row ) {
			Field::lessons()->updateField(
				array( 'lesson_slug' => $new_slug ),
				array( 'lesson_id' => $lesson_id )
			);
		}

		return $new_slug;
	}

	/**
	 * Update lesson slug by lesson ID
	 *
	 * @param integer $content_id
	 * @param integer $lesson_id
	 * @param string $lesson_slug
	 * @return void
	 */
	public static function updateLessonSlug( int $content_id, int $lesson_id, string $lesson_slug ) {

		$new_slug = self::setLessonSlug( $lesson_id, $lesson_slug, false );

		global $wpdb;
		$wpdb->update(
			$wpdb->solidie_lessons,
			array( 'lesson_slug' => $new_slug ),
			array(
				'lesson_id'  => $lesson_id,
				'content_id' => $content_id
			)
		);

		return $new_slug;
	}
}
