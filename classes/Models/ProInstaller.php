<?php
/**
 * Pro version manager
 */

namespace Solidie\Models;

use Solidie\Helpers\_String;
use Solidie\Helpers\Utilities;
use Solidie\Main;

class ProInstaller {
	
	private static function getLinkToPro() {
		
		$host         = Main::$configs->api_host;
		$plugin_uri   = $host . '/wp-content/plugins/solidie/';
		$solidie_id   = Utilities::getSolidieId( $plugin_uri );
		$download_uri = $host . '/wp-admin/admin-ajax.php';

		$payload = array(
			'action'       => $solidie_id . '_loadFile',
			'content_slug' => 'solidie-pro'
		);

		return add_query_arg( $payload, $download_uri );
	}

	/**
	 * Download plugin from direct link and unzip in the directory
	 *
	 * @return void
	 */
	public static function download() {

		$plugin_dir = trailingslashit( WP_PLUGIN_DIR );
		$pro_dir    = $plugin_dir . Utilities::PRO_DIR . '/';

		// Check if the directory exists already
		if ( is_dir( $pro_dir ) ) {
			return sprintf( __( 'Directory \'%s\' already exists. Installation aborted.', 'solidie' ), Utilities::PRO_DIR );
		}
		
		// Download the plugin file
		$response  = wp_remote_get( self::getLinkToPro() );
		if ( is_wp_error( $response ) ) {
			return $response->get_error_message();
		}
		
		$response_code = wp_remote_retrieve_response_code($response);
		if ( $response_code !== 200 ) {
			return sprintf( __( 'Error: %s from solidie server' ), $response_code );
		}
		
		// Get the body of the response, which contains the plugin ZIP file content
		$plugin_zip_content = wp_remote_retrieve_body( $response );

		// Use WP_Filesystem to extract and install the plugin
		WP_Filesystem();

        // Generate a unique temporary file name
        $temp_file = wp_tempnam( Utilities::PRO_DIR . '-downloaded-' . _String::getRandomString() . '.zip' );

        // Save the ZIP file content to the temporary file
        file_put_contents( $temp_file, $plugin_zip_content );

		// Extract the plugin ZIP content to the destination path
		$unzipped = unzip_file( $temp_file, $plugin_dir );
		
		// Remove downloaded file as it is not necessary anymore
		if ( file_exists( $temp_file ) ) {
			unlink( $temp_file );
		}

		return $unzipped ? true : false;
	}
}
