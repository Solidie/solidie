<?php
/**
 * Cron functionalities
 *
 * @package solidie
 */

namespace Solidie\Setup;

use Solidie\Models\Popularity;
use Solidie\Models\Token;

/**
 * The cron class
 */
class Cron {

	/**
	 * The key for token deletion
	 */
	const TOKEN_CRON = 'solidie_clear_expired_tokens';

	/**
	 * The key to delete content popularity indexes which are older
	 */
	const POPULARITY_CRON = 'solidie_clear_popularity_indexes';

	/**
	 * The constructor to register hooks
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( self::TOKEN_CRON, array( $this, 'clearTokens' ) );
		add_action( self::POPULARITY_CRON, array( $this, 'clearPopularity' ) );
		add_action( 'init', array( $this, 'registerCrons' ) );
	}

	/**
	 * Add scheduler to call the expired tokens clearer hook.
	 *
	 * @return void
	 */
	public function registerCrons() {

		if ( ! wp_next_scheduled( self::TOKEN_CRON ) ) {
			wp_schedule_event( time(), 'twicedaily', self::TOKEN_CRON );
		}

		if ( ! wp_next_scheduled( self::POPULARITY_CRON ) ) {
			wp_schedule_event( time(), 'weekly', self::POPULARITY_CRON );
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

	/**
	 * Delete expired tokens
	 *
	 * @return void
	 */
	public function clearPopularity() {
		Popularity::deleteExpired();
	}
}
