<?php
/**
 * Catalog renderer template
 *
 * @package solidie
 */

use Solidie\Models\Category;

get_header(); ?>

<div 
	id="Solidie_Catalog" 
	data-categories="<?php echo esc_attr( wp_json_encode( Category::getCategories() ) ); ?>"
	style="margin-bottom:20px; margin-top:20px; width:100%;"></div>

<?php get_footer(); ?>
