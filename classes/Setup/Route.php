<?php

namespace Solidie\Setup;

use Solidie\Main;
use Solidie\Models\AdminSetting;

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
		add_action( 'solidie_settings_updated', array( $this, 'triggerRewrite' ) );
		add_filter( 'template_include', array( $this, 'registerTemplate' ) );
	}

	/**
	 * Register var
	 *
	 * @param array $vars
	 * 
	 * @return array
	 */
	public function registerPagename ($vars) {
		$vars[] = self::KEY;
		return $vars;
	} 

	/**
	 * Add custom Rewrite rules
	 *
	 * @param array $rules
	 * @return array
	 */
	public function rebuildPermalinks( $rules ) {
		$settings = AdminSetting::get();
		$slugs = array(
			$settings['dashboard']['slug'],
		);

		// Loop through content types and register their slug
		foreach ( $settings['contents'] as $content ) {
			if ( ( $content['enable'] ?? false ) == true && ! empty( $content['slug'] ) && $content['slug'] !== 'wp-admin' ) {
				$slugs[] = $content['slug'];
			}
		}

		// Register to rules now
		$new_rules = array();
		foreach ( $slugs as $slug ) {
			$template = 'index.php?' . self::KEY . '=' . $slug;
			$new_rules[ $slug . '/?$' ] = $template;
			$new_rules[ $slug . '/(.+?)/?$' ] = $template;
		}

		return $new_rules + $rules;
	}

	/**
	 * Trigger rewrite rules on Solidie settings update
	 *
	 * @return void
	 */
	public function triggerRewrite() {
		flush_rewrite_rules();
	}

	/**
	 * Undocumented function
	 *
	 * @param string $template
	 * @return string
	 */
	function registerTemplate( $template ) {
		if ( get_query_var( self::KEY ) ) {
			// Load your custom template file here
			$template = Main::$configs->dir . 'templates/index.php';
		}

		return $template;
	}
}
