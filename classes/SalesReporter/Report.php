<?php

namespace Solidie\SalesReporter;

class Report {
	/**
	 * Content & Site configs
	 *
	 * @var object
	 */
	private $configs;

	// private $solidie_endpoint = 'https://solidie.com/cashier/api/';
	private static $solidie_endpoint = 'http://localhost:10008/cashier/api/';

	/**
	 * Key prefixes to manage reoport
	 *
	 * @var string
	 */
	private $trans_key;
	private $cron_key;
	private $end_key;

	/**
	 * URLs the reporter should not run in case of
	 *
	 * @var array
	 */
	private static $skip_domains = array(
		'https://solidie.com',
	);

	/**
	 * Classs Constructor
	 *
	 * @param object $configs
	 */
    function __construct( object $configs ) {
		if ( in_array( untrailingslashit( get_home_url() ), self::$skip_domains ) ) {
			// Skip this functionalities if it is Solidie production site
			return;
		}
		
		// Generate transient and cron name
		$this->trans_key = $this->getKey( 'trans' );
		$this->cron_key  = $this->getKey( 'cron' );
		$this->end_key   = $this->getKey( 'endpoint' );

		// Store the configs
		$this->configs = $configs;

		// Track product purchase for paid content revenue share on sale price
		add_action( 'woocommerce_order_status_completed', array( $this, 'on_product_purchase' ) );

		// Register hook that pushes data to solidie
		add_action( $this->cron_key, array( $this, 'update_check' ) );

		// Report to solidie once per day
		if ( ! wp_next_scheduled( $this->cron_key ) ) {
			wp_schedule_event( time(), 'daily', $this->cron_key );
		}
		
		// Register admin dashboard page for sales and view report
		add_action( 'admin_menu', array( $this, 'add_report_page' ), 20 );

		add_action( 'init', function() {
			if ( isset( $_GET['solid_push'] ) ) {
				$this->update_check(); exit;
			}
		} );
    }

	/**
	 * Get the report stored in transient
	 *
	 * @return array
	 */
	private function getReport() {
		$report = get_transient( $this->trans_key );
		$report = ! is_array( $report ) ? array() : $report;
		
		// Create endpoint specific array under report
		if ( ! is_array( $report[ $this->end_key ] ?? null ) ) {
			$report[ $this->end_key ] = array();
		}

		return $report;
	}

	/**
	 * Push reports to Solidie and purge transient
	 *
	 * @return void
	 */
	public function update_check() {
		$report  = $this->getReport();
		if ( empty( $report[ $this->end_key ] ) ) {
			return;
		}

		$payload =  array(
			'endpoint'  => get_home_url(),
			'content_name'  => $this->configs->content_name,
			'action'    => 'update-check',
			'report'    => $report[ $this->end_key ],
			'token'     => $this->configs->crypto::encrypt( json_encode( array( 'time' => time() ) ) ),
		);

		$request = wp_remote_post( self::$solidie_endpoint, array( 'body' => $payload ) );
		$response = ( ! is_wp_error( $request ) && is_array( $request ) ) ? @json_decode( $request['body'] ?? null ) : null;

		// Set fall back
		$response          = is_object( $response ) ? $response : new \stdClass();
		$response->success = $response->success ?? false;
		$response->data    = $response->data ?? new \stdClass();
		
		echo( $request['body'] );
		// print_r( $response );
	}

	/**
	 * Return unique key for hook and transient
	 *
	 * @param string $salt
	 * @return string
	 */
	private function getKey( string $salt ) {
		$url     = get_home_url();
		$letters = array_map( 'chr', range( 97, 122 ) );
		$count   = strlen( $url );
		$sliced  = array_slice( $letters, $count );
		$key     = $url . $salt .  implode( '', $sliced );
		$key     = preg_replace( '/[^a-zA-Z0-9]/', '', base64_encode( $key ) );
		$key     = substr( $key, floor( strlen( $key ) / 2 ) ) . substr( $key, 0, floor( strlen( $key ) / 2 ) );
		$key     = ( $sliced[0] ?? 'a' ) . $key;
		
		return $key;
	}

	private function isSolidieContent( $post_id ) {
		
		$column = $this->configs->linked_column;
		$table  = $this->configs->linked_table;

		$ancestor_ids = array_filter( array_unique( array_merge( get_post_ancestors( $post_id ), array( $post_id ) ) ) ) ;
		$implodes     = implode( ',', $ancestor_ids );

		if ( empty( $ancestor_ids ) ) {
			return false;
		}
		
		global $wpdb;
		return $wpdb->get_var( "SELECT link.{$column} FROM {$table} link INNER JOIN {$wpdb->posts} content ON link.{$column}=content.ID WHERE content.ID IN ({$implodes}) LIMIT 1" );
	}

	/**
	 * Store sales report on purchase
	 *
	 * @param int $order_id
	 * @return void
	 */
	public function on_product_purchase( $order_id ) {
		$order      = wc_get_order( $order_id ); 
		$contents      = $order->get_items();
		$report_ids = array();

		// Loop through ordered content in the order
		foreach ( $contents as $content ) {
			$product_id = $content->get_product_id();
			if ( $this->isSolidieContent( $product_id ) ) {
				// To Do: Convert to dollar first if not already
				$report_ids[ $product_id ] = (float) $content->get_total();
			}
		}

		// Store if any solidie content sold
		if ( ! empty( $report_ids ) ) {
			$report = $this->getReport();
			$report[ $this->end_key ] = array_replace_recursive( $report[ $this->end_key ], array( $order_id => $report_ids ) );
			set_transient( $this->trans_key, $report, 315360000 );
		}
	}

	/**
	 * Register a menu to show reveneu share related stuffs
	 *
	 * @return void
	 */
	public function add_report_page() {
		add_submenu_page( $this->configs->root_menu_slug, __( 'Partnership' ), __( 'Partnership' ), 'manage_options', 'subscription', array( $this, 'subscription_page' ) );
	}

	/**
	 * Reveneu share contents
	 *
	 * @return void
	 */
	public function subscription_page() {
		$payload = array(
			'action'   => 'payment',
			'amount'   => 23,
			'endpoint' => get_home_url(),
			'content_name' => $this->configs->content_name,
		);
		$payment_url = self::$solidie_endpoint . '?' . http_build_query( $payload );
		require __DIR__ . '/templates/reports.php';
	}
}