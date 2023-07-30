<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Main;

class SingleProduct extends Main {
	function __construct() {
		add_filter( 'single_template', array( $this, 'product_template' ) );
	}

	public function product_template( $template ) {
		if ( is_singular( 'product' ) ) {
			$template = self::$configs->dir . 'templates/single-product.php';
		} 
		
		return $template;
	}
}