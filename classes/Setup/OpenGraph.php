<?php
/**
 * Content meta data
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Helpers\_String;
use Solidie\Main;
use Solidie\Models\Manifest;

class OpenGraph {

	public function __construct() {

		add_action( 
			'wp', 
			function() {
				add_filter( 'document_title_parts', array( $this, 'customTitle' ) );
				add_action( 'wp_head', array( $this, 'addContentMeta' ) );
			}, 
			101 
		);
	}

	/**
	 * Alter the page title for content
	 * 
	 * @param array $title_parts
	 *
	 * @return string
	 */
	public function customTitle( $title_parts ) {

		$data    = $GLOBALS['solidie_gallery_data'] ?? array();
		$content = $data['content'] ?? null;
		$lesson  = $content ? ( $data['lesson'] ?? array() ) : array();
		$type    = $data['content_type'] ?? null;
		
		if ( ! empty( $content ) ) {
			$title_parts['title'] = $lesson['lesson_title'] ?? $content['content_title'] ?? $title_parts['title'];
			$title_parts['page']  = get_bloginfo( 'name' );

		} else if ( ! empty( $type ) ) {
			$title_parts['title'] = Manifest::getContentTypeLabel( $data['content_type'] );
			$title_parts['page']  = get_bloginfo( 'name' );
		}

		return $title_parts;
	}

	/**
	 * Add single content page meta data
	 *
	 * @return void
	 */
	public function addContentMeta() {
		$data    = $GLOBALS['solidie_gallery_data'] ?? array();
		$content = $data['content'] ?? null;
		$lesson  = $content ? ( $data['lesson'] ?? array() ) : array();
		
		if ( empty( $content ) ) {
			return;
		}

		// This variable is used inside the meta-data.php file
		$meta_data = array(
			'description'   => _String::consolidate( strip_tags( $lesson['lesson_content'] ?? $content['content_description'] ?? $content['content_title'] ) ),
			'title'         => $lesson['lesson_title'] ?? $content['content_title'] ?? '',
			'type'          => ! empty( $lesson ) ? 'article' : 'product',
			'url'           => $lesson['lesson_permalink'] ?? $content['content_permalink'],
			'thumbnail_url' => ( $content['media']['thumbnail'] ?? array() )['file_url'] ?? null,
			'create_time'   => date( 'Y-m-d H:i:s', $content['created_at'] ) . ' UTC',
			'modified_time' => date( 'Y-m-d H:i:s', $content['modified_at'] ) . ' UTC',
		);
		
		include Main::$configs->dir . 'templates/meta-data.php';
	}
}
