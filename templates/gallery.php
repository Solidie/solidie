<?php
/**
 * Gallery renderer template
 *
 * @package solidie
 */

if ( ! defined( 'ABSPATH' ) ) { exit;
}

// $type and $setting comes from ~/templates/index.php
$content_type     = $type;
$content_settings = $setting;

get_header(); 

$resources = array(
	'categories' => Solidie\Models\Category::getCategories(),
);

$resources = apply_filters( 'solidie_gallery_resources', $resources, $content_type, $content_settings );

?>

<div 
	id="Solidie_Gallery" 
	data-resources="<?php echo esc_attr( wp_json_encode( $resources ) ); ?>"
	style="margin-bottom:20px; margin-top:20px; width:100%;"></div>

<?php get_footer(); ?>
