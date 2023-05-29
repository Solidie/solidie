<?php

namespace Solidie\Store;

use Solidie\Store\Helpers\Crypto;
use Solidie\Store\Setup\Dispatcher;
use Solidie\Store\Setup\Scripts;
use Solidie\Store\Setup\AdminPage;
use Solidie\Store\Setup\Utilities;
use Solidie\Store\Setup\FrontendDashboard;
use Solidie\Store\Setup\Media;
use Solidie\Store\Setup\RestAPI;
use Solidie\Store\Setup\WooCommerce;
use Solidie\Store\Setup\WooCommerceSubscription;
use Solidie\Store\Models\AdminSetting;

use Solidie\SalesReporter\Report;
use Solidie\Store\Setup\SingleProduct;
use Solidie\Updater\Updater;

class Main {
	/**
	 * Configs array
	 *
	 * @var object
	 */
	public static $configs;

	/**
	 * Initialize Plugin
	 * 
	 * @param object $configs
	 * 
	 * @return void
	 */
	public function init( object $configs ) {

		// Store configs in runtime static property
		self::$configs = $configs;
		self::$configs->crypto = Crypto::class;

		// Add prefix to linked table
		self::$configs->linked_table = self::table( $configs->linked_table );
		
		// Core Modules
		new Utilities();
		new Dispatcher();
		new Scripts();
		new AdminPage();
		new FrontendDashboard();
		new WooCommerce();
		new WooCommerceSubscription();
		new SingleProduct();
		new RestAPI();
		new Media();

		// Register sales reporter to solidie website
		new Report( $configs );
		
		// Register plugin updater (Registered item name, item main file, parent menu for license page, continous update check bool)
		new Updater( $configs );
	}

	/**
	 * App variations blueprint
	 *
	 * @return array
	 */
	protected static function getVariationBluePrint() {
		$variations =  array(
			'unlimited' => array(
				'license_key_limit' => null,
				'label'             => _x( 'Unlimited License', 'solidie', 'solidie' ),
				'period_label'      => _x( 'Unlimited License - %s', 'solidie', 'solidie' ),
			),
			'fifty' => array(
				'license_key_limit' => 50,
				'label'             => _x( '50 Licenses', 'solidie', 'solidie' ),
				'period_label'      => _x( '50 Licenses - %s', 'solidie', 'solidie' ),
			),
			'twenty' => array(
				'license_key_limit' => 20,
				'label'             => _x( '20 Licenses', 'solidie', 'solidie' ),
				'period_label'      => _x( '20 Licenses - %s', 'solidie', 'solidie' ),
			),
			'ten' => array(
				'license_key_limit' => 10,
				'label'             => _x( '10 Licenses', 'solidie', 'solidie' ),
				'period_label'      => _x( '10 Licenses - %s', 'solidie', 'solidie' ),
			),
			'five' => array(
				'license_key_limit' => 5,
				'label'             => _x( '5 Licenses', 'solidie', 'solidie' ),
				'period_label'      => _x( '5 Licenses - %s', 'solidie', 'solidie' ),
			),
			'single' => array(
				'license_key_limit' => 1,
				'label'             => _x( 'Single License', 'solidie', 'solidie' ),
				'period_label'      => _x( 'Single License - %s', 'solidie', 'solidie' ),
			),
		);

		$new_array = array();
		$subscriptions = self::getSubscriptionBlueprint( 0 );

		foreach ( $variations as $attr => $variation ) {
			foreach ( $subscriptions as $period => $subscription ) {
				$new_array[ $attr . '@' . $period ] = array_merge(
					$variation,
					array(
						'validity_days' => $subscription['days'],
						'period_label'  => sprintf( $variation['period_label'], $subscription['label'] ),
					)
				);
			}
		}
		
		return $new_array;
	}

	protected static function getSubscriptionBlueprint( int $number ) {
		return array(
			'day' => array(
				'days'      => 1,
				'label'     => _x( 'Daily', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'day',  '%s days',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'week' => array(
				'days'      => 7,
				'label'     => _x( 'Weekly', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'week',  '%s weeks',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'fortnight' => array(
				'days'      => 14,
				'label'     => _x( 'Fortnightly', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'fortnight',  '%s fortnights',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
				'register'  => true
			),
			'month' => array(
				'days'      => 30,
				'label'     => _x( 'Monthly', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'month',  '%s months',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'quarter' => array(
				'days'      => 90,
				'label'     => _x( 'Quarterly', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'quarter',  '%s quarters',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
				'register'  => true,
			),
			'year' => array(
				'days'      => 365,
				'label'     => _x( 'Yearly', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'year',  '%s years',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'lifetime' => array(
				'days'      => null, // In fact 'null' will be stored in database in case of lifetime license. 
				'label'     => _x( 'Lifetime', 'solidie', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'lifetime',  '%s lifetime',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
				'register'  => true,
			),
		);
	}

	protected static function table( string $table_name ) {
		global $wpdb;
		return $wpdb->prefix . self::$configs->db_prefix . $table_name;
	}

	protected static function getSiteCommissionRate() {
		return AdminSetting::get( 'site_commision_rate', 0 );
	}
}