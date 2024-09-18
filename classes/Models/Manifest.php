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

		$manifest = array(
			'settings' => array(
				'general'  => array(
					'free_download_label'          => 'Free',
					'free_download_description'    => 'This content is eligible to download for free',
					'enable_content_sitemap'       => true,
					'pagination_contents_per_page' => 20,
					'color_scheme_materials'       => '#236BFE',
					'color_scheme_texts'           => '#1A1A1A',
				),
				'contents' => array(
					// This array will be filled with content types
				),
			),
			'contents' => array(
				'app'      => array(
					'label'       => esc_html__( 'App', 'solidie' ),
					'slug'        => 'apps',
					'description' => esc_html__( 'Apps, extensions, addons etc. for website, mobile, computer and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'audio'    => array(
					'label'       => esc_html__( 'Audio', 'solidie' ),
					'slug'        => 'audios',
					'description' => esc_html__( 'Music, beats, song and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'video'    => array(
					'label'       => esc_html__( 'Video', 'solidie' ),
					'slug'        => 'videos',
					'description' => esc_html__( 'Vlog, cinematography, film, music videos and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'image'    => array(
					'label'       => esc_html__( 'Image', 'solidie' ),
					'slug'        => 'images',
					'description' => esc_html__( 'Photography, vector etc.', 'solidie' ),
					'plans'       => array(),
				),
				'3d'       => array(
					'label'       => esc_html__( '3D Model', 'solidie' ),
					'slug'        => '3d',
					'description' => esc_html__( '3D model, VFX contents, animations and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'document' => array(
					'label'       => esc_html__( 'Document', 'solidie' ),
					'slug'        => 'documents',
					'description' => esc_html__( 'PDF, Documents, Sheet and so on.', 'solidie' ),
					'plans'       => array(),
				),
				'font'     => array(
					'label'       => esc_html__( 'Font', 'solidie' ),
					'slug'        => 'fonts',
					'description' => esc_html__( 'Various type of fonts', 'solidie' ),
					'plans'       => array(),
				),
				'classified' => array(
					'label'       => esc_html__( 'Classified', 'solidie' ),
					'slug'        => 'listings',
					'description' => esc_html__( 'Classified listings', 'solidie' ),
					'plans'       => array(),
				),
				'tutorial' => array(
					'label'       => esc_html__( 'Tutorial', 'solidie' ),
					'slug'        => 'tutorials',
					'description' => esc_html__( 'Full fledged tutorial management system.', 'solidie' ),
					'plans'       => array(),
				),
			),
		);

		// Add the content type array in content settings
		foreach ( array_keys( $manifest['contents'] ) as $type ) {
			$manifest['settings']['contents'][ $type ] = array(
				'label'                 => $manifest['contents'][ $type ]['label'],
				'slug'                  => $manifest['contents'][ $type ]['slug'],
				'enable'                => false,
				'show_thumbnail'        => true,
				'enable_comment'        => true,
				'show_contributor_info' => true,
				'reaction_type'         => 'like',
			);
		}

		// Finally return the manifest
		return apply_filters( 'solidie_manifest', $manifest );
	}

	/**
	 * Get content type label
	 *
	 * @param string $content_type The content type get label for
	 * @param bool   $default The fallback to return
	 *
	 * @return string
	 */
	public static function getContentTypeLabel( $content_type, $default = null ) {
		$content_type = self::getManifest()['contents'][ $content_type ] ?? array();
		return $content_type['label'] ?? $default;
	}
}
