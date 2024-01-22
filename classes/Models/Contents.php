<?php
/**
 * Content manager
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Helpers\_Array;
use Solidie\Helpers\_String;

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
	 * @param array $files Attached media data
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

		$is_update = false;

		// Create or update content
		global $wpdb;
		if ( empty( $content['content_id'] ) ) {
			$content['created_at'] = $gmdate;
			$wpdb->insert(
				$wpdb->solidie_contents,
				$content
			);
			$content['content_id'] = $wpdb->insert_id;

			// Set default content slug
			if ( ! empty( $wpdb->insert_id ) && is_numeric( $wpdb->insert_id ) ) {
				Field::contents()->updateField(
					array( 'content_slug' => $content['content_type'] . '-' . $wpdb->insert_id ),
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

		// Get the sample image IDs that have been removed
		$removed_ids = array_diff( $media_ids['sample_images'], $files['sample_image_ids'] );

		// Set the latest image IDs to save
		$media_ids['sample_images'] = array_diff( $media_ids['sample_images'], $removed_ids );

		// Delete the removed sample image files first
		// New uploads will be saved in the next loop below
		FileManager::deleteFile( $removed_ids );

		// Loop through initial uploaded files array
		// Save thumbnail, preview and sample images altogether
		foreach ( array( 'thumbnail', 'preview', 'sample_images' ) as $name ) {
			// If no file info, nor uploaded new, skip.
			if ( empty( $files[ $name ] ) ) {
				continue;
			}

			// Sync file array structure to process at once
			$_files = is_array( $media_ids[ $name ] ) ? FileManager::organizeUploadedHierarchy( $files[ $name ] ) : array( $files[ $name ] );

			// Loop through synced files structure
			foreach ( $_files as $file ) {
				// Skip if the new file is not uploaded.
				if ( empty( $file['tmp_name'] ) ) {
					continue;
				}

				// Delete existing thumbnail and preview file if new file uploaded for these.
				if ( in_array( $name, array( 'thumbnail', 'preview' ), true ) ) {
					FileManager::deleteFile( $media_ids[ $name ] ?? 0 );
				}

				// Now create new file for it
				$new_file_id = FileManager::uploadFile( $content['content_id'], $file );
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
		if ( is_array( $files['downloadable_file'] ) && ! empty( $files['downloadable_file']['tmp_name'] ) ) {
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
				"SELECT * FROM {$wpdb->solidie_releases} WHERE content_id=%d ORDER BY release_date DESC",
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
		global $wpdb;

		// Post creator user can preview own product regardless of post status.
		$current_user_id = get_current_user_id();
		$status_clause   = $public_only ? $wpdb->prepare( ' AND (content.content_status="publish" OR content.contributor_id=%d) ', $current_user_id ) : '';

		// Admin and editor also can visit products no matter what the status is. Other users can only if the product is public.
		if ( User::validateRole( $current_user_id, array( 'administrator', 'editor' ) ) ) {
			$status_clause = '';
		}

		$content = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT 
					content.*, 
					content.contributor_id as author_id 
				FROM {$wpdb->solidie_contents} content 
					LEFT JOIN {$wpdb->users} _user ON content.contributor_id=_user.ID 
				WHERE content.{$field_name}=%s {$status_clause}",
				$field_value
			),
			ARRAY_A
		);

		if ( empty( $content ) || ! is_array( $content ) ) {
			return null;
		}

		// Apply content meta
		$content = _Array::castRecursive( $content );
		$content = self::assignContentMedia( $content );
		$content = self::assignContentMeta( $content );

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
			$media = $meta->getMeta( self::MEDIA_IDS_KEY, array() );

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
					$files[] = FileManager::getFileInfo( $file_id );
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
	 * @param array|int $content_id Single content data array or content id integer
	 *
	 * @return boolean
	 */
	public static function isContentEnabled( $content_id ) {
		$content = is_array( $content_id ) ? $content_id : self::getContentByContentID( $content_id );
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
	 * @param int|array $content_id Single content ID or whole content data array
	 *
	 * @return string
	 */
	public static function getPermalink( $content_id ) {

		if ( is_array( $content_id ) ) {
			$content = $content_id;
		} else {
			$content = Field::contents()->getField(
				array( 'content_id' => $content_id ),
				array( 'content_type', 'content_slug' )
			);
		}

		if ( empty( $content ) || empty( $content['content_slug'] ) ) {
			return null;
		}

		return self::getGalleryPermalink( $content['content_type'] ) . $content['content_slug'] . '/';
	}

	/**
	 * Get gallery url for content type
	 *
	 * @param string $content_type The content type to get gallery permalink for
	 * @return string
	 */
	public static function getGalleryPermalink( string $content_type ) {
		$base_slug = AdminSetting::get( 'contents.' . $content_type . '.slug' );
		return get_home_url() . '/' . trim( $base_slug, '/' ) . '/';
	}

	/**
	 * Get bulk contents
	 *
	 * @param array $args Arguments to get contents based on
	 * @param bool  $segmentation Whether to return pagination data
	 * @return array
	 */
	public static function getContents( array $args, bool $segmentation = false ) {

		global $wpdb;

		// Prepare arguments
		$content_type = $args['content_type'] ?? null;
		$keyword      = $args['search'] ?? '';
		$category_ids = $args['category_ids'] ?? array();
		$order_by     = $args['order_by'] ?? 'trending';
		$page         = DB::getPage( $args['page'] ?? null );
		$limit        = DB::getLimit( $args['limit'] ?? null );
		$offset       = absint( $page - 1 ) * $limit;

		// To Do: Validate paramaters for the user as per context.

		$where_clause = '';

		// Content type filter
		$where_clause .= ! empty( $content_type ) ? $wpdb->prepare( ' AND content.content_type=%s', $content_type ) : '';

		// Search filter
		if ( ! empty( $keyword ) ) {
			$where_clause .= $wpdb->prepare(
				' AND (content.content_title LIKE %s OR content.content_description LIKE %s)',
				"%{$wpdb->esc_like( $keyword )}%",
				"%{$wpdb->esc_like( $keyword )}%"
			);
		}

		// Filter category
		$category_ids_in = array();
		if ( ! empty( $category_ids ) ) {

			// Get child IDs
			$all_ids = array();
			foreach ( $category_ids as $id ) {
				$children = Category::getChildren( $id );
				$all_ids  = array_merge( $all_ids, array_column( $children, 'category_id' ) );
			}

			// Merge and consolidate all the IDs together
			$category_ids_in = array_unique( array_merge( $all_ids, $category_ids ) );
			$ids_places      = _String::getPlaceHolders( $category_ids_in );

			$where_clause .= " AND content.category_id IN ({$ids_places})";
		}

		// If it is segmentation
		if ( $segmentation ) {

			$total_count = (int) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT 
						COUNT(content.content_id)
					FROM 
						{$wpdb->solidie_contents} content 
						LEFT JOIN {$wpdb->solidie_categories} cat ON content.category_id=cat.category_id
						LEFT JOIN {$wpdb->solidie_popularity} pop ON content.content_id=pop.content_id
					WHERE 1=1 {$where_clause}",
					...$category_ids_in
				)
			);

			$page_count = ceil( $total_count / $limit );

			return array(
				'total_count' => $total_count,
				'page_count'  => $page_count,
				'page'        => $page,
				'limit'       => $limit,
			);
		}

		// Determine how to sort the list
		$order_by     = 'newest' === $order_by ? 'content.created_at' : 'download_count, download_date';
		$order_clause = " GROUP BY content.content_id ORDER BY {$order_by} DESC";
		$limit_offset = $wpdb->prepare( ' LIMIT %d OFFSET %d', $limit, $offset );

		// If not segmentation, return data
		$contents = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT
					content.content_title, 
					content.product_id, 
					content.content_id, 
					content.content_type, 
					content.content_status, 
					content.content_slug,
					COUNT(pop.download_id) AS download_count,
					pop.download_date,
					UNIX_TIMESTAMP(content.created_at) AS created_at,
					cat.category_name
				FROM 
					{$wpdb->solidie_contents} content 
					LEFT JOIN {$wpdb->solidie_categories} cat ON content.category_id=cat.category_id
					LEFT JOIN {$wpdb->solidie_popularity} pop ON content.content_id=pop.content_id
				WHERE 1=1 {$where_clause} {$order_clause} {$limit_offset}",
				...$category_ids_in
			),
			ARRAY_A
		);

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

	/**
	 * Get product/s by meta key and value
	 *
	 * @param string $key The meta key
	 * @param mixed  $value The value to get post by
	 * @param mixed  $post_type The post type to get by.
	 * @param bool   $single Whether to return single product object or the array. Defualt true, means the first single product object.
	 *
	 * @return object|array|null
	 */
	public static function getPostByMeta( $key, $value, $post_type, $single = true ) {

		$products = get_posts(
			array(
				'post_type'      => $post_type,
				'posts_per_page' => $single ? 1 : -1,
				'meta_query'     => array(
					array(
						'key'     => $key,
						'value'   => $value,
						'compare' => '=',
					),
				),
			)
		);

		// Return first product object if single, otherwise the array of products.
		return $single ? ( $products[0] ?? null ) : $products;
	}
}
