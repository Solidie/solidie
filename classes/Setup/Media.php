<?php
/**
 * Media manager class
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Models\FileManager;

/**
 * Media
 */
class Media {
	/**
	 * Register media hooks
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'pre_get_posts', array( $this, 'hideMedia' ) );
	}

	/**
	 * Hide contents from WP media view
	 *
	 * @param object $query The query object to hide media thorough
	 * @return void
	 */
	public function hideMedia( $query ) {
		// Only modify the query for media contents
		if ( is_admin() && 'attachment' === $query->query['post_type'] ) {
			$meta_query = $query->get( 'meta_query' );
			if ( ! is_array( $meta_query ) ) {
				$meta_query = array();
			}

			$meta_query[] = array(
				'key'     => FileManager::SOLIDIE_FILE_IDENTIFIER_META_KEY,
				'compare' => 'NOT EXISTS', // Hide release media contents
			);

			$query->set( 'meta_query', $meta_query );
		}
	}
}
