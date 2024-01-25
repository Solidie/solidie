<?php
/**
 * Pro version install and activation automator
 * 
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Helpers\Utilities;
use Solidie\Models\ProInstaller;

/**
 * Pro controller class
 */
class ProController {
	const PREREQUISITES = array(
		'proVersionAction' => array(
			'role' => 'administrator'
		)
	);

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

		// Download and then activate
		if ( 'install' === $action_name ) {
			
			// Check if activated already somehow
			if ( Utilities::isProInstalled( true ) ) {
				wp_send_json_success( array( 'message' => __( 'Solidie Pro is active already!', 'solidie' ) ) );
			}

			// Check if it is installed meanwhile
			if ( Utilities::isProInstalled( false ) ) {
				wp_send_json_error( array( 'message' => __( 'Solidie Pro was not found to activate', 'solidie' ) ) );

			} else {
				// As not installed meanwhile, download it
				$message = ProInstaller::download();
				
				if ( true !== $message ) {
					wp_send_json_error( array( 'message' => ! empty( $message ) ? $message : __( 'Something went wrong', 'solidie' ) ) );
				}
			}

			activate_plugin( Utilities::PRO_PATH );

			wp_send_json_success( array( 'message' => __( 'Solidie Pro has been installed and activated successfully', 'solidie' ) ) );
		}
	}
}
