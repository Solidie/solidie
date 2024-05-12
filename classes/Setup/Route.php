<?php
/**
 * Custom routes manager for contents
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Models\AdminSetting;
use Solidie\Models\Category;
use Solidie\Models\Contents;
use Solidie\Models\Tutorial;

/**
 * Route manager class
 */
class Route {

	/**
	 * The route to capture custom url format
	 */
	const KEY = 'solidie-route';

	/**
	 * Route constructor
	 */
	public function __construct() {

		add_action( 'wp', array( $this, 'prepareContentData' ), 100 );

		// Create a gallery page to load in side
		add_action( 'solidie_db_deployed', array( $this, 'createGalleryPage' ) );

		// Register routes
		add_filter( 'query_vars', array( $this, 'registerPagename' ) );
		add_action( 'generate_rewrite_rules', array( $this, 'addRewriteRules' ) );
		add_filter( 'the_content', array( $this, 'renderGallery' ) );

		// Trigger flush rewrite
		add_action( 'solidie_pro_activated', array( $this, 'triggerRewrite' ), 100 );
		add_action( 'solidie_db_deployed', array( $this, 'triggerRewrite' ), 100 );
		add_action( 'solidie_settings_updated', array( $this, 'triggerRewrite' ), 100 );
	}

	/**
	 * Prepare gallery data to render gallery and meta data
	 *
	 * @return void
	 */
	public function prepareContentData() {
		
		// Return original content if it is not careers page
		if ( is_admin() || get_the_ID() !== AdminSetting::getGalleryPageId() ) {
			$GLOBALS['solidie_gallery_data'] = null;
			return;
		}

		// Prepare content access segments
		$segments     = explode( '/', trim( get_query_var( self::KEY ), '/' ) );
		$page         = $segments[0] ?? '';
		$content_slug = $segments[1] ?? null;
		$lesson_slug  = count( $segments ) > 2 ? end( $segments ) : null;

		// Load the gallery/single template if the content type is enabled
		$gallery_page_id  = get_the_ID();
		$content_settings = AdminSetting::getContentSettings();
		$content_type     = null;
		foreach ( $content_settings as $type => $setting ) {
			if ( true === $setting['enable'] && $page === $setting['slug'] ) {
				$content_type = $type;
				break;
			}
		}

		// Get the content now
		$content = ! empty( $content_slug ) ? Contents::getContentByField( 'content_slug', $content_slug ) : null;
		$lesson  = ( $content && ! empty( $lesson_slug )) ? Tutorial::getLesson( $content['content_id'], Tutorial::getLessonIdBySlug( $lesson_slug ) ) : null;

		$GLOBALS['solidie_gallery_data'] = compact( 
			'content_type', 
			'content_settings', 
			'content_slug', 
			'content',
			'lesson_slug', 
			'lesson',
			'gallery_page_id'
		);
	}

	/**
	 * Create gallery page if not already
	 *
	 * @return void
	 */
	public function createGalleryPage() {

		// Check if the page is accessible
		$page_id = AdminSetting::getGalleryPageId();
		if ( ! empty( $page_id ) ) {
			$page = get_post( $page_id );
			if ( ! empty( $page ) && is_object( $page ) && $page->post_status === 'publish' ) {
				return;
			}
		}

		$page_id = wp_insert_post(
			array(
				'post_title'   => __( 'Gallery', 'solidie' ),
				'post_content' => '[' . Shortcode::GALLERY_CODE . ']',
				'post_status'  => 'publish',
				'post_type'    => 'page',
			)
		);

		if ( is_numeric( $page_id ) ) {
			AdminSetting::saveSingle( 'gallery_page_id', $page_id );
		}
	}

	/**
	 * Register var
	 *
	 * @param array $vars Query vars
	 *
	 * @return array
	 */
	public function registerPagename( $vars ) {
		$vars[] = self::KEY;
		return $vars;
	}

	/**
	 * Trigger rewrite rules on Solidie settings update.
	 * This one should be called as last as possible.
	 *
	 * @return void
	 */
	public function triggerRewrite() {
		flush_rewrite_rules();
	}

	/**
	 * Add rewrite rule to support job id and action slug
	 *
	 * @param object $wp_rewrite The rewrite rule to modify
	 * @return void
	 */
	public function addRewriteRules( $wp_rewrite ) {
		$careers_page_id   = AdminSetting::getGalleryPageId();
		$careers_page_slug = get_post_field( 'post_name', $careers_page_id );

		// ~/careers/23/
		$new_rules[ "({$careers_page_slug})/(.+?)/?$" ] = 'index.php?pagename=' . $wp_rewrite->preg_index( 1 ) . '&' . self::KEY . '=' . $wp_rewrite->preg_index( 2 );

		$wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
	}

	/**
	 * Output mountpoint for careers component
	 *
	 * @param string $contents The contents of other pages
	 * @return string
	 */
	public function renderGallery( $contents ) {

		$data = $GLOBALS['solidie_gallery_data'] ?? null;

		if ( $data === false ) {
			$contents = '<div style="text-align:center;">' . __( 'Content Not Found', 'solidie' ) . '</div>';

		} else if( is_array( $data ) ) {
			if ( ! has_shortcode( $contents, Shortcode::GALLERY_CODE ) ) {
				$contents = do_shortcode( '[' . Shortcode::GALLERY_CODE . ' _internal_call_=1]' );
			}
		}

		return $contents;
	}
}
