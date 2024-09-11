<?php

namespace Solidie\Models;

use Aws\S3\S3Client;
use Aws\Exception\AwsException;
use Error;
use Solidie\Main;
use Solidie\Models\AdminSetting;
use SolidieLib\_Array;
use SolidieLib\_String;

class CloudStorage {

	private $space;
	private $client = null;

	public function __construct() {

		if ( ! AdminSetting::get( 'do_space_enable' ) ) {
			return;
		}

		$spaceName = AdminSetting::get( 'do_space_bucket_name' );
		$region    = AdminSetting::get( 'do_space_bucket_region' );
		$accessKey = AdminSetting::get( 'do_space_access_key' );
		$secretKey = AdminSetting::get( 'do_space_secret_key' );

		if ( empty( $spaceName ) || empty( $region ) || empty( $accessKey ) || empty( $secretKey ) ) {
			trigger_error( 'Solidie: Could not initiate Cloud Client due to missing credentials', E_USER_WARNING );
			return;
		}

		$this->space = $spaceName;

		// Instantiate an S3 client
		$this->client = new S3Client(array(
			'version'     => 'latest',
			'region'      => $region,
			'endpoint'    => 'https://' . $region . '.digitaloceanspaces.com',
			'credentials' => array(
				'key'    => $accessKey,
				'secret' => $secretKey,
			),
			'use_path_style_endpoint' => true
		));
	}

	public function uploadFile( array $file, string $target_dir = '' ) {

		if ( ! is_object( $this->client ) || ! $this->client instanceof S3Client ) {
			trigger_error( 'Solidie: Could not upload file to cloud', E_USER_WARNING );
			return;
		}

		// The file to upload
		$segments   = explode( '.', $file['name'] );
		$dir_prefix =  Main::$configs->mode !== 'production' ? 'dev-' : '';
		$keyName    =  $dir_prefix . ltrim( trailingslashit( $target_dir ), '/' ) . _String::getRandomString() . '.' . end( $segments );

		try {
			$result = $this->client->putObject(array(
				'Bucket'     => $this->space,
				'Key'        => $keyName,
				'SourceFile' => $file['tmp_name'],
				'ACL'        => 'public-read',
			));

			return array(
				'file_url'  => $result['ObjectURL'],
				'file_id'   => $keyName,
				'mime_type' => $file['type'],
				'file_name' => $file['name']
			);

		} catch ( AwsException $e ) {
			// Output error message if fails
			error_log( sprintf( 'Error uploading file: %s, ', $file['name'], $e->getMessage() ) );
		}
	}

	/**
	 * Delete file by key
	 *
	 * @param string|array $key
	 * @return void
	 */
	public function deleteFile( $key ) {

		if ( ! is_object( $this->client ) || ! $this->client instanceof S3Client ) {
			trigger_error( 'Solidie: Could not delete file from cloud', E_USER_WARNING );
			return;
		}

		$keys = _Array::getArray( $key, true );

		foreach ( $keys as $key ) {
			
			try {

				$this->client->deleteObject([
					'Bucket' => $this->space,
					'Key'    => $key,
				]);

			} catch ( AwsException $e ) {
				error_log( sprintf( 'Solidie: Error deleting file: %s; %s', $key, $e->getMessage() ) );
			}
		}
	}
}
