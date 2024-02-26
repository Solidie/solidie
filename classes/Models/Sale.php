<?php
/**
 * A helper sale class to delete sales data when content gets deleted.
 *
 * @package solidie
 */

namespace Solidie\Models;

/**
 * Sale class is here to delete linked data even when pro version is not active.
 */
class Sale {

	/**
	 * Delete sales under a content ID
	 *
	 * @param int $content_id
	 * @return void
	 */
	public static function deleteSaleByContentId( $content_id ) {

		global $wpdb;

		// Delete linked license keys
		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM {$wpdb->solidie_license_keys} WHERE sale_id IN (SELECT sale_id FROM {$wpdb->solidie_sales} WHERE content_id=%d)",
				$content_id
			)
		);

		// Delete the sales now
		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM {$wpdb->solidie_sales} WHERE content_id=%d",
				$content_id
			)
		);
	}
}
