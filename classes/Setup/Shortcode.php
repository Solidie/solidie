<?php
/**
 * Shortcode registrar
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Models\AdminSetting;
use Solidie\Models\Category;

/**
 * Shortcode class
 */
class Shortcode {

	const GALLERY_CODE = 'solidie_content_gallery';

	/**
	 * Register shortcode
	 */
	public function __construct() {
		add_shortcode( self::GALLERY_CODE, array( $this, 'renderGalelry' ) );
	}

	/**
	 * Render contents for gallery shortcode
	 *
	 * @param array $attrs
	 * @return string
	 */
	public function renderGalelry( $attrs ) {

		if ( ! ( $attrs['_internal_call_'] ?? false ) ) {
			
			$page_id = get_the_ID();

			if ( $page_id !== AdminSetting::getGalleryPageId() ) {
				return '<div style="text-align-center; color:#aa0000;">
					' . sprintf(
						__( '[%s] shortcode will work only if you set this page as Gallery in %sSettings%s.' ), 
						self::GALLERY_CODE, 
						'<a href="' . add_query_arg( array( 'page' => AdminPage::SETTINGS_SLUG ), admin_url( 'admin.php' ) ) . '#/settings/general/gallery/">', 
						'</a>'
					) . '
				</div>';
			}
		}
		
		$resources = apply_filters(
			'solidie_gallery_resources', 
			array(
				'categories' => Category::getCategories( true ),
			)
		);

		$data                = $GLOBALS['solidie_gallery_data'] ?? array();
		$content_description = ( is_array( $data ) && is_array( $data['content'] ?? null ) ) ? $data['content']['content_description'] : '';

		return '<div 
			id="Solidie_Gallery" 
			style="width: 100%; margin: 0; padding: 0; max-width: 100%;"
			data-resources="' . esc_attr( json_encode( $resources ) ) . '"
		><article>' . $content_description . '</article></div>';
	}
}
