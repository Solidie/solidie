<?php
/**
 * Gallery renderer template
 *
 * @package solidie
 */

use Solidie\Models\Contents;

if ( ! defined( 'ABSPATH' ) ) { exit;
}

// $type and $setting comes from ./index.php
$content_type     = $type;
$content_settings = $setting;
$content_slug     = $content_slug;
$content          = ! empty( $content_slug ) ? Contents::getContentByField( 'content_slug', $content_slug ) : null;

$GLOBALS['solidie_gallery_data'] = compact( 'content_type', 'content_settings', 'content_slug', 'content' );

get_header(); 

$resources = array(
	'categories' => Solidie\Models\Category::getCategories( true ),
);

$resources = apply_filters( 'solidie_gallery_resources', $resources, $content_type, $content_settings );

?>

<div 
	id="Solidie_Gallery" 
	data-resources="<?php echo esc_attr( wp_json_encode( $resources ) ); ?>"
	style="margin-bottom:20px; margin-top:20px; width:100%;"></div>

<?php get_footer(); ?>
