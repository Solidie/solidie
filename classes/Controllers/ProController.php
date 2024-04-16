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
		),
		'subscribeToNewsLetter' => array(
			'nopriv' => true
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

	/**
	 * Subscribe to new letter
	 *
	 * @param string $name
	 * @param string $email
	 * @return void
	 */
	public static function subscribeToNewsLetter( string $name, string $email ) {

		$payload = array(
			'name'   => $name,
			'email'  => $email,
			'action' => 'solidieSubscribeToNewsLetter'
		);

		$request  = wp_remote_post( Main::$configs->api_host . '/wp-admin/admin-ajax.php', array( 'body' => $payload ) );
		$response = ( ! is_wp_error( $request ) && is_array( $request ) ) ? @json_decode( $request['body'] ?? null ) : null;

		// Set fall back
		$response          = is_object( $response ) ? $response : new \stdClass();
		$response->success = $response->success ?? false;
		$response->data    = $response->data ?? new \stdClass();
		
		if ( $response->success ) {

			$subscribeds = _Array::getArray( get_option( self::SUBSCRIBED_MAILS ) );
			$subscribeds[] = $email;

			update_option( self::SUBSCRIBED_MAILS, $subscribeds );

			wp_send_json_success( $response->data );
		} else {
			wp_send_json_error( $response->data );
		}
	}
}
