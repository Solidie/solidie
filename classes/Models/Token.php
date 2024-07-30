<?php
/**
 * Token functionalities for download for now.
 * Maybe we can use for other feature in future.
 *
 * @package solidie
 */

namespace Solidie\Models;

use SolidieLib\_String;

/**
 * Token class
 */
class Token {

	/**
	 * Get saved data by token id and token
	 *
	 * @param int    $token_id The token ID to get data by
	 * @param string $token The token to match
	 *
	 * @return mixed
	 */
	public static function getData( $token_id, $token ) {
		global $wpdb;
		$data = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT data FROM {$wpdb->solidie_tokens} WHERE token_id=%d AND token=%s AND expires_on>NOW()",
				$token_id,
				$token
			)
		);

		return ! empty( $data ) ? maybe_unserialize( $data ) : null;
	}

	/**
	 * Generate token using identifier and save data
	 *
	 * @param mixed $data The data to save with the token
	 *
	 * @return array
	 */
	public static function generateToken( $data ) {

		$token = _String::getRandomString( 70 );

		global $wpdb;
		$wpdb->insert(
			$wpdb->solidie_tokens,
			array(
				'data'  => maybe_serialize( $data ),
				'token' => $token,
			)
		);

		$wpdb->query(
			$wpdb->prepare(
				"UPDATE {$wpdb->solidie_tokens} SET expires_on=DATE_ADD(NOW(), INTERVAL 12 HOUR) WHERE token_id=%d",
				$wpdb->insert_id
			)
		);

		return array(
			'id'    => $wpdb->insert_id,
			'token' => $token,
		);
	}

	/**
	 * Delete all the expired
	 *
	 * @return void
	 */
	public static function deleteExpired() {
		global $wpdb;
		$wpdb->query( "DELETE FROM {$wpdb->solidie_tokens} WHERE expires_on<NOW()" );
	}
}
