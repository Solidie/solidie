<?php

namespace Solidie\Models;

use Solidie\Helpers\_Array;

class Contents {
	
	/**
	 * The meta key to store thumbnail image ID
	 */
	const MEDIA_IDS_KEY = 'content-media-ids';

	/**
	 * Get associated product id by content id
	 *
	 * @param integer $content_id
	 * @return int
	 */
	public static function getProductID( int $content_id ) {
		global $wpdb;

		$id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT product_id FROM " . DB::contents() . " WHERE content_id=%d",
				$content_id
			)
		);

		return $id ? $id : 0;
	}

	/**
	 * Create or update content
	 *
	 * @param array $content_data
	 * @return int
	 */
	public static function updateContent( array $content_data, array $files ) {
		$content = array();
		$gmdate  = gmdate( 'Y-m-d H:i:s' );

		/* -------------- Create or update the content itself -------------- */
		// Determine content ID
		$content['content_id']          = ! empty( $content_data['content_id'] ) ? $content_data['content_id'] : 0;
		$content['product_id']          = ! empty( $content_data['product_id'] ) ? $content['product_id'] : null;
		$content['content_title']       = ! empty( $content_data['content_title'] ) ? $content_data['content_title'] : 'Untitled Content';
		$content['content_description'] = ! empty( $content_data['content_description'] ) ? $content_data['content_description'] : null;
		$content['product_id']          = ! empty( $content_data['product_id'] ) ? $content_data['product_id'] : null;
		$content['content_type']        = $content_data['content_type'];
		$content['category_id']         = $content_data['category_id'] ?? null;
		$content['content_status']      = 'publish'; // To Do: Introduce other statuses in pro add on.
		$content['contributor_id']      = $content_data['contributor_id'] ?? get_current_user_id();
		$content['modified_at']         = $gmdate;

		// Create or update content
		global $wpdb;
		if ( empty( $content['content_id'] ) ) {
			$content['created_at'] = $gmdate;
			$wpdb->insert(
				DB::contents(),
				$content
			);
			$content['content_id'] = $wpdb->insert_id;

			// For now set the ID as slug. Customization feature will be added later.
			if ( ! empty( $wpdb->insert_id ) && is_numeric( $wpdb->insert_id ) ) {
				$wpdb->update(
					DB::contents(),
					array( 'content_slug' => $wpdb->insert_id ),
					array( 'content_id' => $wpdb->insert_id )
				);
			}
		} else {
			// Update the content as content ID exists
			$wpdb->update(
				DB::contents(),
				$content,
				array(
					'content_id' => $content['content_id']
				)
			);
		}

		/* -------------- Manage content media -------------- */
		// Return false if the content ID missing that impies creation failed
		$content_id = $content['content_id'];
		if ( empty( $content_id ) ) {
			return false;
		}

		// Necessary file names to work on
		$file_names = array( 
			'thumbnail'     => 'Thumbnail', 
			'preview'       => 'Preview', 
			'sample_images' => 'Sample Image' 
		);
		
		// Prepare the initial media meta value
		$meta      = Meta::content( $content_id );
		$media_ids = $meta->getMeta( self::MEDIA_IDS_KEY );
		$media_ids = _Array::getArray( $media_ids );
		$media_ids = array_merge(
			array(
				'thumbnail'     => 0,
				'preview'       => 0,
				'sample_images' => array()
			),
			$media_ids
		);

		// Delete the removed samples images from the meta array
		$sample_images = $content_data['sample_images'] ?? array();
		$sample_images = ! is_array( $sample_images ) ? array() : $sample_images;
		$remaining_ids = array();
		foreach ( $sample_images as $image ) {
			if ( is_array( $image ) && ! empty( $image['file_id'] ) ) {
				$remaining_ids[] = $image['file_id'];
			}
		}

		// Get the sample image IDs that have been removed
		$removed_ids = array_diff( $media_ids['sample_images'], $remaining_ids );

		// Set the latest image IDs to save
		$media_ids['sample_images'] = array_diff( $media_ids['sample_images'], $removed_ids );

		// Delete the removed files now
		FileManager::deleteFile( $removed_ids );
		
		// Loop through initial uploaded files array 
		// Save thumbnail, preview and sample images altogether
		foreach ( $file_names as $name => $file_type_label ) {
			if ( empty( $files[ $name ] ) ) {
				continue;
			}

			// Sync file array structure to process at once
			$_files = is_array( $media_ids[ $name ] ) ? FileManager::organizeUploadedHierarchy( $files[ $name ] ) : array( $files[ $name ] );

			// Loop through synced files structure
			foreach ( $_files as $file ) {
				$new_file_id = FileManager::uploadFile( $content['content_id'], $file, $content['content_title'] . ' - ' . $file_type_label );
				if ( ! empty( $new_file_id ) ) {

					// Delete existing thumbnail and preview file, These two can't be duplicated.
					if ( in_array( $name, array( 'thumbnail', 'preview' ), true ) ) {
						FileManager::deleteFile( $media_ids[ $name ] ?? 0 );
					}
					
					if ( is_array( $media_ids[ $name ] ) ) {
						$media_ids[ $name ][] = $new_file_id;
					} else {
						$media_ids[ $name ] = $new_file_id;
					}
				}
			}
		}

		// Eventually update the media meta
		$meta->updateMeta( self::MEDIA_IDS_KEY, $media_ids );
		
		/* -------------- Create or update the main downloadable file -------------- */
		// Save downloadable file through release to maintain consistency with app type content and other dependencies.
		if ( ! empty( $files['downloadable_file'] ) ) {
			Release::pushRelease(
				array(
					'version'    => $content_data['version'] ?? null,
					'changelog'  => $content_data['changelog'] ?? null,
					'content_id' => $content_id,
					'release_id' => ( int ) ( $content_data['release_id'] ?? 0 ),
					'file'       => $files['downloadable_file']
				)
			);
		}

		return $content_id;
	}

	/**
	 * Get release log
	 *
	 * @param integer $content_id
	 * @return array
	 */
	public static function getReleases( int $content_id) {
		global $wpdb;
		$releases = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT * FROM " . DB::releases() . " WHERE content_id=%d ORDER BY release_date DESC",
				$content_id
			)
		);

		// To Do: Assign download links

		return $releases;
	}

	/**
	 * Get content by content id
	 *
	 * @param integer $content_id
	 * @return array|null
	 */
	public static function getContentByContentID( $content_id, $field = null, $public_only = true ) {
		return self::getContentByField( 'content_id', $content_id, $field, $public_only );
	}

	/**
	 * Get single content by field
	 *
	 * @param string $field_name
	 * @param string|integer $field_value
	 * 
	 * @return array|null
	 */
	public static function getContentByField( string $field_name, $field_value, $field = null, $public_only = true ) {
		// Post creator user can preview own product regardless of post status.
		$current_user_id = get_current_user_id();
		$status_clause   = $public_only ? ' AND (content.content_status="publish" OR content.contributor_id=' . $current_user_id . ') ' : '';

		// Admin and editor also can visit products no matter what the status is. Other users can only if the product is public.
		if ( User::validateRole( $current_user_id, array( 'administrator', 'editor' ) ) ) {
			$status_clause = '';
		}

		global $wpdb;
		$content = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT content.*, content.contributor_id as author_id FROM " . DB::contents() . " content 
				LEFT JOIN {$wpdb->users} _user ON content.contributor_id=_user.ID 
				WHERE content." . $field_name . "=%s" . $status_clause,
				$field_value
			),
			ARRAY_A
		);

		if ( empty( $content ) || ! is_array( $content ) ) {
			return null;
		}

		// Assign media
		

		// Apply content meta
		$content = _Array::castRecursive( $content );
		$content = self::assignContentMedia( $content );
		$content = self::assignContentMeta( $content );

		return $field ? ( $content[ $field ] ?? null ) : $content;
	}

	/**
	 * Assign content media data like preview, thumbnail, sample images
	 *
	 * @param array $contents
	 * @return array
	 */
	public static function assignContentMedia( array $contents ) {
		
		if ( empty( $contents ) ) {
			return $contents;
		}

		if ( $was_single = ! _Array::isTwoDimensionalArray( $contents ) ) {
			$contents = array( $contents );
		}

		// Loop through every contents
		foreach ( $contents as $index => $content ) {
			$meta  = Meta::content( $content['content_id'] );
			$media = $meta->getMeta( self::MEDIA_IDS_KEY );

			// Loop through media like thumbnail, preview
			foreach ( $media as $key => $id ) {
				if ( empty( $id ) ) {
					continue;
				}

				$is_array = is_array( $id );

				// Make even singular IDs to array for consistent operations
				$ids   = $is_array ? $id : array( $id );
				$files = array();

				// Loop through every single file IDs and get info
				foreach ( $ids as $file_id ) {
					$files[] = array(
						'file_id'   => $file_id,
						'file_url'  => FileManager::getMediaPermalink( $file_id ),
						'file_name' => get_the_title( $file_id ),
						'mime_type' => get_post_mime_type( $file_id ),
					);
				}

				$media[ $key ] = $is_array ? $files : ($files[0] ?? null);
			}

			// Assign the prepared file info array to contents array
			$contents[ $index ]['media'] = $media;
		}

		return $was_single ? $contents[0] : $contents;
	}

	/**
	 * Check if a product is solidie content
	 *
	 * @param string|int $product_id_or_name
	 * @return boolean
	 */
	public static function isProductContent( $product_id_or_name ) {
		return self::getContentByProduct( $product_id_or_name ) !== null;
	}

	/**
	 * Check if a content is enabled by content ID
	 *
	 * @param object|int $content_id Content object or content id
	 * 
	 * @return boolean
	 */
	public static function isContentEnabled( $content_id ) {
		$content = is_object( $content_id ) ? $content_id : self::getContentByContentID( $content_id );
		return ! empty( $content ) ? self::isContentTypeEnabled( $content['content_type'] ) : false;
	}

	/**
	 * Content type check if enabled
	 *
	 * @param string $content_type
	 * @return boolean
	 */
	public static function isContentTypeEnabled( $content_type ) {
		return AdminSetting::get( 'contents.' . $content_type . '.enable' );
	}

	/**
	 * Get Content by product id and post name.
	 * 
	 * @param string|int $product_id_or_name
	 *
	 * @return object|int|string|null
	 */
	public static function getContentByProduct( $product_id, $field = null, $public_only = true ) {
		if ( ! is_numeric( $product_id ) ) {
			$product = get_page_by_path( $product_id, OBJECT, 'product' );

			if ( empty( $product ) ) {
				return null;
			}

			$product_id = $product->ID;
		}

		return self::getContentByField( 'product_id', $product_id, $field, $public_only );
	}

	/**
	 * Get permalink by product id as per content type
	 *
	 * @param int|array $product_id Single content ID or whole content array
	 * 
	 * @return string
	 */
	public static function getPermalink( $content_id ) {
		
		$content = is_array( $content_id ) ? $content_id : Field::contents()->getField( array( 'content_id' => $content_id ), array( 'content_type', 'content_slug' ) );
		if ( empty( $content ) ) {
			return null;
		}

		$base_slug = AdminSetting::get( 'contents.' . $content['content_type'] . '.slug' );
		return get_home_url() . '/' . trim( $base_slug, '/' ) . '/' . $content['content_slug'] . '/';
	}

	/**
	 * Get purchae by order id and variation id
	 *
	 * @param integer $order_id
	 * @param integer $variation_id
	 * @return object|null
	 */
	public static function getPurchaseByOrderVariation( int $order_id, int $variation_id ) {
		global $wpdb;
		$purchase = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM " . DB::sales() . " WHERE order_id=%d AND variation_id=%d",
				$order_id,
				$variation_id
			)
		);

		return ( $purchase && is_object( $purchase ) ) ? $purchase : null;
	}

	/**
	 * Get bulk contents
	 *
	 * @param array $args
	 * @param bool $segmentation
	 * @return array
	 */
	public static function getContents( array $args, bool $segmentation = false ) {
		// Prepare arguments
		$content_type = $args['content_type'] ?? null;
		$customer_id  = $args['customer_id'] ?? null;
		$keyword      = $args['search'] ?? '';
		$category_ids = $args['category_ids'] ?? array();
		$page         = DB::getPage( $args['page'] ?? null );
		$limit        = DB::getLimit( $args['limit'] ?? null );

		// To Do: Validate paramaters for the user as per context. 

		$limit_clause  = " LIMIT " . $limit;
		$offset_clause = " OFFSET " . ( absint( $page - 1 ) * $limit );
		$where_clause  = ' 1=1';
		
		// Content type filter
		if ( ! empty( $content_type ) ) {
			$c_type = esc_sql( $content_type );
			$where_clause .= " AND content.content_type='{$c_type}'";
		}

		// Customer filter
		if ( ! empty( $customer_id ) ) {
			$where_clause .= " AND sale.customer_id=" . $customer_id;
		}

		// Search filter
		if ( ! empty( $keyword ) ) {
			$_keyword = esc_sql( $keyword );
			$where_clause .= " AND (content.content_title LIKE '%{$_keyword}%' OR content.content_description LIKE '%{$_keyword}%')";
		}

		// Filter category
		if ( ! empty( $category_ids ) ) {

			// Get child IDs 
			$all_ids = array();
			foreach ( $category_ids as $id ) {
				$children  = Category::getChildren( $id );
				$all_ids = array_merge( $all_ids, array_column( $children, 'category_id' ) );
			}

			// Merge and consolidate all the IDs together
			$all_ids = array_unique( array_merge( $all_ids, $category_ids ) );
			$ids_in = implode( ',', $all_ids );

			$where_clause .= " AND content.category_id IN ({$ids_in})";
		}

		if ( $segmentation ) {
			$selects = 'COUNT(content.content_id)';
		} else {
			$selects = '
				DISTINCT
				content.content_title, 
				content.product_id, 
				content.content_id, 
				content.content_type, 
				content.content_status, 
				content.content_slug,
				UNIX_TIMESTAMP(content.created_at) AS created_at,
				cat.category_name,
				sale.sale_id';
		}

		$query = "SELECT {$selects}
			FROM " . DB::contents() . " content 
				LEFT JOIN " . DB::sales() . " sale ON content.content_id=sale.content_id
				LEFT JOIN " . DB::categories() . " cat ON content.category_id=cat.category_id
			WHERE {$where_clause} " . ( $segmentation ? '' : "{$limit_clause} {$offset_clause}" );

		global $wpdb;
		if ( $segmentation ) {
			$total_count = (int) $wpdb->get_var( $query );
			$page_count  = ceil( $total_count / $limit );

			return array(
				'total_count' => $total_count,
				'page_count'  => $page_count,
				'page'        => $page,
				'limit'       => $limit,
			);

		} else {
			$contents = $wpdb->get_results( $query, ARRAY_A );
		}

		$contents = _Array::castRecursive( $contents );
		$contents = self::assignContentMedia( $contents );
		$contents = self::assignContentMeta( $contents );
		
		return $contents;
	}

	/**
	 * Undocumented function
	 *
	 * @param array|object $content
	 * @param array $meta_array
	 * @return array|object
	 */
	public static function assignContentMeta( $contents ) {
		if ( empty( $contents ) ) {
			return $contents;
		}

		// Support both list and single content
		if ( $was_single = ! _Array::isTwoDimensionalArray( $contents ) ) {
			$contents = array( $contents );
		}

		foreach ( $contents as $index => $content ) {
			// Content permalink
			$contents[ $index ]['content_url'] = self::getPermalink( $content );

			// Releases no matter app or other content type as the structure is same always
			$contents[ $index ]['releases'] = Release::getReleases( (int) $content['content_id'] );
		}

		$contents = apply_filters( 'solidie_contents_meta', $contents );

		return $was_single ? $contents[0] : $contents;
	}

	/**
	 * Delete content by content ID
	 *
	 * @param int $content_id
	 * @return bool
	 */
	public static function deleteContent( $content_id ) {

		// Meta object
		$meta = Meta::content( $content_id );

		// Delete preview file
		$media_ids = $meta->getMeta( self::MEDIA_IDS_KEY );
		$media_ids = array_values( _Array::getArray( $media_ids ) );
		$media_ids = _Array::flattenArray( $media_ids );
		FileManager::deleteFile( $media_ids );

		// Delete all the meta
		$meta->deleteBulkMeta( $content_id );

		// Delete releases
		Release::deleteReleaseByContentId( $content_id );

		// To Do: Delete sales and connected license keys

		// To Do: Delete associated tags

		// To Do: Delete associated product

		// Delete the directory created for this content
		FileManager::deleteDirectory( FileManager::getContentDir( $content_id ) );

		// Delete the content itself at the end
		global $wpdb;
		$wpdb->delete(
			DB::contents(),
			array(
				'content_id' => $content_id
			)
		);
	}

	/**
	 * Get content ID by slug
	 *
	 * @param string $slug
	 * @return int|null
	 */
	public static function getContentIdBySlug( string $slug ) {
		return Field::contents()->getField( array( 'content_slug' => $slug ), 'content_id' );
	}
}
