<?php
namespace AppStore\Updater;

if ( class_exists( __NAMESPACE__ . '\\Updater' ) ) {
	return;
}

/**
 * This is a unified class for custom WordPress themes and plugins update. 
 */
class Updater {
	private $app_id;
	private $api_endpoint;
	private $main_file_path;
	private $license_page_parent = null;
	private $app_type;
	private $app_name;
	private $app_basename;
	private $url_slug;
	private $license_field_name;
	private $nonce_field_name;
	private $error_message_key;
	private $update_hook_prefix;
	private $appstore_response_data = array();
	private $is_plugin;
	private $app_version;
	private $app_slug;
	private $updater_url;
	private $menu_title;
	private $license_option_key;
	private $api_dashboard_url;
	public  $is_license_active;

	/**
	 * Updater constructor
	 *
	 * @param integer $app_id
	 * @param string $api_endpoint
	 * @param string $main_file_path
	 * @param string|null $license_parent_menu_slug
	 * @param bool $continuous_update_check
	 */
	function __construct( int $app_id, string $api_endpoint, string $api_dashboard_url, string $main_file_path, $license_parent_menu_slug = null, $continuous_update_check = false ) {
		$this->app_id              = $app_id;
		$this->api_endpoint        = $api_endpoint;
		$this->main_file_path      = $main_file_path;
		$this->license_page_parent = $license_parent_menu_slug;
		$this->api_dashboard_url   = $api_dashboard_url;
		$this->url_slug            = 'appstore-license-' . $this->app_id;
		$this->license_field_name  = $this->url_slug . '-key';
		$this->nonce_field_name    = $this->url_slug . '-nonce';
		$this->error_message_key   = 'appstore_update_error_' . $app_id;
		$this->license_option_key  = 'appstore_license_setting_' . $app_id;
		$this->update_hook_prefix  = ! $continuous_update_check ? '' : 'pre_set_';
		$this->app_type            = strpos( str_replace( '\\', '/', $this->main_file_path ) , 'wp-content/plugins' ) ? 'plugin' : 'theme';
		$this->is_plugin           = $this->app_type == 'plugin';

		// Get app meta data and set as property
		$app_info           = $this->is_plugin ? get_plugin_data( $this->main_file_path ) : wp_get_theme();
		$this->app_basename = $this->is_plugin ? plugin_basename( $this->main_file_path ) : get_stylesheet(); // To Do: Test theme update flow
		$this->app_name     = $this->is_plugin ? $app_info['Name'] : $app_info->get('Name');
		$this->app_version  = $this->is_plugin ? $app_info['Version'] : $app_info->get('Version');
		$this->menu_title   = $this->app_name . ' License';

		// Determine URL to this updater directory
		$app_root_url      = $this->is_plugin ? plugin_dir_url( $this->main_file_path ) : get_template_directory_uri() . '/';
		$sep               = $this->is_plugin ? '/wp-content/plugins/' : '/wp-content/themes/';
		$updater_full_path = str_replace( '\\', '/', __DIR__ );
		$updater_rel_path  = substr( $updater_full_path, strpos( $updater_full_path, $sep ) + strlen( $sep ) ) . '/';
		$this->app_slug    = substr( $updater_rel_path, 0, strpos( $updater_rel_path, '/' ) );
		$this->updater_url = $app_root_url . substr( $updater_rel_path, strlen( $this->app_slug . '/' ) ) ;

		// Get saved license
		$license = $this->get_license();
		$this->is_license_active = $license && $license['activated'];

		// Register license page hooks if parent page slug defined, it means the app is not free and requires license activation to get updates. 
		if ( $this->license_page_parent ) {
			add_action( 'admin_enqueue_scripts', array( $this, 'license_page_asset_enqueue' ) );
			add_action( 'admin_menu', array( $this, 'add_license_page' ), 20 );
			add_action( 'admin_init', array( $this, 'activate_license' ) );
			add_action( 'admin_notices', array( $this, 'show_invalid_license_notice' ) );
		}

		// Register plugin and theme api request hooks
		if($this->app_type == 'plugin') {
			add_filter( 'plugins_api', array( $this, 'plugin_info' ), 20, 3 );
			add_filter( $this->update_hook_prefix . 'site_transient_update_plugins', array( $this, 'check_for_update' ) );
			add_action( 'in_plugin_update_message-' . $this->app_basename, array( $this, 'custom_update_message' ), 10, 2 );

		} else if ( $this->app_type == 'theme' ) {
			add_filter( $this->update_hook_prefix . 'site_transient_update_themes', array( $this, 'check_for_update' ) );
		}
	}

	/**
	 * Show plugin update error
	 *
	 * @param object $plugin_data
	 * @param object $response
	 * @return void
	 */
	public function custom_update_message( $plugin_data, $response ) {
		if ( ! $response->package ) {
			$error_message = get_option( $this->error_message_key );
			echo $error_message ? ' ' . $error_message . '' : '';
		}
	}

	public function license_page_asset_enqueue() {
		if ( ! isset( $_GET['page'] ) || $_GET['page'] !== $this->url_slug ) {
			return;
		}
	
		wp_enqueue_style( $this->url_slug . '-css', $this->updater_url . 'license-form.css', $this->app_version );
		wp_enqueue_script( $this->url_slug . '-js', $this->updater_url . 'license-form.js', array( 'jquery' ), $this->app_version, true );
	}

	public function add_license_page() {
		add_submenu_page($this->license_page_parent, $this->menu_title, __( 'License' ), 'manage_options', $this->url_slug, array($this, 'license_form'));
	}

	public function license_form() {
		include __DIR__ . '/license-form.php';
	}

	/**
	 * Return prepared request payload
	 *
	 * @param string $action
	 * @return array
	 */
	private function getRequestPayload( string $action ) {
		$license_info = $this->get_license();
		$license_key  = $license_info ? $license_info['license_key'] : '';

		return array(
			'license_key' => $license_key,
			'app_id'      => $this->app_id,
			'endpoint'    => get_home_url(),
			'action'      => $action
		);
	}

	/**
	 * @return array|bool|mixed|object
	 *
	 * Get update information
	 */
	public function update_check() {
		if ( ! isset( $this->appstore_response_data[ $this->app_id ] ) ) {
			$request = wp_remote_post(
				$this->api_endpoint, 
				$this->getRequestPayload( $this->license_page_parent ? 'update-check' : 'update-check-free' )
			);

			$this->appstore_response_data[ $this->app_id ] = ( ! is_wp_error( $request ) && wp_remote_retrieve_response_code( $request ) === 200 ) ? @json_decode( $request['body'] ?? '' ) : null;
		}

		return $this->appstore_response_data[ $this->app_id ];
	}

	public function activate_license() {

		if ( isset( $_GET['page'] ) && $_GET['page'] == $this->url_slug && ! empty( $_POST[ $this->license_field_name ] ) ) {
			if (!check_admin_referer($this->nonce_field_name)) {
				return;
			}

			$key      = sanitize_text_field( $_POST[ $this->license_field_name ] );
			$api_call = wp_remote_post( $this->api_endpoint, $this->getRequestPayload( 'activate-license' ) );

			if ( ! is_wp_error( $api_call ) ) {
				$response_body = $api_call['body'];
				$response      = json_decode($response_body);

				if ($response->success) {
					$license_info = array(
						'activated'     => true,
						'license_key'   => $key,
						'license_to'    => $response->data->license_info->customer_name,
						'expires_at'    => $response->data->license_info->expires_at,
						'activated_at'  => $response->data->license_info->activated_at,
						'license_type'  => $response->data->license_info->license_type,
						'message'       => $response->data->message ?? '',
					);
				} else {
					//License is invalid
					$license_info = array(
						'activated'     => false,
						'license_key'   => $key,
						'license_to'    => '',
						'expires_at'    => '',
						'license_type'  => '',
						'message'  => $response->data->message ?? '',
					);
				}

				update_option($this->license_option_key, $license_info);
			} else {
				$error_string = $api_call->get_error_message();
				echo '<div id="message" class="error"><p>' . $error_string . '</p></div>';
			}
		}
	}

	/**
	 * @param $res
	 * @param $action
	 * @param $args
	 *
	 * @return bool|\stdClass
	 *
	 * Get the plugin info from server
	 */

	function plugin_info( $res, $action, $args ) {

		// do nothing if this is not about getting plugin information
		if ( $action !== 'plugin_information' ) {
			return false;
		}

		// do nothing if it is not our plugin
		if ( $this->app_slug !== $args->slug && $this->app_basename!==$args->slug ) {
			return $res;
		}

		$remote = $this->update_check();

		if ( $remote ) {

			$res               = new \stdClass();
			$res->name         = $remote->data->app_name;
			$res->slug         = $this->app_slug;
			$res->version      = $remote->data->version;
			$res->last_updated = $remote->data->release_date;
			$res->sections     = array(
				'changelog' => $remote->data->change_log,
			);

			return $res;
		}

		// False probably prevent update check on WP repository
		return false;
	}

	/**
	 * @param $transient
	 *
	 * @return mixed
	 */
	public function check_for_update($transient) {
		$request_body = $this->update_check();
		if ( ! empty( $request_body->success ) && $request_body->success ) {
			if ( version_compare( $this->app_version, $request_body->data->version, '<' ) ) {

				$update_info = array(
					'new_version'   => $request_body->data->version,
					'package'       => $request_body->data->download_url,
					'tested'        => $request_body->data->tested_wp_version,
					'slug'          => $this->app_basename,
					'url'           => $request_body->data->url,
				);

				$transient->response[ $this->app_basename ] = $this->app_type=='plugin' ? (object)$update_info : $update_info;

				$error_mesage = empty($request_body->data->error_message) ? null : $request_body->data->error_message;
				update_option( $this->error_message_key, $error_mesage );
			}
		}
		return $transient;
	}

	public function show_invalid_license_notice() {
		if ( ! $this->is_license_active ) {
			$class = 'notice notice-error';
			$message = sprintf(__('There is an error with your %s License. Automatic update has been turned off, %s Please check license %s', $this->url_slug),
								$this->app_name, " <a href='" . admin_url( 'admin.php?page=' . $this->url_slug ) . "'>", '</a>');

			printf('<div class="%1$s"><p>%2$s</p></div>', esc_attr($class), $message);
		}
	}

	private function get_license () {
		$license_option = get_option( $this->license_option_key, null );

		if ( empty( $license_option ) ) {
			// Not submitted yet
			return null;
		}

		$license = maybe_unserialize( $license_option );
		$license = is_array( $license ) ? $license : array();

		$keys = array(
			'activated',
			'license_key',
			'license_to',
			'expires_at',
			'license_type',
			'msg'
		);
		
		foreach ( $keys as $key ) {
			$license[ $key ] = ! empty( $license[ $key ] ) ? $license[ $key ] : null;
		}

		return $license;
	}
}
