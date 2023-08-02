<?php

namespace Solidie\Store\Models;

class Manifest {
	public static function getManifest() {
		static $manifest = null;
		if ( $manifest !== null ) {
			return $manifest;
		}

		$manifest = array (
			'settings' => array(
				'dashboard' => array (
					'label' => 'Dashboard', 
					'slug'  => 'dashboard', 
				), 
				'content' => array ( // For single content page
					'full_width' => false, 
				),
			),
			'contents' => array ( 
				'app' => array ( 
					'label'       => 'App', 
					'slug'        => 'apps', 
					'description' => 'Applications for website, android, windows, linux, mac and so on.', 
					'plans'       => array(
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
					)
				), 
				'audio' => array ( 
					'label'       => 'Audio', 
					'slug'        => 'audios', 
					'description' => 'Audio contents like music, podcast and so on.',
					'plans' => array(),
				), 
				'video' => array ( 
					'label' => 'Video', 
					'slug' => 'videos', 
					'description' => 'Video contents like travel vlog, cinematography, templates and so on.', 
					'plans' => array(),
				), 
				'image' => array ( 
					'label'       => 'Image', 
					'slug'        => 'images', 
					'description' => 'Different types of images', 
					'plans'       => array(),
					'catagories'  => array(
						'photograph'   => 'Photograph',
						'vector'       => 'Vector',
						'illustration' => 'Illustration',
						'ai'           => 'AI',
						'editorial'    => 'Editorial',
						'texture'      => 'Texture',
					)
				), 
				'3d' => array ( 
					'label' => '3D', 
					'slug' => '3d', 
					'description' => '3D mondels in various formats', 
					'plans' => array(),
				), 
				'document' => array ( 
					'label' => 'Document', 
					'slug' => 'documents', 
					'description' => 'Ebook, Sheet and other similar documents.', 
					'plans' => array(),
				), 
				'tutorial' => array ( 
					'label' => 'Tutorial', 
					'slug' => 'tutorials', 
					'description' => 'Tutorial and written documentations.', 
					'plans' => array(),
				), 
				'font' => array ( 
					'label' => 'Font', 
					'slug' => 'fonts', 
					'description' => 'Various fonts', 
					'plans' => array(),
				),
			), 
		);


		// Prepare app plans
		$new_array = array();
		$periods   = self::getPeriods();
		foreach ( $manifest['contents']['app']['plans'] as $attr => $variation ) {
			foreach ( $periods as $period => $data ) {
				$new_array[ $attr . '@' . $period ] = array_merge(
					$variation,
					array(
						'validity_days' => $data['days'],
						'period_label'  => sprintf( $variation['period_label'], $data['label'] ),
					)
				);
			}
		}
		$manifest['contents']['app']['plans'] = $new_array;


		// Now prepare plans for audio, video, image, 3d, document and font together as these are similar in terms of usage. 
		// Tutorial doesn't need any plan as it is not downloadable or subscription based. It is onetime purchase, lifetime access no matter gets update or not. 
		// If tutorial is written as part of other contents such as app or video template, then customers don't need to purchase it separately as they've done so for the main content already.
		// Tutorial can be purchased and showcased separately only if it is created independently as not part of other contents.
		$lincensings   = self::getLicensings();
		$content_types = array_diff( array_keys( $manifest['contents'] ), array( 'app', 'tutorial' ) );

		// Loop through license types
		foreach ( $lincensings as $license_key => $license ) {

			// Loop through contents
			foreach ( $manifest['contents'] as $content_key => $content ) {
				// Exclude unspoorted types for generic licensings
				if ( ! in_array( $content_key, $content_types ) ) {
					continue;
				}

				// Exclude content if it is not supported for this specific licensing
				if ( isset( $license['for'] ) && ! in_array( $content_key, $license['for'] ) ) {
					continue;
				}

				$manifest['contents'][ $content_key ]['plans'][ $license_key ] = $license;
			}
		}

		// Get this through filter for modification by others
		$manifest = apply_filters( 'solidie_manifest', $manifest );

		// Add the content type array in content settings
		$manifest['settings']['contents'] = array();
		foreach ( array_keys( $manifest['contents'] ) as $type ) {
			$manifest['settings']['contents'][ $type ] = array(
				'slug'   => $type,
				'enable' => false
			);
		}

		// Finally return the manifest
		return $manifest;
	}

	/**
	 * Get supported plans for specific content type
	 *
	 * @param string $content_type
	 * @return array
	 */
	public static function getVariationBluePrint( string $content_type ) {
		$content = self::getManifest()['contents'][ $content_type ] ?? array();
		return $content['plans'] ?? array();
	}

	/**
	 * Get periods for WooCommerce specific usage
	 *
	 * @param integer $number Normally non zero expected, however 0 can be used as placeholder where wcs_label will not be used.
	 * 
	 * @return array
	 */
	public static function getPeriods( $number = 0 ) {
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

	/**
	 * Get available licensencings used nowadays
	 *
	 * @return array
	 */
	private static function getLicensings() {
		static $lincensings = null;
		if ( $lincensings !== null ) {
			return $lincensings;
		}

		$lincensings = array(
			'personal_use'             => array(
				'label'                => _x( 'Personal Use License', 'solidie', 'solidie' ), 
			),    
			'commercial_use'           => array(
				'label'                => _x( 'Commercial Use License', 'solidie', 'solidie' ), 
			),    
			'editorial_use'            => array( 
				'label'                => _x( 'Editorial Use License', 'solidie', 'solidie' ), 
			),    
			'exclusive_license'        => array(
				'label'                => _x( 'Exclusive License', 'solidie', 'solidie' ), 
			),    
			'one_time_license'         => array(
				'label'                => _x( 'One-Time Use License', 'solidie', 'solidie' ), 
			),    
			'multi_seat_license'       => array(
				'label'                => _x( 'Multi-Seat License', 'solidie', 'solidie' ), 
			), 
			'synchronization_license'  => array(
				'label'                => _x( 'Synchronization License', 'solidie', 'solidie' ), 
				'for'                  => array( 'audio', 'video' )
			),    
			'performance_license'      => array(
				'label'                => _x( 'Performance License', 'solidie', 'solidie' ), 
				'for'                  => array( 'audio' )
			),
			'derivative_works_license' => array(
				'label'                => _x( 'Derivative Works License (for remixes and adaptations)', 'solidie', 'solidie' ),
			),    
			'royalty_free'             => array(
				'label'                => _x( 'Royalty-Free (RF) License', 'solidie', 'solidie' ),
			),     
			'rights_managed'           => array(
				'label'                => _x( 'Rights-Managed (RM) License', 'solidie', 'solidie' ), 
			),    
			'extended_license'         => array(
				'label'                => _x( 'Extended License', 'solidie', 'solidie' ), 
			),    
			'cc_attribution'           => array(
				'label'                => _x( 'CC BY (Attribution)', 'solidie', 'solidie' ), 
			),    
			'cc_attribution_nc'        => array(
				'label'                => _x( 'CC BY-NC (Attribution-NonCommercial)', 'solidie', 'solidie' ), 
			),    
			'cc_attribution_nd'        => array(
				'label'                => _x( 'CC BY-ND (Attribution-NoDerivs)', 'solidie', 'solidie' ), 
			),    
			'cc_attribution_sa'        => array(
				'label'                => _x( 'CC BY-SA (Attribution-ShareAlike)', 'solidie', 'solidie' ), 
			),    
			'cc_attribution_nc_nd'     => array(
				'label'                => _x( 'CC BY-NC-ND (Attribution-NonCommercial-NoDerivs)', 'solidie', 'solidie' ), 
			),    
			'cc_attribution_nc_sa'     => array(
				'label'                => _x( 'CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)', 'solidie', 'solidie' ), 
			),    
			'cc0_public_domain'        => array(
				'label'                => _x( 'CC0 (Public Domain Dedication)', 'solidie', 'solidie' )
			),
		);

		return $lincensings;
	}
}
