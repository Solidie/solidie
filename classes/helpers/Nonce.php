<?php

namespace AppStore\Helpers;

class Nonce {
	private static $name = '_appstore_nonce_name';
	private static $action = '_appstore_nonce_action';

	public static function generate() {
		return array( self::$name => wp_create_nonce( self::$action ) );
	}

	public static function verify( $request_method = null ) {
		if ( ! $request_method ){
			$request_method = sanitize_text_field( $_SERVER['REQUEST_METHOD'] );
		}

		$is_post     = strtolower( $request_method ) === 'post';
		$data        = $is_post ? $_POST : $_GET;
		$nonce_value = ! empty( $data[ self::$name ] ) ? $data[ self::$name ] : null;
		$matched     = $nonce_value && wp_verify_nonce( $nonce_value, self::$action );

		if ( ! $matched ) {
			wp_send_json_error( array( 'message' => __( 'Nonce not matched. Action failed!', 'appstore' ) ) );
			exit;
		}

		// Remove the nonce from data
		if ( $is_post ) {
			unset( $_POST[ self::$name ] );
		} else {
			$_GET[ self::$name ];
		}
	}
}