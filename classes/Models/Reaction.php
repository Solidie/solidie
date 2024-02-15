<?php
/**
 * Like dislike model
 *
 * @package solidie
 */

namespace Solidie\Models;

class Reaction {
	
	public static function getStats( $content_id, $type ) {
		global $wpdb;
		
		$total = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT 
					COUNT(reaction_id) 
				FROM 
					{$wpdb->solidie_reactions} 
				WHERE 
					content_id=%d 
					AND reaction_type=%s",
				$content_id,
				$type
			)
		);

	}
}
