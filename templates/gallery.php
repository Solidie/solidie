<?php
/**
 * Gallery renderer template
 *
 * @package solidie
 */

if ( ! defined( 'ABSPATH' ) ) { exit;
}

get_header(); ?>

<div 
	id="Solidie_Gallery" 
	data-categories="<?php echo esc_attr( wp_json_encode( Solidie\Models\Category::getCategories() ) ); ?>"
	style="margin-bottom:20px; margin-top:20px; width:100%;"></div>

<?php get_footer(); ?>
