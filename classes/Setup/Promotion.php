<?php
/**
 * Pro version promotion
 * 
 * @solidie
 */

namespace Solidie\Setup;

use Solidie\Main;

class Promotion {

	public function __construct() {
		add_filter( 'plugin_action_links_' . Main::$configs->basename, array( $this, 'proInstallLink' ) );
	}

	public function proInstallLink( array $actions ) {
		
		$action = self::getPluginAction( 'solidie-pro/solidie-pro.php', __( 'Pro', 'solidie' ) );
		if ( ! empty( $action ) ) {
			$actions['solidie_pro_action_link'] = '<a href="' . esc_url( $action['action_link'] ) . '">
				<span style="color: #ff7742; font-weight: bold;">' .
					$action['action_label'] .
				'</span>
			</a>';
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
					)
				);
			} else {

				$action = array(
					'action_label' => sprintf( __( 'Install %s', 'solidie' ), $label ),
					'action_link'  => add_query_arg(
						array(
							'tab' => 'plugin-information',
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