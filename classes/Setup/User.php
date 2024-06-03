<?php
/**
 * User hooks registrar
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Models\Comment;
use Solidie\Models\Contents;
use Solidie\Models\Field;

/**
 * User class
 */
class User {

	public function __construct() {
		add_action( 'delete_user', array( $this, 'processUserDeletion' ), 10, 3 );
	}
	
	/**
	 * User deletion hook to delete associated data or replace owner
	 *
	 * @param int $id
	 * @param int $reassign
	 * @param object $user
	 * @return void
	 */
	public function processUserDeletion( $id, $reassign, $user ) {

		if ( empty( $reassign ) ) {

			// Delete comments
			Comment::deleteComment( null, $id );

			// Delete contents
			Contents::deleteContentsByContributor( $id );
			
		} else {

			// Replace comments
			Field::comments()->updateField( array( 'user_id' => $reassign ), array( 'user_id' => $id ) );

			// Replace reactions
			Field::reactions()->updateField( array( 'user_id' => $reassign ), array( 'user_id' => $id ) );

			// Replace contents
			Field::contents()->updateField( array( 'contributor_id' => $reassign ), array( 'contributor_id' => $id ) );
		}
	}
}
