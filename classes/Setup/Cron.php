<?php
namespace Solidie\Setup;

use Solidie\Models\Token;

class Cron {
	public function __construct() {
		add_action( 'solidie_clear_expired_tokens', array( $this, 'clearTokens' ) );
		add_action( 'init', array( $this, 'tokenDeletion' ) );
	}

	/**
	 * Add scheduler to call the expired tokens clearer hook.
	 *
	 * @return void
	 */
	public function tokenDeletion() {
		if ( ! wp_next_scheduled( 'solidie_clear_expired_tokens' ) ) {
			wp_schedule_event( time(), 'twicedaily', 'solidie_clear_expired_tokens' );
		}
	}

	/**
	 * Delete expired tokens
	 *
	 * @return void
	 */
	public function clearTokens() {
		Token::deleteExpired();
	}
}
