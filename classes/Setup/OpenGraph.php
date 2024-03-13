<?php
/**
 * Content meta data
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Helpers\_String;
use Solidie\Main;
use Solidie\Models\Contents;
use Solidie\Models\Manifest;

class OpenGraph {

	private $content_cache = null;

	public function __construct() {
		add_filter( 'document_title_parts', array( $this, 'customTitle' ) );
		add_action( 'wp_head', array( $this, 'addContentMeta' ) );
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
		
		if ( ! empty( $content ) ) {
			$title_parts['title'] = $content['content_title'];
			$title_parts['page']  = Manifest::getContentTypeLabel( $data['content_type'] ) . ' - ' . get_bloginfo( 'name' );
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
		
		if ( empty( $content ) ) {
			return;
		}

		$meta_data = array(
			'description'   => _String::consolidate( strip_tags( $content['content_description'], '' ) ),
			'title'         => $content['content_title'],
			'url'           => $content['content_permalink'],
			'thumbnail_url' => ( $content['media']['thumbnail'] ?? array() )['file_url'] ?? null,
			'create_time'   => date( 'Y-m-d H:i:s', $content['created_at'] ) . ' UTC',
			'modified_time' => date( 'Y-m-d H:i:s', $content['modified_at'] ) . ' UTC',
		);
		
		include Main::$configs->dir . 'templates/meta-data.php';
	}
}
