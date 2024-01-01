<?php
/**
 * Custom routes manager for contents
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Main;
use Solidie\Models\AdminSetting;


/**
 * Route manager class
 */
class Route {

	/**
	 * The route to capture custom url format
	 */
	const KEY = 'solidie-route';

	/**
	 * Route constructor
	 */
	public function __construct() {
		add_filter( 'query_vars', array( $this, 'registerPagename' ) );
		add_action( 'rewrite_rules_array', array( $this, 'rebuildPermalinks' ) );
		add_action( 'solidie_settings_updated', array( $this, 'triggerRewrite' ), 100 );
		add_filter( 'template_include', array( $this, 'registerTemplate' ) );
	}

	/**
	 * Register var
	 *
	 * @param array $vars Query vars
	 *
	 * @return array
	 */
	public function registerPagename( $vars ) {
		$vars[] = self::KEY;
		return $vars;
	}

	/**
	 * Add custom Rewrite rules
	 *
	 * @param array $rules Existing rewrite rules
	 * @return array
	 */
	public function rebuildPermalinks( $rules ) {
		$settings = AdminSetting::get();
		$slugs    = apply_filters( 'solidie_frontend_routes', array() );

		// Loop through content types and register their slug
		foreach ( $settings['contents'] as $content ) {
			if ( true === ( $content['enable'] ?? false ) && ! empty( $content['slug'] ) && 'wp-admin' !== $content['slug'] ) {
				$slugs[] = $content['slug'];
			}
		}

		// Register to rules now
		$new_rules = array();
		foreach ( $slugs as $slug ) {
			$template                         = 'index.php?' . self::KEY . '=' . $slug;
			$new_rules[ $slug . '/?$' ]       = $template;
			$new_rules[ $slug . '/(.+?)/?$' ] = $template;
		}

		return $new_rules + $rules;
	}

	/**
	 * Trigger rewrite rules on Solidie settings update.
	 * This one should be called as last as possible.
	 *
	 * @return void
	 */
	public function triggerRewrite() {
		flush_rewrite_rules();
	}

	/**
	 * Undocumented function
	 *
	 * @param string $template The template to load
	 * @return string
	 */
	public function registerTemplate( $template ) {
		if ( get_query_var( self::KEY ) ) {
			// Load your custom template file here
			$template = Main::$configs->dir . 'templates/index.php';
		}

		return $template;
	}
}
