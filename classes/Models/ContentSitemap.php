<?php
/**
 * Sitemap model
 * 
 * @package solidie
 */

namespace Solidie\Models;

/**
 * Sitemap class
 */
class ContentSitemap extends \WP_Sitemaps_Provider {

	private $per_page = 500;

	public function __construct( $name ) {
		$this->name = $name;
	}

	public function get_url_list( $page_num, $post_type = '' ) {

		global $wpdb;

		$offset = $this->per_page * ( $page_num - 1 );

		$content_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT 
					content_id
				FROM
					{$wpdb->solidie_contents}
				WHERE 
					content_status='publish'
				LIMIT %d OFFSET %d",
				$this->per_page,
				$offset
			)
		);

		$map = array();
		foreach ( $content_ids as $id ) {

			$permalink = Contents::getPermalink( $id );
			
			if ( ! empty( $permalink ) ) {
				$map[] = array(
					'loc' => $permalink
				);
			}
		}

		return $map;
	}
	
	public function get_max_num_pages( $subtype = '' ) {

		global $wpdb;
		
		$total_count = (int) $wpdb->get_var(
			"SELECT 
				COUNT(content_id) 
			FROM 
				{$wpdb->solidie_contents} 
			WHERE 
				content_status='publish'"
		);

		return ceil( $total_count / $this->per_page );
	}
}
