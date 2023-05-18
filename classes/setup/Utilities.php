<?php

namespace Solidie\AppStore\Setup;

class Utilities {
	public function __construct() {
		add_filter( 'clean_url', array( $this, 'clean_url' ) );
	}

	/**
	 * Remove extra slashes from URL
	 *
	 * @param string $url
	 * @return string
	 */
	public function clean_url( string $url ) {
		return preg_replace('#([^:])//+#', '$1/', $url);
	}
}