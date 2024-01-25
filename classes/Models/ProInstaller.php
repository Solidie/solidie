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
		
		$host         = 'development' === Main::$configs->mode ? 'http://localhost:10019' : 'https://www.solidie.com';
		$plugin_uri   = $host . '/wp-content/plugins/solidie/';
		$solidie_id   = Utilities::getSolidieId( $plugin_uri );
		$download_uri = $host . 'wp-admin/admin-ajax.php';

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
		
		// Download the plugin file
		$response  = wp_remote_get( self::getLinkToPro() );
		if ( is_wp_error( $response ) ) {
			return $response->get_error_message();
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
		$unzipped = unzip_file( $temp_file, trailingslashit( WP_PLUGIN_DIR ) . Utilities::PRO_DIR . '/' );
		unlink( $temp_file );

		return $unzipped ? true : false;
	}
}
