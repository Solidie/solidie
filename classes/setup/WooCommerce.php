<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Models\Apps;

class WooCommerce {
	public function __construct() {
		add_action( 'woocommerce_order_status_completed', array( $this, 'on_product_purchase' ) );
		add_action( 'admin_notices', array( $this, 'show_wc_editor_warning' ) );
	}

	public function on_product_purchase( $order_id ) {
		// Process item purchase
		Apps::processPurchase( $order_id );
	}

	public function show_wc_editor_warning() {
		if ( ! is_admin() || ! isset( $_GET['post'], $_GET['action'] ) || $_GET['action'] !== 'edit' || ! Apps::isProductApp( (int) $_GET['post'] ) ) {
			return;
		}

		$class = 'notice notice-error';
		$message = _x('This product has been created programmatically. So you are not supposed to do edit in Product Data section if you don\'t know the exact result.', 'solidie', 'solidie' );

		printf('<div class="%1$s"><p style="color:#aa0000;font-weight:bold;">%2$s</p></div>', esc_attr($class), $message);
	}
}