<?php

namespace AppStore\Setup;

use AppStore\Base;
use AppStore\Models\Apps;

class WooCommerceSubscription extends Base {
	public function setup() {
		add_filter( 'woocommerce_subscription_periods', array( $this, 'custom_subscription_periods' ), 10, 2 );
		add_filter( 'woocommerce_subscription_lengths', array( $this, 'sub_length' ), 10, 2 );
		add_action( 'woocommerce_subscription_renewal_payment_complete', array( $this, 'renewal_complete' ) );
	}

	// Add custom subscription period
	function custom_subscription_periods( $periods, $billing_period ) {
		$custom_periods = self::getSubscriptionBlueprint( $billing_period );

		// Assign customs
		foreach ( $custom_periods as $key => $subscription ) {
			if ( ! isset( $periods[ $key ] ) && ( $subscription['register'] ?? false ) === true ) {
				$periods[ $key ] = $subscription['wcs_label'];
			}
		}

		// Sort
		$new_array = array();
		foreach( $custom_periods as $key => $p ) {
			if ( isset( $periods[ $key ] ) ) {
				$new_array[ $key ] = $periods[ $key ];
			}
		}

		// Add outstandings
		foreach ( $periods as $key => $period ) {
			if ( ! isset( $new_array[ $key ] ) ) {
				$new_array[ $key ] = $period;
			}
		}
		
		return $new_array;
	}

	public function sub_length( $ranges, $period ) {
		foreach ( self::getSubscriptionBlueprint( 0 ) as $key => $p ) {
			if ( isset( $ranges[ $key ] ) ) {
				continue;
			}

			$ranges[ $key ] = array( 'Never expire' );

			if ( $key !== 'lifetime' ) {
				for ( $i = 1; $i <= 45; $i ++ ) {
					$ranges[ $key ][] = $i . ' ' . $key . ( $i > 1 ? 's' : '' );
				}
			}
			
		}

		return $ranges;
	}

	public function renewal_complete( $subscription ) {
		Apps::processSubscriptionRenewal( $subscription );
	}
}