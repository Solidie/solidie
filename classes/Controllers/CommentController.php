<?php
/**
 * Content comment feature
 * 
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\Comment;

/**
 * Comment controller class
 */
class CommentController {

	const PREREQUISITES = array(
		'createUpdateComment' => array(
		),
		'deleteComment' => array(
		),
		'fetchComments' => array(
			'nopriv' => true
		)
	);

	/**
	 * Create or update comment
	 *
	 * @param string $comment
	 * @param integer $content_id
	 * @return void
	 */
	public static function createUpdateComment( string $comment_content, int $content_id, int $comment_id = 0, int $parent_id = 0 ) {
		
		$comment_id = Comment::createUpdate(
			array(
				'comment_id'      => $comment_id,
				'content_id'      => $content_id,
				'comment_content' => $comment_content,
				'parent_id'       => $parent_id,
				'user_id'         => get_current_user_id()
			)
		);

		if ( empty( $comment_id ) ) {
			wp_send_json_error( array( 'message' => __( 'Something went wrong!', 'solidie' ) ) );
		}

		$comment = Comment::getComment( $comment_id );
		wp_send_json_success( array( 'comment' => $comment ) );
	}

	/**
	 * Get comments for a specific content
	 *
	 * @param integer $content_id
	 * @param integer $last_id
	 * @return void
	 */
	public static function fetchComments( int $content_id, int $last_id = 0 ) {
		
		$comments = Comment::getComments(
			array( 
				'content_id'  => $content_id, 
				'before_than' => $last_id 
			)
		);

		wp_send_json_success( array( 'comments' => $comments ) );
	}

	/**
	 * Delete single comment
	 *
	 * @param integer $comment_id
	 * @return void
	 */
	public static function deleteComment( int $comment_id ) {
		Comment::deleteComment( $comment_id, get_current_user_id() );
		wp_send_json_success( array( 'message' => __( 'Comment has been deleted successfully', 'solidie' ) ) );
	}
}
