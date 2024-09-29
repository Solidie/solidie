<?php
/**
 * Comment model
 * 
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Helpers\Utilities;
use SolidieLib\_Array;

/**
 * Comment class
 */
class Comment {

	/**
	 * Create or update a comment
	 *
	 * @param array $args COmment data array
	 * @return int
	 */
	public static function createUpdate( $args ) {

		$comment = array(
			'content_id'        => $args['content_id'],
			'comment_content'   => $args['comment_content'],
			'parent_id'         => ! empty( $args['parent_id'] ) ? $args['parent_id'] : 0,
			'user_id'           => $args['user_id'],
			'comment_edit_date' => gmdate('Y-m-d H:i:s')
		);

		global $wpdb;
		$comment_id = ! empty( $args['comment_id'] ) ? $args['comment_id'] : null;

		if ( empty( $comment_id ) ) {

			// Comment date is the first day when it is created
			$comment['comment_date'] = gmdate('Y-m-d H:i:s');

			// Create new comment as comment id not present
			$wpdb->insert(
				$wpdb->solidie_comments,
				$comment
			);

			$comment_id = $wpdb->insert_id;
		} else {
			
			// Update comment by the ID
			$wpdb->update(
				$wpdb->solidie_comments,
				$comment,
				array( 'comment_id' => $comment_id )
			);
		}

		return $comment_id;
	}

	/**
	 * Get comment by specific comment ID
	 *
	 * @param int $comment_id
	 * @param mixed $fallback
	 * @return array|mixed
	 */
	public static function getComment( $comment_id, $fallback = null ) {
		$comments = self::getComments( array( 'comment_id' => $comment_id ) );
		return ! empty( $comments ) ? $comments[0] : $fallback;
	}

	/**
	 * Get comments by arguments
	 *
	 * @param array $args
	 * @return array
	 */
	public static function getComments( array $args ) {

		global $wpdb;

		$limit        = empty( $args['parent_id'] ) ? Utilities::getLimit() : null; // No limit on sub thread
		$offset       = ( Utilities::getPage( $args['page'] ?? null ) - 1 ) * $limit;
		$limit_offset = $limit ? $wpdb->prepare( " LIMIT %d OFFSET %d", $limit, $offset ) : '';
		
		$where_clause = '';

		// Get comment from specific content by content ID
		if ( ! empty( $args['content_id'] ) ) {
			$where_clause .= $wpdb->prepare( " AND _comment.content_id=%d", $args['content_id'] );
		}

		// Get specific comment
		if ( ! empty( $args['comment_id'] ) ) {
			$where_clause .= $wpdb->prepare( " AND _comment.comment_id=%d", $args['comment_id'] );
		}

		// Get replies for a specific thread
		if ( ! empty( $args['parent_id'] ) ) {
			$where_clause .= $wpdb->prepare( " AND _comment.parent_id=%d", $args['parent_id'] );
		}

		// Get comments before than specific comment ID
		if ( ! empty( $args['before_than'] ) ) {
			$where_clause .= $wpdb->prepare( " AND _comment.comment_id<%d", $args['before_than'] );
		}

		$comments = $wpdb->get_results(
			"SELECT 
				_comment.*,
				UNIX_TIMESTAMP(_comment.comment_date) AS comment_date,
				_user.display_name
			FROM
				{$wpdb->solidie_comments} _comment
				INNER JOIN {$wpdb->solidie_contents} _content ON _content.content_id=_comment.content_id
				INNER JOIN {$wpdb->users} _user ON _comment.user_id=_user.ID
			WHERE
				1=1
				{$where_clause}
			ORDER BY 
				_comment.comment_date DESC
			{$limit_offset}",
			ARRAY_A
		);

		$comments = _Array::castRecursive( $comments );

		// Add meta data to comments
		foreach ( $comments as $index => $comment ) {
			$comments[ $index ]['avatar_url'] = get_avatar_url( $comment['user_id'] );

			// Assign comment replies. Get only if it is root thread.
			if ( empty( $comment['parent_id'] ) ) {
				$comment['replies'] = self::getComments( array( 'parent_id' => $comment['comment_id'] ) );
			}
		}

		return $comments;
	}

	/**
	 * Delete comment by comment ID and commeter ID if need
	 *
	 * @param int $comment_id The comment ID to delete
	 * @param int $commenter_id Optional
	 * @return bool
	 */
	public static function deleteComment( $comment_id = null, $commenter_id = null ) {

		$args = array();

		// Where comment ID
		if ( null !== $comment_id ) {
			$args['comment_id'] = $comment_id;
		}

		// Where commenter ID
		if ( null !== $commenter_id ) {
			$args[ 'user_id' ] = $commenter_id;
		}

		global $wpdb;

		if ( ! empty( $args ) ) {
			$wpdb->delete(
				$wpdb->solidie_comments,
				$args
			);
		}
	}

	/**
	 * Delete comment by content ID
	 *
	 * @param int $content_id
	 * @return void
	 */
	public static function deleteCommentByContentId( $content_id ) {
		Field::comments()->deleteField( array( 'content_id' => $content_id ) );
	}

	/**
	 * Get comment count
	 *
	 * @return int
	 */
	public static function getCount( $content_id, $parent = 0 ) {

		global $wpdb;

		return ( int ) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(comment_id) FROM {$wpdb->solidie_comments} WHERE content_id=%d AND parent_id=%d",
				$content_id,
				$parent
			)
		);
	}
}
