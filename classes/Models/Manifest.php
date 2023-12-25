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
					'plans'       => array(),
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
	 * @param string $content_type The content type to get plans from
	 * @return array
	 */
	public static function getContentPlans( string $content_type ) {
		$content = self::getManifest()['contents'][ $content_type ] ?? array();
		return $content['plans'] ?? array();
	}
}
