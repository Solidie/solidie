<?php
/**
 * Manifest
 *
 * @package solidie
 */

namespace Solidie\Models;

/**
 * Manifest class
 */
class Manifest {
	/**
	 * Get content manifest data
	 *
	 * @return array
	 */
	public static function getManifest() {
		static $manifest = null;
		if ( null !== $manifest ) {
			return $manifest;
		}

		$manifest = array(
			'settings' => array(
				'dashboard' => array(
					'label' => __( 'Dashboard', 'solidie' ),
					'slug'  => 'dashboard',
				),
			),
			'contents' => array(
				'app'      => array(
					'label'       => __( 'App', 'solidie' ),
					'slug'        => 'apps',
					'description' => __( 'Apps, extensions, addons etc. for website, mobile, computer and so on.', 'solidie' ),
					'plans'       => array(
						'unlimited' => array(
							'license_key_limit' => null,
							'label'             => __( 'Unlimited License', 'solidie' ), // translators: Unlimited license label
							'period_label'      => __( 'Unlimited License - %s', 'solidie' ),
						),
						'fifty'     => array(
							'license_key_limit' => 50,
							'label'             => __( '50 Licenses', 'solidie' ), // translators: 50 License level
							'period_label'      => __( '50 Licenses - %s', 'solidie' ),
						),
						'twenty'    => array(
							'license_key_limit' => 20,
							'label'             => __( '20 Licenses', 'solidie' ), // translators: 20 License level
							'period_label'      => __( '20 Licenses - %s', 'solidie' ),
						),
						'ten'       => array(
							'license_key_limit' => 10,
							'label'             => __( '10 Licenses', 'solidie' ), // translators: 10 License level
							'period_label'      => __( '10 Licenses - %s', 'solidie' ),
						),
						'five'      => array(
							'license_key_limit' => 5,
							'label'             => __( '5 Licenses', 'solidie' ), // translators: 5 License level
							'period_label'      => __( '5 Licenses - %s', 'solidie' ),
						),
						'single'    => array(
							'license_key_limit' => 1,
							'label'             => __( 'Single License', 'solidie' ), // translators: Single License level
							'period_label'      => __( 'Single License - %s', 'solidie' ),
						),
					),
				),
				'audio'    => array(
					'label'       => __( 'Audio', 'solidie' ),
					'slug'        => 'audios',
					'description' => __( 'Music, beats, song and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'video'    => array(
					'label'       => __( 'Video', 'solidie' ),
					'slug'        => 'videos',
					'description' => __( 'Vlog, cinematography, film, music videos and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'image'    => array(
					'label'       => __( 'Image', 'solidie' ),
					'slug'        => 'images',
					'description' => __( 'Photography, vector etc.', 'solidie' ),
					'plans'       => array(),
				),
				'3d'       => array(
					'label'       => __( '3D Model', 'solidie' ),
					'slug'        => '3d',
					'description' => __( '3D model, VFX contents, animations and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'document' => array(
					'label'       => __( 'Document', 'solidie' ),
					'slug'        => 'documents',
					'description' => __( 'PDF, Documents, Sheet and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'font'     => array(
					'label'       => __( 'Font', 'solidie' ),
					'slug'        => 'fonts',
					'description' => __( 'Various type of fonts', 'solidie' ),
					'plans'       => array(),
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
				if ( ! in_array( $content_key, $content_types, true ) ) {
					continue;
				}

				// Exclude content if it is not supported for this specific licensing
				if ( isset( $license['for'] ) && ! in_array( $content_key, $license['for'], true ) ) {
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
				'enable' => false,
			);
		}

		// Finally return the manifest
		return $manifest;
	}

	/**
	 * Get supported plans for specific content type
	 *
	 * @param string $content_type The content type to get variation blueprint
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
			'month'    => array(
				'days'      => 30,
				'label'     => __( 'Monthly', 'solidie' ), // translators: Monthly
				'wcs_label' => sprintf( _nx( 'month', '%s months', $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'year'     => array(
				'days'      => 365,
				'label'     => __( 'Yearly', 'solidie' ), // translators: Yearly
				'wcs_label' => sprintf( _nx( 'year', '%s years', $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
			),
			'lifetime' => array(
				'days'      => null, // translators: Lifetime level
				'label'     => __( 'Lifetime', 'solidie' ),
				'wcs_label' => sprintf( _nx( 'lifetime', '%s lifetime', $number, 'Subscription billing period.', 'woocommerce-subscriptions' ), $number ),
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
		if ( null !== $lincensings ) {
			return $lincensings;
		}

		$lincensings = array(
			'personal_use'             => array(
				'label' => __( 'Personal Use License', 'solidie' ),
			),
			'commercial_use'           => array(
				'label' => __( 'Commercial Use License', 'solidie' ),
			),
			'editorial_use'            => array(
				'label' => __( 'Editorial Use License', 'solidie' ),
			),
			'exclusive_license'        => array(
				'label' => __( 'Exclusive License', 'solidie' ),
			),
			'one_time_license'         => array(
				'label' => __( 'One-Time Use License', 'solidie' ),
			),
			'multi_seat_license'       => array(
				'label' => __( 'Multi-Seat License', 'solidie' ),
			),
			'synchronization_license'  => array(
				'label' => __( 'Synchronization License', 'solidie' ),
				'for'   => array( 'audio', 'video' ),
			),
			'performance_license'      => array(
				'label' => __( 'Performance License', 'solidie' ),
				'for'   => array( 'audio' ),
			),
			'derivative_works_license' => array(
				'label' => __( 'Derivative Works License (for remixes and adaptations)', 'solidie' ),
			),
			'royalty_free'             => array(
				'label' => __( 'Royalty-Free (RF) License', 'solidie' ),
			),
			'rights_managed'           => array(
				'label' => __( 'Rights-Managed (RM) License', 'solidie' ),
			),
			'extended_license'         => array(
				'label' => __( 'Extended License', 'solidie' ),
			),
			'cc_attribution'           => array(
				'label' => __( 'CC BY (Attribution)', 'solidie' ),
			),
			'cc_attribution_nc'        => array(
				'label' => __( 'CC BY-NC (Attribution-NonCommercial)', 'solidie' ),
			),
			'cc_attribution_nd'        => array(
				'label' => __( 'CC BY-ND (Attribution-NoDerivs)', 'solidie' ),
			),
			'cc_attribution_sa'        => array(
				'label' => __( 'CC BY-SA (Attribution-ShareAlike)', 'solidie' ),
			),
			'cc_attribution_nc_nd'     => array(
				'label' => __( 'CC BY-NC-ND (Attribution-NonCommercial-NoDerivs)', 'solidie' ),
			),
			'cc_attribution_nc_sa'     => array(
				'label' => __( 'CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)', 'solidie' ),
			),
			'cc0_public_domain'        => array(
				'label' => __( 'CC0 (Public Domain Dedication)', 'solidie' ),
			),
		);

		return $lincensings;
	}

	/**
	 * Get filtered contents
	 *
	 * @param array $excludes What data to exclude
	 * @return array
	 */
	public static function getFilteredContents( $excludes = array( 'plans' ) ) {
		$manifest  = self::getManifest();
		$contents  = $manifest['contents'];
		$new_array = array();

		foreach ( $contents as $content_key => $structure ) {
			foreach ( $excludes as $ex ) {
				if ( isset( $structure[ $ex ] ) ) {
					unset( $structure[ $ex ] );
				}
			}

			$new_array[ $content_key ] = $structure;
		}

		return $new_array;
	}
}
