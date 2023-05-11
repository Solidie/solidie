<?php

namespace AppStore\Setup;

class SingleProduct {
	public function setup() {
		add_filter( 'single_template', array( $this, 'product_template' ) );
	}

	public function product_template( $template ) {
		 if ( is_singular( 'product' ) ) {
			$template = APPSTORE_DIR . 'templates/single-product.php';
		}

		return $template;
	}
}