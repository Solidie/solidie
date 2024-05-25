<?php
/**
 * Category handler methods
 *
 * @package solidie
 */

namespace Solidie\Controllers;

use Solidie\Models\Category;

/**
 * Category controller class
 */
class CategoryController {

	const PREREQUISITES = array(
		'saveCategory'         => array(),
		'saveCategorySequence' => array(),
		'deleteCategory'       => array(),
	);

	/**
	 * Create or update a content category
	 *
	 * @param string  $category_name The category name to create or update
	 * @param string  $content_type The content type to create/update for
	 * @param integer $category_id The category ID for update if not new
	 * @param integer $parent_id The category parent ID to set
	 * @return void
	 */
	public static function saveCategory( string $category_name, string $content_type, int $category_id = 0, int $parent_id = 0 ) {

		$data = array(
			'category_name' => $category_name,
			'content_type'  => $content_type,
			'category_id'   => $category_id,
			'parent_id'     => $parent_id,
		);

		$cat_id = Category::createUpdateCategory( $data );
		if ( ! empty( $cat_id ) ) {
			wp_send_json_success(
				array(
					'message'    => esc_html__( 'Category has been saved', 'solidie' ),
					'categories' => Category::getCategories(),
				)
			);
		} else {
			wp_send_json_error( array( 'message' => esc_html__( 'Failed to save category', 'solidie' ) ) );
		}
	}

	/**
	 * Save Category sequence order
	 *
	 * @param array $mapping
	 * @return void
	 */
	public static function saveCategorySequence( array $mapping ) {
		Category::updateSequence( $mapping );
		wp_send_json_success();
	}

	/**
	 * Delete single category
	 *
	 * @param int $category_id The category ID to delete
	 * @return void
	 */
	public static function deleteCategory( int $category_id ) {
		Category::deleteCategory( $category_id );
		wp_send_json_success(
			array(
				'message'    => esc_html__( 'Category deleted', 'solidie' ),
				'categories' => Category::getCategories(),
			)
		);
	}
}
