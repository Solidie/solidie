<?php
/**
 * Category manager module
 *
 * @package solidie
 */

namespace Solidie\Models;

use SolidieLib\_Array;

/**
 * Category class and methods
 */
class Category {
	/**
	 * Create or update category
	 *
	 * @param array $category Single category data associative array
	 * @return int
	 */
	public static function createUpdateCategory( array $category ) {
		$_category = array(
			'category_name' => $category['category_name'],
			'parent_id'     => ! empty( $category['parent_id'] ) ? $category['parent_id'] : 0,
			'content_type'  => $category['content_type'],
		);

		global $wpdb;
		$cat_id = $category['category_id'] ?? null;

		if ( ! empty( $category['category_id'] ) ) {
			Field::categories()->updateField(
				$_category,
				array( 'category_id' => $category['category_id'] )
			);
		} else {
			$wpdb->insert(
				$wpdb->solidie_categories,
				$_category
			);
			$cat_id = $wpdb->insert_id;
		}

		return $cat_id;
	}

	/**
	 * Get all categories regardless of contents
	 *
	 * @param bool $add_count
	 * @return array
	 */
	public static function getCategories( $add_count = false ) {

		global $wpdb;
		$cats = $wpdb->get_results(
			"SELECT 
				_cat.*, 
				_cat.category_id AS id,
				_cat.category_name AS label,
				COUNT(_content.content_id) AS content_count
			FROM 
				{$wpdb->solidie_categories} _cat 
				LEFT JOIN {$wpdb->solidie_contents} _content ON _cat.category_id=_content.category_id
			GROUP BY 
				_cat.category_id
			ORDER BY
				_cat.sequence ASC",
			ARRAY_A
		);

		$cats = _Array::castRecursive( $cats );
		$cats = _Array::groupRows( $cats, 'content_type' );

		// Build nested array and assign content count to label
		foreach ( $cats as $content_type => $cat ) {

			$cats[ $content_type ] = _Array::buildNestedArray( $cat, 0, 'parent_id', 'category_id' );

			// Add content count per category
			if ( $add_count ) {
				$cats[ $content_type ] = _Array::getDescendentCount( $cats[ $content_type ], 'content_count', 'label' );
			}
		}

		return (object) $cats;
	}

	/**
	 * Delete category
	 *
	 * @param int $category_id The category ID to delete
	 * @return void
	 */
	public static function deleteCategory( $category_id ) {

		// Update content categories to null where it is used
		Field::contents()->updateField(
			array( 'category_id' => null ),
			array( 'category_id' => $category_id )
		);

		// Delete category itself
		Field::categories()->deleteField( array( 'category_id' => $category_id ) );

		// Delete sub categories
		global $wpdb;
		$sub_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT category_id FROM {$wpdb->solidie_categories} WHERE parent_id=%d",
				$category_id
			)
		);

		if ( ! empty( $sub_ids ) && is_array( $sub_ids ) ) {
			foreach ( $sub_ids as $id ) {
				self::deleteCategory( $id );
			}
		}
	}

	/**
	 * Update category order
	 *
	 * @param array $mapping
	 * @return void
	 */
	public static function updateSequence( array $mapping ) {
		
		global $wpdb;

		foreach ( $mapping as $id => $sequence ) {
			$wpdb->update(
				$wpdb->solidie_categories,
				array( 'sequence' => $sequence ),
				array( 'category_id' => $id )
			);
		}
	}

	/**
	 * Get children IDs of a category
	 *
	 * @param int  $category_id The category ID to get children of
	 * @return array
	 */
	public static function getChildren( $category_id, $content_type = null ) {

		global $wpdb;
		
		$category_id = (int) $category_id;

		$where_clause = '';
		if ( ! empty( $content_type ) ) {
			$where_clause .= $wpdb->prepare( ' AND content_type=%s', $content_type);
		}

		$cats = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT 
					* 
				FROM 
					{$wpdb->solidie_categories} 
					WHERE
						1=1
						AND category_id > %d
						{$where_clause} 
				ORDER BY sequence ASC",
				$category_id
			),
			ARRAY_A
		);
		
		return _Array::castRecursive( $cats );
	}

	/**
	 * Get descendents of parent of the provided category id
	 *
	 * @param int $category_id
	 * @return array
	 */
	public static function getDescendentsOfParent( $category_id, $content_type ) {
		$parent = _Array::getArray( self::getParent( $category_id ) );
		return self::getChildren( $parent['category_id'] ?? 0, $content_type );
	}

	/**
	 * Get parent category by a child category id
	 *
	 * @param int $category_id
	 * @return array|null
	 */
	public static function getParent( $category_id ) {

		global $wpdb;

		$parent = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT 
					* 
				FROM 
					{$wpdb->solidie_categories} 
					WHERE category_id = (
						SELECT parent_id FROM {$wpdb->solidie_categories} WHERE category_id=%d
					)",
				$category_id
			),
			ARRAY_A
		);

		return ! empty( $parent ) ? _Array::castRecursive( $parent ) : null;
	}
}
