<?php

namespace Solidie\Setup;

use Solidie\Models\FileManager;
use Solidie\Models\Release;

class Media {
	public function __construct() {
		add_action( 'pre_get_posts', array( $this, 'hide_media_by_meta_key' ) );
	}

	public function hide_media_by_meta_key( $query ) {
		// Only modify the query for media contents
		if ( is_admin() && $query->query['post_type'] == 'attachment' ) {
			$meta_query = $query->get('meta_query');
			if ( ! is_array( $meta_query ) ) {
				$meta_query = array();
			}
			
			$meta_query[] = array(
				'key'     => FileManager::SOLIDIE_FILE_IDENTIFIER_META_KEY,
				'compare' => 'NOT EXISTS', // Hide release media contents
			);

			$query->set('meta_query', $meta_query);
		}
	}
}