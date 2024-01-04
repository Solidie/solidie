<?php
namespace Solidie\Models;

use Solidie\Helpers\_String;

class Token {
	
	/**
	 * Get saved data by token id and token
	 *
	 * @param int $token_id
	 * @param string $token
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
	 * @param mixed $data
	 * @return array
	 */
	public static function generateToken( $data, $expires = null ) {

		$token = _String::getRandomString(70);
		
		global $wpdb;
		$wpdb->insert(
			$wpdb->solidie_tokens,
			array(
				'data'       => maybe_serialize( $data ),
				'token'      => $token,
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
			'token' => $token
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
