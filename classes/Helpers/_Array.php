<?php
/**
 * Array methods
 *
 * @package solidie
 */

namespace Solidie\Helpers;

/**
 * The enriched array class
 */
class _Array {
	/**
	 * Apply order to every array elements
	 *
	 * @param array  $array     The array to add order ins
	 * @param string $order_key The key to store order index
	 * @return array
	 */
	public static function addOrderColumn( array $array, string $order_key ) {
		// Start from
		$order = 1;

		// Loop through the array and assign sequence order
		foreach ( $array as $index => $element ) {

			$element[ $order_key ] = $order;
			$array[ $index ]       = $element;

			$order++;
		}

		return $array;
	}

	/**
	 * Return array no matter what. And cast values to appropriate data type.
	 *
	 * @param mixed $value The value to get array of and cast before. If not retruns empty array.
	 * @return array
	 */
	public static function getArray( $value ) {
		return self::castRecursive( is_array( $value ) ? $value : array() );
	}

	/**
	 * Check if an array is two dimensional
	 *
	 * @param array $array The array to check if it is two dimensional
	 * @return bool
	 */
	public static function isTwoDimensionalArray( $array ) {
		if ( ! empty( $array ) && is_array( $array ) ) {
			return is_array( current( $array ) );
		}
		return false;
	}

	/**
	 * Cast number, bool from string.
	 *
	 * @param array $array The array to cast data recursively
	 * @return array
	 */
	public static function castRecursive( array $array ) {
		// Loop through array elements
		foreach ( $array as $index => $value ) {

			// If it is also array, pass through recursion
			if ( is_array( $value ) ) {
				$array[ $index ] = self::castRecursive( $value );
				continue;
			}

			if ( is_string( $value ) ) {

				if ( is_numeric( $value ) ) {
					// Cast number
					$array[ $index ] = (int) $value;

				} elseif ( 'true' === $value ) {
					// Cast boolean true
					$array[ $index ] = true;

				} elseif ( 'false' === $value ) {
					// Cast boolean false
					$array[ $index ] = false;

				} elseif ( 'null' === $value ) {
					// Cast null
					$array[ $index ] = null;

				} elseif ( '[]' === $value ) {
					// Cast empty array
					$array[ $index ] = array();

				} else {
					// Maybe unserialize
					$array[ $index ] = maybe_unserialize( $value );
				}
			}
		}

		return $array;
	}

	/**
	 * Make an array column value index of the array
	 *
	 * @param array  $array  Array to indexify
	 * @param string $column The field to use the value as index
	 * @return array
	 */
	public static function indexify( array $array, string $column ) {
		$new_array = array();
		foreach ( $array as $element ) {
			$new_array[ $element[ $column ] ] = $element;
		}

		return $new_array;
	}

	/**
	 * Append column to a two dimensional array
	 *
	 * @param array  $array The array to append column into
	 * @param string $key   The key to use as index of the column
	 * @param array  $new   New field to use as the value
	 * @return array
	 */
	public static function appendColumn( array $array, string $key, $new ) {
		foreach ( $array as $index => $element ) {
			$array[ $index ][ $key ] = $new;
		}

		return $array;
	}

	/**
	 * Get single array from a two dimensional array, similar to 'find' method in JavaScript.
	 *
	 * @param array  $array   The array to find in
	 * @param string $key     The key to match in the second dimension
	 * @param mixed  $value   The value to match in the second dimension
	 * @param mixed  $default The default return value if not found
	 * @return array
	 */
	public static function find( array $array, $key, $value, $default = null ) {
		foreach ( $array as $row ) {
			if ( ( $row[ $key ] ?? null ) === $value ) {
				return $row;
			}
		}
		return $default;
	}

	/**
	 * Sanitize contents recursively
	 *
	 * @param array      $value    The array to run kses through
	 * @param array      $kses_for Define field name to use wp_kses for instead of sanitize_text_field.
	 * @param string|int $key      Do not use outside of this function. It's for internal use.
	 * @return array
	 */
	public static function sanitizeRecursive( $value, $kses_for = array(), $key = null ) {
		if ( is_array( $value ) ) {
			foreach ( $value as $_key => $_value ) {
				$value[ $_key ] = self::sanitizeRecursive( $_value, $kses_for, $_key );
			}
		} elseif ( is_string( $value ) ) {
			$value = in_array( $key, $kses_for, true ) ? _String::applyKses( $value ) : sanitize_text_field( $value );
		}

		return $value;
	}

	/**
	 * Strip slasshes from string in array resursivley. Ideally used in post data.
	 *
	 * @param array $array Array of strings or whatever. Only strings will be processed.
	 * @return array
	 */
	public static function stripslashesRecursive( array $array ) {
		// Loop through array elements
		foreach ( $array as $index => $element ) {
			if ( is_array( $element ) ) {
				$array[ $index ] = self::stripslashesRecursive( $element );
				continue;
			}

			if ( is_string( $element ) ) {
				$array[ $index ] = stripslashes( $element );
			}
		}

		return $array;
	}

	/**
	 * Convert multidimensional array into one
	 *
	 * @param array $array The array to flatten
	 * @return array
	 */
	public static function flattenArray( array $array ) {
		$result = array();
		foreach ( $array as $element ) {
			if ( is_array( $element ) ) {
				$result = array_merge( $result, self::flattenArray( $element ) );
			} else {
				$result[] = $element;
			}
		}
		return $result;
	}

	/**
	 * Parse comments from php file as array
	 *
	 * @param string         $path File path  to parse data from
	 * @param ARRAY_A|OBJECT $ret_type Either object or array to return
	 * @return array|object
	 */
	public static function getManifestArray( string $path, $ret_type = OBJECT ) {
		$result = [];

		// Use regular expressions to match the first PHP comment block
		preg_match( '/\/\*\*(.*?)\*\//s', file_get_contents( $path ), $matches ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents

		if ( isset( $matches[1] ) ) {
			$comment = $matches[1];

			// Remove leading asterisks and split lines
			$lines = preg_split( '/\r\n|\r|\n/', trim( preg_replace( '/^\s*\*\s*/m', '', $comment ) ) );

			foreach ( $lines as $line ) {
				// Check if the line contains a colon
				if ( strpos( $line, ':' ) !== false ) {
					list($key, $value) = array_map( 'trim', explode( ':', $line, 2 ) );

					$key            = strtolower( str_replace( ' ', '_', $key ) );
					$result[ $key ] = $value;
				}
			}
		}

		$result['file']     = $path;
		$result['dir']      = dirname( $path ) . '/';
		$result['url']      = plugin_dir_url( $path );
		$result['dist_url'] = $result['url'] . 'dist/';

		$result = self::castRecursive( $result );

		return ARRAY_A === $ret_type ? $result : (object) $result;
	}

	/**
	 * Build nested array
	 *
	 * @param array  $elements The array to get nested data from
	 * @param int    $parent_id The parent ID to start the level from
	 * @param string $col_name The column name that holds parent ID
	 * @param string $parent_col_name The column name that holds the index numbers
	 * @return array
	 */
	public static function buildNestedArray( $elements, $parent_id, $col_name, $parent_col_name ) {
		$nested_array = array();

		foreach ( $elements as $element ) {
			if ( $parent_id === $element[ $col_name ] ) {
				$children = self::buildNestedArray( $elements, $element[ $parent_col_name ], $col_name, $parent_col_name );

				if ( ! empty( $children ) ) {
					$element['children'] = $children;
				}

				$nested_array[] = $element;
			}
		}

		return $nested_array;
	}

	/**
	 * Group multiple rows by a common field
	 *
	 * @param array  $array The table array to group rows
	 * @param string $col_name The column name to group by
	 * @return array
	 */
	public static function groupRows( $array, $col_name ) {
		$grouped_array = array();

		foreach ( $array as $item ) {
			$content_type = $item[ $col_name ];

			if ( ! isset( $grouped_array[ $content_type ] ) ) {
				$grouped_array[ $content_type ] = array();
			}

			$grouped_array[ $content_type ][] = $item;
		}

		return $grouped_array;
	}

	/**
	 * Convert nested table to single table
	 *
	 * @param array  $tables The nested array to make linear
	 * @param string $nested_col_name Then column name that holds children
	 * @return array
	 */
	public static function convertToSingleTable( array $tables, string $nested_col_name ) {
		$new_array = array();
		foreach ( $tables as $index => $rows ) {
			foreach ( $rows as $col_name => $col ) {
				if ( $col_name === $nested_col_name && is_array( $col ) ) {
					$new_array = array_merge( $new_array, self::convertToSingleTable( $col, $nested_col_name ) );
				} else {
					$new_array[ $index ][ $col_name ] = $col;
				}
			}
		}
		return $new_array;
	}
}
