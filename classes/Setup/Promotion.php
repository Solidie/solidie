<?php
/**
 * Pro version promotion
 *
 * @solidie
 */

namespace Solidie\Setup;

use Solidie\Helpers\Utilities;
use Solidie\Main;

class Promotion {

	/**
	 * Pro plugin path constant
	 */
	const PRO_PATH = 'solidie-pro/solidie-pro.php';

	public function __construct() {
		add_filter( 'plugin_action_links_' . Main::$configs->basename, array( $this, 'proInstallLink' ) );
	}

	public function proInstallLink( array $actions ) {

		$actions['solidie_dashboard_link'] = '<a href="' . esc_url( Utilities::getBackendPermalink( 'solidie' ) ) . '">
			<span style="color: #00aa00; font-weight: bold;">' .
				__( 'Dashboard', 'solidie' ) .
			'</span>
		</a>';

		// If not even exists in file system
		if ( ! Utilities::isPluginInstalled( self::PRO_PATH, false ) ) {
			$actions['solidie_pro_action_link'] = '<a href="https://solidie.com" target="_blank">
				<span style="color: #ff7742; font-weight: bold;">' .
					__( 'Upgrade to Pro', 'solidie' ) .
				'</span>
			</a>';

		} elseif ( ! Utilities::isPluginInstalled( self::PRO_PATH, true ) ) {

			// If exists, but not active
			$action = self::getPluginAction( self::PRO_PATH, __( 'Pro', 'solidie' ) );
			if ( ! empty( $action ) ) {
				$actions['solidie_pro_action_link'] = '<a href="' . esc_url( $action['action_link'] ) . '">
					<span style="color: #ff7742; font-weight: bold;">' .
						$action['action_label'] .
					'</span>
				</a>';
			}
		}

		return $actions;
	}

	/**
	 * Get plugin action label and link
	 *
	 * @param string $plugin_id
	 * @param string $label
	 *
	 * @return array|null
	 */
	public static function getPluginAction( string $plugin_id, string $label ) {

		$action      = null;
		$plugin_path = trailingslashit( WP_PLUGIN_DIR ) . $plugin_id;

		if ( ! is_plugin_active( $plugin_id ) ) {

			if ( file_exists( $plugin_path ) ) {

				$action = array(
					'action_label' => sprintf( __( 'Activate %s', 'solidie' ), $label ),
					'action_link'  => add_query_arg(
						array(
							'action'   => 'activate',
							'plugin'   => $plugin_id,
							'_wpnonce' => wp_create_nonce( 'activate-plugin_' . $plugin_id ),
						),
						admin_url( 'plugins.php' )
					),
				);
			} else {

				$action = array(
					'action_label' => sprintf( __( 'Install %s', 'solidie' ), $label ),
					'action_link'  => add_query_arg(
						array(
							'tab'    => 'plugin-information',
							'plugin' => pathinfo( $plugin_id )['filename'],
						),
						admin_url( 'plugin-install.php' )
					),
				);
			}
		}

		return $action;
	}
}
