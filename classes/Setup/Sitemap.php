<?php
/**
 * Sitemap registrar
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Models\AdminSetting;
use Solidie\Models\ContentSitemap;

/**
 * Sitemap class
 */
class Sitemap {

	const SITEMAP_KEY = 'solidiecons';

	public function __construct() {
		add_action ( 'init', array( $this, 'registerContents' ) );
	}

	public function registerContents() {
		if ( AdminSetting::get( 'enable_content_sitemap' ) ) {
			wp_register_sitemap_provider( self::SITEMAP_KEY, new ContentSitemap( self::SITEMAP_KEY ) );
		}
	}
}
