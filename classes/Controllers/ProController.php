<?php
/**
 * Pro version install and activation automator
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Helpers\_Array;
use Solidie\Helpers\Utilities;
use Solidie\Main;

/**
 * Pro controller class
 */
class ProController {

	const PREREQUISITES = array(
		'proVersionAction' => array(
			'role' => 'administrator',
		)
	);

	const SUBSCRIBED_MAILS = 'solidie-subscribed-emails';

	/**
	 * Do action for pro version like installing and activating through custom UI
	 *
	 * @param string $action_name
	 *
	 * @return void
	 */
	public static function proVersionAction( string $action_name ) {

		// Activate pro plugin
		if ( 'activate' === $action_name ) {

			// Check if activated already
			if ( Utilities::isProInstalled( true ) ) {
				wp_send_json_success( array( 'message' => __( 'Solidie Pro is active already!', 'solidie' ) ) );
			}

			// Check if it doesn't even exist, maybe deleted meanwhile.
			if ( ! Utilities::isProInstalled( false ) ) {
				wp_send_json_error( array( 'message' => __( 'Solidie Pro was not found to activate', 'solidie' ) ) );
			}

			activate_plugin( Utilities::PRO_PATH );

			wp_send_json_success( array( 'message' => __( 'Solidie Pro has been activated successfully', 'solidie' ) ) );
		}

		wp_send_json_error( array( 'message' => __( 'Invalid Action', 'solidie' ) ) );
	}
}
