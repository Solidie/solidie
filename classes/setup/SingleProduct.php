<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Main;

class SingleProduct extends Main {
	function __construct() {
		add_filter( 'single_template', array( $this, 'product_template' ) );
		add_filter( 'page_template', array( $this, 'catalog' ) );
	}

	public function product_template( $template ) {
		if ( is_singular( 'product' ) ) {
			$template = self::$configs->dir . 'templates/single-product.php';
		} 
		
		return $template;
	}

	public function catalog( $template ) {
		if ( isset( $_GET['catalog'] ) ) {
			$template = self::$configs->dir . 'templates/'.$_GET['catalog'].'.php';
		}

		return $template;
	}
}