<?php
/**
 * Content manager
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Helpers\_Array;

/**
 * Content manager class
 */
class Contents {

	/**
	 * The meta key to store thumbnail image ID
	 */
	const MEDIA_IDS_KEY = 'content-media-ids';

	/**
	 * Create or update content
	 *
	 * @param array $content_data Content data array to create or update
	 * @param array $files        Attached media
	 * @return int
	 */
	public static function updateContent( array $content_data, array $files ) {
		$content = array();
		$gmdate  = gmdate( 'Y-m-d H:i:s' );

		// -------------- Create or update the content itself --------------
		// Determine content ID
		$content['content_id']          = ! empty( $content_data['content_id'] ) ? $content_data['content_id'] : 0;
		$content['content_title']       = ! empty( $content_data['content_title'] ) ? $content_data['content_title'] : 'Untitled Content';
		$content['content_description'] = ! empty( $content_data['content_description'] ) ? $content_data['content_description'] : null;
		$content['content_type']        = $content_data['content_type'];
		$content['category_id']         = $content_data['category_id'] ?? null;
		$content['content_status']      = 'publish'; // To Do: Introduce other statuses in pro add on.
		$content['contributor_id']      = $content_data['contributor_id'] ?? get_current_user_id();
		$content['modified_at']         = $gmdate;

		//
		$is_update = false;

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
				Field::contents()->updateField(
					array( 'content_slug' => $wpdb->insert_id ),
					array( 'content_id' => $wpdb->insert_id )
				);
			}
		} else {
			// Update the content as content ID exists
			Field::contents()->updateField(
				$content,
				array( 'content_id' => $content['content_id'] )
			);
			$is_update = true;
		}

		// -------------- Manage content media --------------
		// Return false if the content ID missing that impies creation failed
		$content_id = $content['content_id'];
		if ( empty( $content_id ) ) {
			return false;
		}

		// Necessary file names to work on
		$file_names = array(
			'thumbnail'     => 'Thumbnail',
			'preview'       => 'Preview',
			'sample_images' => 'Sample Image',
		);

		// Prepare the initial media meta value
		$meta      = Meta::content( $content_id );
		$media_ids = $meta->getMeta( self::MEDIA_IDS_KEY );
		$media_ids = _Array::getArray( $media_ids );
		$media_ids = array_merge(
			array(
				'thumbnail'     => 0,
				'preview'       => 0,
				'sample_images' => array(),
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
				// Delete existing thumbnail and preview file, These two can't be duplicated.
				if ( in_array( $name, array( 'thumbnail', 'preview' ), true ) ) {
					FileManager::deleteFile( $media_ids[ $name ] ?? 0 );
				}

				// Now create new file for it
				$new_file_id = FileManager::uploadFile( $content['content_id'], $file, $content['content_title'] . ' - ' . $file_type_label );
				if ( ! empty( $new_file_id ) ) {
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

		// -------------- Create or update the main downloadable file --------------
		// Save downloadable file through release to maintain consistency with app type content and other dependencies.
		if ( ! empty( $files['downloadable_file'] ) ) {
			Release::pushRelease(
				array(
					'version'    => $content_data['version'] ?? null,
					'changelog'  => $content_data['changelog'] ?? null,
					'content_id' => $content_id,
					'release_id' => (int) ( $content_data['release_id'] ?? 0 ),
					'file'       => $files['downloadable_file'],
				)
			);
		}

		$hook = $is_update ? 'solidie_content_updated' : 'solidie_content_created';
		do_action( $hook, $content_id, $content, $content_data );

		return $content_id;
	}

	/**
	 * Get release log
	 *
	 * @param integer $content_id The content ID to get releases of
	 * @return array
	 */
	public static function getReleases( int $content_id ) {
		global $wpdb;
		$releases = $wpdb->get_results(
			$wpdb->prepare(
				'SELECT * FROM ' . DB::releases() . ' WHERE content_id=%d ORDER BY release_date DESC',
				$content_id
			)
		);

		return $releases;
	}

	/**
	 * Get content by content id
	 *
	 * @param integer $content_id The content ID to get content by
	 * @param string  $field To get specific field
	 * @param bool    $public_only Whether to get only public
	 * @return array|null
	 */
	public static function getContentByContentID( $content_id, $field = null, $public_only = true ) {
		return self::getContentByField( 'content_id', $content_id, $field, $public_only );
	}

	/**
	 * Get single content by field
	 *
	 * @param string         $field_name The field to get content by
	 * @param string|integer $field_value The value to match
	 * @param string         $field To get specific field rather than whole data
	 * @param bool           $public_only Whether to get only public
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
				'SELECT content.*, content.contributor_id as author_id FROM ' . DB::contents() . " content 
				LEFT JOIN {$wpdb->users} _user ON content.contributor_id=_user.ID 
				WHERE content." . $field_name . '=%s' . $status_clause,
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
		$content = apply_filters( 'solidie_single_content', $content );

		return $field ? ( $content[ $field ] ?? null ) : $content;
	}

	/**
	 * Assign content media data like preview, thumbnail, sample images
	 *
	 * @param array $contents The content array to add media data to
	 * @return array
	 */
	public static function assignContentMedia( array $contents ) {

		if ( empty( $contents ) ) {
			return $contents;
		}

		$was_single = ! _Array::isTwoDimensionalArray( $contents );
		if ( $was_single ) {
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

				$media[ $key ] = $is_array ? $files : ( $files[0] ?? null );
			}

			// Assign the prepared file info array to contents array
			$contents[ $index ]['media'] = $media;
		}

		return $was_single ? $contents[0] : $contents;
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
	 * @param string $content_type The content type to check if enaled
	 * @return boolean
	 */
	public static function isContentTypeEnabled( $content_type ) {
		return AdminSetting::get( 'contents.' . $content_type . '.enable' );
	}

	/**
	 * Get permalink by product id as per content type
	 *
	 * @param int|array $content_id Single content ID or whole content array
	 *
	 * @return string
	 */
	public static function getPermalink( $content_id ) {

		$content = is_array( $content_id ) ? $content_id : Field::contents()->getField( array( 'content_id' => $content_id ), array( 'content_type', 'content_slug' ) );
		if ( empty( $content ) ) {
			return null;
		}

		return self::getCatalogPermalink( $content['content_type'] ) . $content['content_slug'] . '/';
	}

	/**
	 * Get catalog url for content type
	 *
	 * @param string $content_type The content type to get catalog permalink for
	 * @return string
	 */
	public static function getCatalogPermalink( string $content_type ) {
		$base_slug = AdminSetting::get( 'contents.' . $content_type . '.slug' );
		return get_home_url() . '/' . trim( $base_slug, '/' ) . '/';
	}

	/**
	 * Get bulk contents
	 *
	 * @param array $args Arguments to get contents based on
	 * @param bool  $segmentation Whether to add pagination data
	 * @return array
	 */
	public static function getContents( array $args, bool $segmentation = false ) {
		// Prepare arguments
		$content_type = $args['content_type'] ?? null;
		$customer_id  = $args['customer_id'] ?? null;
		$keyword      = $args['search'] ?? '';
		$category_ids = $args['category_ids'] ?? array();
		$order_by     = $args['order_by'] ?? 'trending';
		$page         = DB::getPage( $args['page'] ?? null );
		$limit        = DB::getLimit( $args['limit'] ?? null );

		// To Do: Validate paramaters for the user as per context.

		$where_clause  = ' 1=1';
		$order_clause  = '';
		$limit_clause  = ' LIMIT ' . $limit;
		$offset_clause = ' OFFSET ' . ( absint( $page - 1 ) * $limit );

		// Content type filter
		if ( ! empty( $content_type ) ) {
			$c_type        = esc_sql( $content_type );
			$where_clause .= " AND content.content_type='{$c_type}'";
		}

		// Customer filter
		if ( ! empty( $customer_id ) ) {
			$where_clause .= ' AND sale.customer_id=' . $customer_id;
		}

		// Search filter
		if ( ! empty( $keyword ) ) {
			$_keyword      = esc_sql( $keyword );
			$where_clause .= " AND (content.content_title LIKE '%{$_keyword}%' OR content.content_description LIKE '%{$_keyword}%')";
		}

		// Filter category
		if ( ! empty( $category_ids ) ) {

			// Get child IDs
			$all_ids = array();
			foreach ( $category_ids as $id ) {
				$children = Category::getChildren( $id );
				$all_ids  = array_merge( $all_ids, array_column( $children, 'category_id' ) );
			}

			// Merge and consolidate all the IDs together
			$all_ids = array_unique( array_merge( $all_ids, $category_ids ) );
			$ids_in  = implode( ',', $all_ids );

			$where_clause .= " AND content.category_id IN ({$ids_in})";
		}

		// Order by
		if ( ! $segmentation ) {
			if ( 'newest' === $order_by ) {
				$order_clause .= ' ORDER BY content.created_at DESC ';
			} else {
				// Trending by default
				$order_clause .= ' ORDER BY download_count, download_date DESC ';
			}

			$order_clause = " GROUP BY content.content_id, sale.sale_id {$order_clause}";
		}

		if ( $segmentation ) {
			$selects = 'COUNT(content.content_id)';
		} else {
			$selects = '
				content.content_title, 
				content.product_id, 
				content.content_id, 
				content.content_type, 
				content.content_status, 
				content.content_slug,
				COUNT(pop.download_id) AS download_count,
				pop.download_date,
				UNIX_TIMESTAMP(content.created_at) AS created_at,
				cat.category_name,
				sale.sale_id';
		}

		$query = "SELECT {$selects}
			FROM " . DB::contents() . ' content 
				LEFT JOIN ' . DB::sales() . ' sale ON content.content_id=sale.content_id
				LEFT JOIN ' . DB::categories() . ' cat ON content.category_id=cat.category_id
				LEFT JOIN ' . DB::popularity() . " pop ON content.content_id=pop.content_id
			WHERE {$where_clause} {$order_clause} " . ( $segmentation ? '' : "{$limit_clause} {$offset_clause}" );

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
	 * @param array $contents Content array to append content meta to
	 * @return array
	 */
	public static function assignContentMeta( $contents ) {
		if ( empty( $contents ) ) {
			return $contents;
		}

		// Support both list and single content
		$was_single = ! _Array::isTwoDimensionalArray( $contents );
		if ( $was_single ) {
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
	 * @param int $content_id The content ID to delete
	 * @return void
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
		Field::contents()->deleteField( array( 'content_id' => $content_id ) );
	}

	/**
	 * Get content ID by slug
	 *
	 * @param string $slug The content slug to get content by
	 * @return int|null
	 */
	public static function getContentIdBySlug( string $slug ) {
		return Field::contents()->getField( array( 'content_slug' => $slug ), 'content_id' );
	}
}
