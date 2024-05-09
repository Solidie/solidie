<meta name="description" content="<?php echo esc_attr( $meta_data['description'] ); ?>" />

<!-- Facebook Open Graph Meta Tags -->
<meta property="og:title" content="<?php echo esc_attr( $meta_data['title'] ); ?>" />
<meta property="og:type" content="<?php echo esc_attr( $meta_data['type'] ); ?>">
<meta property="og:description" content="<?php echo esc_attr( $meta_data['description'] ); ?>" />
<meta property="og:url" content="<?php echo esc_attr( $meta_data['url'] ); ?>" />
<meta property="og:image" content="<?php echo $meta_data['thumbnail_url']; ?>" />
<meta property="og:site_name" content="<?php echo get_bloginfo( 'name' ) ?>" />
<meta property="article:published_time" content="<?php echo $meta_data['create_time']; ?>" />
<meta property="article:modified_time" content="<?php echo $meta_data['modified_time']; ?>" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<?php echo esc_attr( $meta_data['title'] ); ?>" />
<meta name="twitter:description" content="<?php echo esc_attr( $meta_data['description'] ); ?>" />
<meta name="twitter:image" content="<?php echo $meta_data['thumbnail_url']; ?>" />
<meta name="twitter:url" content="<?php echo esc_attr( $meta_data['url'] ); ?>" />
