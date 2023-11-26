<?php

namespace Solidie\Controllers;

use Solidie\Models\Contents;
use Solidie\Models\Release;
use Solidie\Models\Sale;
use Solidie\Models\Store;

class ContentController {
	const PREREQUISITES = array(
		'getContentList' => array(
			'nopriv' => true
		),
		'createOrUpdateContent' => array(),
		'fetchReleases' => array(),
		'versionRelease' => array(),
		'getPurchasedContents' => array(),
		'addToCart' => array(),
		'getSalesData' => array(),
		'getSubscriptionsData' => array()
	);

	/**
	 * Provide content list for various area like dashboard, catalog and so on.
	 *
	 * @return void
	 */
	public static function getContentList() {
		$content_list = Contents::getContents( $_POST );
		wp_send_json_success( array( 'contents' => $content_list ) );
	}

	/**
	 * Create or update content from frontend dashboard
	 *
	 * @return void
	 */
	public static function createOrUpdateContent() {
		$content_data = $_POST['content_data'];

		// To Do: Check if the product created by current user or the user is administrator/editor or privileged

		Contents::updateContent( $content_data );

		wp_send_json_success();
	}

	/**
	 * Get content release history
	 *
	 * @return void
	 */
	public static function fetchReleases() {
		$releases = Contents::getReleases( (int) $_POST['content_id'] );
		wp_send_json_success( array( 'releases' => $releases ) );
	}

	/**
	 * Create or update version
	 *
	 * @return void
	 */
	public static function versionRelease() {
		// Check if main three parameter received
		if ( empty( $_POST['version'] ) || empty( $_POST['changelog'] ) || empty( $_POST['content_id'] ) ) {
			wp_send_json_error( array( 'message' => __( 'Required release data missing!', 'solidie' ) ) );
			exit;
		}

		// File is required for new release, release id will be falsy if it is new release.
		if ( empty( $_POST['release_id'] ) ) {
			if ( empty( $_FILES['file'] ) || ! empty( $_FILES['file']['error'] ) ) {
				wp_send_json_error( array( 'message' => __( 'Valid file is required for new release!', 'solidie' ) ) );
				exit;
			}
		}

		// To Do: Check if current user can create/update release for the content

		$error_message = Release::pushRelease(
			array(
				'version'    => $_POST['version'],
				'changelog'  => $_POST['changelog'],
				'content_id'    => $_POST['content_id'],
				'release_id' => ! empty( $_POST['release_id'] ) ? (int) $_POST['release_id'] : 0,
				'file'       => ! empty( $_FILES['file'] ) ? $_FILES['file'] : null
			)
		);

		if ( empty( $error_message ) ) {
			wp_send_json_success();
		} else {
			wp_send_json_error( array( 'message' => $error_message ) );
		}
		
		exit;
	}

	/**
	 * Get purchased content list for personal dashboard
	 *
	 * @return void
	 */
	public static function getPurchasedContents() {
		$content_list = Contents::getContents( array_merge( $_POST, array( 'customer_id' => get_current_user_id() ) )  );
		wp_send_json_success( array( 'contents' => $content_list ) );
	}

	/**
	 * Add content to cart
	 *
	 * @return void
	 */
	public static function addToCart() {
		$product_id   = $_POST['product_id'];
		$variation_id = $_POST['variation_id'];
		$content_id   = $_POST['content_id'];

		if ( ! wc_get_product( $product_id ) ) {
			wp_send_json_error( array( 'message' => __( 'Product Not Fund!', 'solidie' ) ) );
			exit;
		}
	
		// Add the product to the cart
		WC()->cart->add_to_cart( $product_id, 1, $variation_id );
		wp_send_json_success(
			array( 
				'message'  => __( 'Added to cart', 'solidie' ), 
				'cart_url' => wc_get_cart_url(),
			)
		);
		exit;
	}

	/**
	 * Provide sales data for dashboard
	 *
	 * @return void
	 */
	public function getSalesData() {
		// To do: Make sure to get only user access based data
		$sales = Sale::getSales( $_POST );
		return wp_send_json_success( array( 'sales' => $sales ) );
	}

	/**
	 * Get subscription data for current user
	 *
	 * @return void
	 */
	public function getSubscriptionsData() {
		
	}
}