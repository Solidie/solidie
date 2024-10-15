<?php
/**
 * Shortcode registrar
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Helpers\Geo;
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
				'categories'        => Category::getCategories( true ),
				'content_countries' => Geo::getEnableCountriesPerContentType()
			)
		);

		$data                = $GLOBALS['solidie_gallery_data'] ?? array();
		$content_description = ( is_array( $data ) && is_array( $data['content'] ?? null ) ) ? $data['content']['content_description'] : '';
		$lesson              = $data['lesson'] ?? null;

		if ( ! empty( $lesson ) ) {
			$content_description = $lesson['lesson_content'] ?? null;
		}

		ob_start();
	
		if ( is_front_page() && current_user_can( 'manage_options' ) ) {
			?>
			<div style="text-align: center; color: #aa0000; margin-bottom: 15px;">
				<i><?php echo esc_html__( 'Individual content URL won\'t work properly if your set this page as home', 'solidie' ); ?></i>
			</div>
			<?php
		}
		
		?>
			<div 
				id="Solidie_Gallery" 
				style="width: 100%; margin: 0; padding: 0; max-width: 100%; padding: 20px 0;"
				data-resources="<?php esc_attr_e( json_encode( $resources ) ); ?>"
			>
				<article>
					<?php 
						echo strip_tags( ( string ) ( $content_description ?? '' ) ); 
					?>
				</article>
			</div>
		<?php

		return ob_get_clean();
	}
}
