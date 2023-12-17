<?php

use Solidie\Models\Category;

 get_header(); ?>

<div 
	id="Solidie_Catalog" 
	data-categories="<?php echo esc_attr( json_encode( Category::getCategories() ) ); ?>"
	style="margin-bottom:20px;margin-top:20px;"></div>

<?php get_footer(); ?>
