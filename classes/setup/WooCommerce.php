<?php

namespace AppStore\Setup;

use AppStore\Models\Apps;

class WooCommerce {
	public function setup() {
		add_action( 'woocommerce_order_status_completed', array( $this, 'on_product_purchase' ) );
	}

	public function on_product_purchase( $order_id ) {
		// Process app purchase
		Apps::processPurchase( $order_id );
	}
}