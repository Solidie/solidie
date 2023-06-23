<?php

	use Solidie\Store\Main;
	use Solidie\Store\Models\AdminSetting;
	use Solidie\Store\Setup\AdminPage;

	$page           = get_query_var( AdminPage::$pagename_key );
	$parsed         = parse_url( Main::$configs->current_url );
	$url_path       = $parsed['scheme'] . '://' . $parsed['host'] . ( $parsed['port'] ? ':' . $parsed['port'] : '' ) . ( $parsed['path'] ?? '' );
	$projected_path = get_home_url() . '/' . $page;

	if ( strpos( $url_path, $projected_path ) !== 0 ) {
		var_dump( $url_path, $projected_path );
		echo 'Invalid Page';
		return;
	}

	$sub_pages = array_filter(explode( '/', trim( trim( str_replace( $projected_path, '', $url_path ), '/' ) ) ) );
	
	// Now load content
	if ( AdminSetting::get( 'dashboard.slug' ) == $page ) {
		require Main::$configs->dir . 'templates/frontend-dashboard.php';

	} else if ( AdminSetting::get( 'catalog.slug' ) == $page ) {
		require Main::$configs->dir . 'templates/filter-catalog.php';

	} else {
		$template = null;
		$contents = AdminSetting::get( 'contents' );

		// Loop through contents
		foreach ( $contents as $content ) {
			if ( $content['slug'] == $page ) {
				$template = Main::$configs->dir . 'templates/single-product.php';
				break;
			}
		}
		
		if ( $template ) {
			require $template;
		} else {
			echo 'Invalid Request!';
		}
	}
?>
