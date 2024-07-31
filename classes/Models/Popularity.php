<?php
/**
 * Popularity functionalities
 *
 * @package solidie
 */

namespace Solidie\Models;

use SolidieLib\_Array;
use SolidieLib\_DateTime;

/**
 * Popularity class
 */
class Popularity {

	/**
	 * To log popularity
	 *
	 * @param int $content_id The content ID to log for
	 *
	 * @return void
	 */
	public static function logDownload( $content_id ) {
		global $wpdb;
		$wpdb->insert(
			$wpdb->solidie_popularity,
			array( 
				'content_id'    => $content_id,
				'download_date' => gmdate( 'Y-m-d H:i:s' )
			)
		);
	}

	/**
	 * Delete by content ID
	 *
	 * @param int $content_id
	 * @return void
	 */
	public static function deleteByContentId( $content_id ) {
		Field::popularity()->deleteField( array( 'content_id' => $content_id ) );
	}

	/**
	 * Get sales trend per month
	 *
	 * @return array
	 */
	public static function getTrend() {

		global $wpdb;
		$trends = $wpdb->get_results(
			"SELECT 
				DATE_FORMAT(download_date, '%Y-%m') AS download_month, 
				COUNT(download_id) AS total_download
			FROM 
				{$wpdb->solidie_popularity}
			GROUP BY 
				download_month
			ORDER BY 
				download_month ASC",
			ARRAY_A
		);

		$trends = _Array::castRecursive( $trends );

		$trend_arry = array(
			'data'   => array(),
			'labels' => array()
		);

		foreach ( $trends as $trend ) {
			$trend_arry['data'][]   = $trend['total_download'];
			$trend_arry['labels'][] = $trend['download_month'];
		}

		if ( count( $trend_arry['data'] ) === 1 ) {
			array_unshift( $trend_arry['data'], 0 );
			array_unshift( $trend_arry['labels'], _DateTime::getPreviousYearMonth( $trend_arry['labels'][0] ) );
		}

		return $trend_arry;
	}

	/**
	 * Delete expired popularity indexes
	 *
	 * @return void
	 */
	public static function deleteExpired() {
		global $wpdb;
		$wpdb->query(
			"DELETE FROM {$wpdb->solidie_popularity} WHERE download_date < DATE_SUB(NOW(), INTERVAL 3 MONTH)"
		);
	}
}
