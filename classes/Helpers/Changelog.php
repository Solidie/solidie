<?php
/**
 * Color pallete
 *
 * @package solidie
 */

namespace Solidie\Helpers;

use Solidie\Main;

class Changelog {

	/**
	 * Get latest changelog from readme.txt file.
	 *
	 * @return array
	 */
	public static function getLatestChangelog() {

		$changelog = file_get_contents( Main::$configs->dir . 'readme.txt' );
		$changelog = trim( end( explode( '== Changelog ==', $changelog ) ) );
		$changelog = explode( PHP_EOL . PHP_EOL, $changelog )[0];
		$lines     = array_slice( explode( PHP_EOL, $changelog ), 2 );
		$lines     = array_map(
			function ( $line ) {
				return trim( trim( $line, '*' ) );
			},
			$lines
		);

		return array_filter( $lines );
	}
}