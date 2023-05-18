<?php

namespace Solidie\AppStore;

use Solidie\AppStore\Setup\Dispatcher;
use Solidie\AppStore\Setup\Scripts;
use Solidie\AppStore\Setup\AdminPage;
use Solidie\AppStore\Setup\Utilities;
use Solidie\AppStore\Setup\FrontendDashboard;
use Solidie\AppStore\Setup\Media;
use Solidie\AppStore\Setup\RestAPI;
use Solidie\AppStore\Setup\WooCommerce;
use Solidie\AppStore\Setup\WooCommerceSubscription;
use Solidie\AppStore\Models\AdminSetting;

use Solidie\SalesReporter\Report;
use Solidie\Updater\Updater;

class Main {
	/**
	 * Configs array
	 *
	 * @var object
	 */
	protected static $configs;

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
		
		// Core Modules
		new Utilities();
		new Dispatcher();
		new Scripts();
		new AdminPage();
		new FrontendDashboard();
		new WooCommerce();
		new WooCommerceSubscription();
		new RestAPI();
		new Media();

		// Register sales reporter to solidie website
		new Report();
		
		// Register plugin updater (Registered app name, app main file, parent menu for license page, continous update check)
		new Updater( 'appstore-test', self::$configs->file, 'appstore' );
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
				'label'             => _x( 'Unlimited License', 'appstore', 'appstore' ),
				'period_label'      => _x( 'Unlimited License - %s', 'appstore', 'appstore' ),
			),
			'fifty' => array(
				'license_key_limit' => 50,
				'label'             => _x( '50 Licenses', 'appstore', 'appstore' ),
				'period_label'      => _x( '50 Licenses - %s', 'appstore', 'appstore' ),
			),
			'twenty' => array(
				'license_key_limit' => 20,
				'label'             => _x( '20 Licenses', 'appstore', 'appstore' ),
				'period_label'      => _x( '20 Licenses - %s', 'appstore', 'appstore' ),
			),
			'ten' => array(
				'license_key_limit' => 10,
				'label'             => _x( '10 Licenses', 'appstore', 'appstore' ),
				'period_label'      => _x( '10 Licenses - %s', 'appstore', 'appstore' ),
			),
			'five' => array(
				'license_key_limit' => 5,
				'label'             => _x( '5 Licenses', 'appstore', 'appstore' ),
				'period_label'      => _x( '5 Licenses - %s', 'appstore', 'appstore' ),
			),
			'single' => array(
				'license_key_limit' => 1,
				'label'             => _x( 'Single License', 'appstore', 'appstore' ),
				'period_label'      => _x( 'Single License - %s', 'appstore', 'appstore' ),
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
				'label'     => _x( 'Daily', 'appstore', 'appstore' ),
				'wcs_label' => sprintf( _nx( 'day',  '%s days',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'week' => array(
				'days'      => 7,
				'label'     => _x( 'Weekly', 'appstore', 'appstore' ),
				'wcs_label' => sprintf( _nx( 'week',  '%s weeks',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'fortnight' => array(
				'days'      => 14,
				'label'     => _x( 'Fortnightly', 'appstore', 'appstore' ),
				'wcs_label' => sprintf( _nx( 'fortnight',  '%s fortnights',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
				'register'  => true
			),
			'month' => array(
				'days'      => 30,
				'label'     => _x( 'Monthly', 'appstore', 'appstore' ),
				'wcs_label' => sprintf( _nx( 'month',  '%s months',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'quarter' => array(
				'days'      => 90,
				'label'     => _x( 'Quarterly', 'appstore', 'appstore' ),
				'wcs_label' => sprintf( _nx( 'quarter',  '%s quarters',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
				'register'  => true,
			),
			'year' => array(
				'days'      => 365,
				'label'     => _x( 'Yearly', 'appstore', 'appstore' ),
				'wcs_label' => sprintf( _nx( 'year',  '%s years',  $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'lifetime' => array(
				'days'      => null, // In fact 'null' will be stored in database in case of lifetime license. 
				'label'     => _x( 'Lifetime', 'appstore', 'appstore' ),
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