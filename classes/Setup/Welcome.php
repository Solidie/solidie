<?php
/**
 * Welcome page after plugin activation
 * 
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Main;

/**
 * The welcome class
 */
class Welcome {

	/**
	 * The identifier to show welcome screen once in a lifetime of a website.
	 */
	const FLAG_NAME = 'solidie-first-activated-time';

	/**
	 * The admin page slug to show welcome screen under
	 */
	const PAGE_SLUG = 'solidie';

	/**
	 * Register welcome page caller
	 */
	public function __construct() {
		add_action( 'activated_plugin', array( $this, 'showWelcome' ), 10, 2 );
	}

	/**
	 * Redirect to welcome page if this plugin has just been activated
	 *
	 * @return void
	 */
	public function showWelcome($plugin, $network_wide = null ) {
		if ( Main::$configs->basename === $plugin && ! get_option( self::FLAG_NAME ) ) {
			// update_option( self::FLAG_NAME, time() );
			wp_safe_redirect( admin_url( 'admin.php?page=' . self::PAGE_SLUG ) );
			exit;
		}
	}
}
