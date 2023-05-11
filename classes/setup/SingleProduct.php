<?php

namespace AppStore\Setup;

class SingleProduct {
	public function setup() {
		add_filter( 'single_template', array( $this, 'product_template' ) );
		add_filter( 'page_template', array( $this, 'catalog' ) );
	}

	public function product_template( $template ) {
		if ( is_singular( 'product' ) ) {
			$template = APPSTORE_DIR . 'templates/single-product.php';
		} 
		
		return $template;
	}

	public function catalog( $template ) {
		if ( isset( $_GET['catalog'] ) ) {
			$template = APPSTORE_DIR . 'templates/'.$_GET['catalog'].'.php';
		}

		return $template;
	}
}