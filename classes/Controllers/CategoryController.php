<?php

namespace Solidie\Controllers;

use Solidie\Models\Category;

class CategoryController {

	const PREREQUISITES = array(
		'saveCategory' => array(),
		'getCategories' => array(),
		'deleteCategory' => array()
	);

	/**
	 * Create or update category
	 *
	 * @param array $data Request Data
	 * @return void
	 */
	public static function saveCategory( array $data ) {
		$cat_id = Category::createUpdateCategory( $data );
		if ( ! empty( $cat_id ) ) {
			wp_send_json_success( array(
				'message'    => __( 'Category has been saved' , 'solidie'),
				'categories' => Category::getCategories()
			) );
		} else {
			wp_send_json_error( array( 'message' => __( 'Failed to save category', 'solidie' ) ) );
		}
	}

	/**
	 * Delete single category 
	 *
	 * @param array $data
	 * @return void
	 */
	public static function deleteCategory( array $data ) {
		Category::deleteCategory( $data['category_id'] ?? 0 );
		wp_send_json_success(array(
			'message'    => __( 'Category deleted', 'solidie' ),
			'categories' => Category::getCategories()
		));
	}
}
