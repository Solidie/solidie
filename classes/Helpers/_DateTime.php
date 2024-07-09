<?php
/**
 * Date time methods
 *
 * @package solidie
 */

namespace Solidie\Helpers;

/**
 * The enriched array class
 */
class _DateTime {

	public static function getPreviousYearMonth($yearMonth) {
		// Create a DateTime object from the provided year-month string
		$date = \DateTime::createFromFormat('Y-m', $yearMonth);
		
		// Check if the date is valid
		if (!$date) {
			throw new \Exception("Invalid date format. Please use 'YYYY-MM'.");
		}
		
		// Subtract one month from the date
		$date->modify('-1 month');
		
		// Return the previous year-month in 'YYYY-MM' format
		return $date->format('Y-m');
	}
}
