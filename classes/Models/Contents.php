<?php
/**
 * Content manager
 *
 * @package solidie
 */

namespace Solidie\Models;

use Solidie\Helpers\Geo;
use Solidie\Helpers\Utilities;
use SolidieLib\_Array;
use SolidieLib\_String;
use Solidie\Main;

/**
 * Content manager class
 */
class Contents {

	/**
	 * The meta key to store thumbnail image ID
	 */
	const MEDIA_IDS_KEY = 'content-media-ids';

	/**
	 * Meta key for product to store corresponding content ID
	 */
	const PRODUCT_META_KEY_FOR_CONTENT = 'solidie-content-id';

	/**
	 * Possible content statuses
	 */
	const CONTENT_STATUSES = array(
		'draft', 
		'publish', 
		'unpublish', 
		'pending', 
		'rejected',
	);

	const CONTENT_META_KEYS = array(
		// Common meta for all types
		'content_tags',

		// Fields for classified content post
		'content_country_code',
		'content_state_code',
		'content_classified_price',
		'content_local_address',
		'telegram_number',
		'whatsapp_number',
		'skype_number',
		'sms_number',
		'call_number',
		'facetime_number',
		'contact_email'
	);

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
		$content['contributor_id']      = $content_data['contributor_id'] ?? get_current_user_id();
		$content['modified_at']         = $gmdate;

		if ( ! empty( $content_data['content_status'] ) ) {
			$content['content_status'] = $content_data['content_status'];
		}

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

			// Set content slug
			if ( ! empty( $wpdb->insert_id ) && is_numeric( $wpdb->insert_id ) ) {
				// Generate content slug
				self::setContentSlug( $content['content_id'], $content['content_title'] );
			}
		} else {

			// Delete removed files from description
			$existing_content = Contents::getContentByContentID( $content['content_id'], 'content_description' );
			FileManager::deleteRemovedFilesFromContent( $existing_content, $content['content_description'], $content['content_id'] );

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
				$new_file_id = FileManager::uploadFile( $file, $content['content_id'] );
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

		// Update content meta data
		foreach ( self::CONTENT_META_KEYS as $key ) {
			
			$meta_value = $content_data[ $key ] ?? null;

			if ( empty( $meta_value ) ) {
				$meta->deleteMeta( $key );
			} else {
				$meta->updateMeta( $key, $content_data[ $key ] ?? null );
			}
		}

		// -------------- Create or update the main downloadable file (if not app and tutorial. App has dedicated release management system and tutorial doesn't need downloadable file) --------------
		if ( ! in_array( $content['content_type'], array( 'app', 'tutorial' ) ) ) {
			
			// Save downloadable file through release to maintain consistency with app type content and other dependencies.
			Release::pushRelease(
				array(
					'version'      => $content_data['version'] ?? null,
					'changelog'    => strip_tags( ( string ) ( $content_data['changelog'] ?? '' ) ),
					'content_id'   => $content_id,
					'release_id'   => (int) ( $content_data['release_id'] ?? 0 ),
					'file'         => $files['downloadable_file'] ?? null,
					'release_date' => gmdate('Y-m-d H:i:s')
				)
			);
		}
		

		$hook = $is_update ? 'solidie_content_updated' : 'solidie_content_created';
		do_action( $hook, $content_id, $content, $content_data );

		return $content_id;
	}

	/**
	 * Set content slug
	 *
	 * @param int        $content_id The content ID to set slug for
	 * @param string|int $content_slug The slug to set for the job
	 *
	 * @return string
	 */
	public static function setContentSlug( $content_id, $content_slug, $update_row = true ) {
		$content_slug = _String::consolidate( (string) $content_slug, true );
		$content_slug = strtolower( str_replace( ' ', '-', $content_slug ) );
		$content_slug = preg_replace( '/[^A-Za-z0-9\-]/u', '', $content_slug );
		$content_slug = empty( $content_slug ) ? 'untitled-content' : $content_slug;
		$content_slug = preg_replace( '/-+/', '-', $content_slug );

		$new_slug = $content_slug;
		$index    = 0;

		// Get the slug until it's not avaialble in database
		while ( $content_id != self::getContentIdBySlug( $new_slug, $content_id ) ) {
			$index++;
			$new_slug = $content_slug . '-' . $index;
		}

		if ( $update_row ) {
			Field::contents()->updateField(
				array( 'content_slug' => $new_slug ),
				array( 'content_id' => $content_id )
			);
		}

		return $new_slug;
	}

	/**
	 * Get connected product ID to a content. 
	 * In some cases we can't rely on the 'product_id' field from contents table since it will be set null to mark a content as free.
	 * So if the user wants to make a content back to paid, we need to resurrect the content ID from product itself. 
	 * And put the product ID in contents table again to mark it as paid. 
	 *
	 * @param int $content_id
	 * @return int|null
	 */
	public static function resurrectProductID( $content_id ) {
		$product_id = self::getPostIDByMeta( self::PRODUCT_META_KEY_FOR_CONTENT, $content_id, 'product' );
		return empty( $product_id ) ? null : $product_id;
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
		$status_clause   = $public_only ? $wpdb->prepare( " AND (content.content_status='publish' OR content.contributor_id=%d)", $current_user_id ) : '';

		// Content author, Admin and Editor can visit content regardless of content status.
		if ( User::validateRole( $current_user_id, array( 'administrator', 'editor' ) ) ) {
			$status_clause = '';
		}

		$content = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT 
					content.*, 
					UNIX_TIMESTAMP(content.created_at) AS created_at,
					UNIX_TIMESTAMP(content.modified_at) AS modified_at
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
		$content = self::assignContentMeta( _Array::castRecursive( $content ) );

		return $field ? ( $content[ $field ] ?? null ) : $content;
	}

	/**
	 * Get download counts
	 *
	 * @param array $content_ids Array of contents IDs
	 * @return array
	 */
	public static function getDownloadCounts( $content_ids ) {

		if ( empty( $content_ids ) ) {
			return array();
		}

		$content_ids = array_values( $content_ids );
		$ids_places  = _String::getSQLImplodesPrepared( $content_ids );

		global $wpdb;
		$downloads = $wpdb->get_results(
			"SELECT 
				SUM(download_count) AS download_count, 
				content_id 
			FROM 
				{$wpdb->solidie_releases} 
			WHERE 
				content_id IN ({$ids_places}) 
			GROUP BY content_id",
			ARRAY_A
		);

		$downloads = _Array::castRecursive( $downloads );
		$downloads = _Array::indexify( $downloads, 'content_id', 'download_count' );

		return $downloads;
	}

	/**
	 * Assign content media data like preview, thumbnail, sample images
	 *
	 * @param array $contents The content array to add media data to
	 * @return array
	 */
	private static function assignContentMedia( array $contents ) {

		if ( empty( $contents ) ) {
			return $contents;
		}

		$placeholder_url       = Main::$configs->dist_url . 'libraries/thumbnail-placeholder.svg';
		$placeholder_url_audio = Main::$configs->dist_url . 'libraries/thumbnail-placeholder-audio.jpeg';
		
		$was_single = ! _Array::isTwoDimensionalArray( $contents );
		if ( $was_single ) {
			$contents = array( $contents );
		}

		// Get download counts per content
		$downloads = self::getDownloadCounts( array_column( $contents, 'content_id' ) );

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

			// Assign fallback thumbnail URL
			if ( empty( $contents[ $index ]['media']['thumbnail'] ) ) {
				$contents[ $index ]['media']['thumbnail'] = array(
					'file_id'   => 0,
					'file_url'  => 'audio' === $content['content_type'] ? $placeholder_url_audio : $placeholder_url,
					'file_name' => basename( $placeholder_url ),
					'mime_type' => 'image/svg+xml'
				);
			}

			// Assign download count from the download array
			$contents[ $index ]['download_count'] = $downloads[ $content['content_id'] ] ?? 0;
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

		if ( ! is_array( $content ) || empty( $content['content_type'] ) || empty( $content['content_slug'] ) || ! self::isContentTypeEnabled( $content['content_type'] ) ) {
			return null;
		}

		return self::getGalleryPermalink( $content['content_type'] ) . $content['content_slug'] . '/';
	}

	/**
	 * Get gallery url for content type
	 *
	 * @param string $content_type The content type to get gallery permalink for
	 * @return array|string
	 */
	public static function getGalleryPermalink( $content_type = null ) {

		static $_permalink = null;

		if ( null === $_permalink ) {
			$page_id = AdminSetting::getGalleryPageId();
			$_permalink = ! empty( $page_id ) ? trailingslashit( get_permalink( $page_id ) ) : '';
		}

		if ( $content_type === false ) {
			return $_permalink;
		}

		$contents   = AdminSetting::getContentSettings();
		$permalinks = array();

		foreach ( $contents as $type => $content ) {
			if ( $content['enable'] ?? false ) {
				$permalinks[ $type ] = $_permalink . $content['slug'] . '/';
			}
		}

		return $content_type ? ( $permalinks[ $content_type ] ?? null ) : $permalinks;
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
		$page         = Utilities::getPage( $args['page'] ?? null );
		$limit        = Utilities::getLimit( $args['limit'] ?? null );
		$offset       = absint( $page - 1 ) * $limit;

		$where_clause = '';

		// Search filter
		if ( ! empty( $keyword ) ) {
			
			$id_search = is_numeric( $keyword ) ? $wpdb->prepare( ' OR content.content_id=%d', $keyword ) : '';

			$where_clause .= $wpdb->prepare(
				" AND (content.content_title LIKE %s OR content.content_description LIKE %s {$id_search})",
				"%{$wpdb->esc_like( $keyword )}%",
				"%{$wpdb->esc_like( $keyword )}%"
			);
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
			$category_ids_in = array_values( array_unique( array_merge( $all_ids, $category_ids ) ) );
			$ids_places      = _String::getSQLImplodesPrepared( $category_ids_in );

			$where_clause .= " AND content.category_id IN ({$ids_places})";
		}

		// Specific contributor filter
		if ( ! empty( $args['contributor_id'] ) ) {
			$where_clause .= $wpdb->prepare( ' AND content.contributor_id=%d', $args['contributor_id'] );
		}

		// Filter content status
		if ( ! empty( $args['content_status'] ) ) {
			$where_clause .= $wpdb->prepare( ' AND content.content_status=%s', $args['content_status'] );
		}

		// Filter content type
		if ( ! empty( $content_type ) ) {
			$where_clause .= $wpdb->prepare( ' AND content.content_type=%s', $content_type );
		}

		// Filter content IDs
		if ( ! empty( $args['content_id'] ) ) {
			$_content_ids = array_filter( _Array::getArray( $args['content_id'], true ), 'is_numeric' );
			if ( ! empty( $_content_ids ) ) {
				$where_clause .= ' AND content.content_id IN (' . implode( ',', $_content_ids ) . ')';
			}
		}

		// Filter for classified country and state
		if ( ! empty( $args['country_code'] ) ) {
			
			$where_clause .= $wpdb->prepare( ' AND _country.meta_value=%s', $args['country_code'] );

			if ( ! empty( $args['state_code'] ) ) {
				$where_clause .= $wpdb->prepare( ' AND _state.meta_value=%s', $args['state_code'] );
			}
		}

		// Filter where clause. So far it is used to add bundle product from pro version.
		$where_clause = apply_filters( 'solidie_get_contents_where_clause', $where_clause, $args );

		$from_tables =
			"{$wpdb->solidie_contents} content 
			LEFT JOIN {$wpdb->solidie_categories} cat ON content.category_id=cat.category_id
			LEFT JOIN {$wpdb->solidie_popularity} pop ON content.content_id=pop.content_id
			LEFT JOIN {$wpdb->users} contributor ON content.contributor_id=contributor.ID
			LEFT JOIN {$wpdb->solidie_content_pack_link} pack ON content.content_id=pack.content_id
			LEFT JOIN {$wpdb->solidie_content_meta} _country ON content.content_id=_country.object_id AND _country.meta_key='content_country_code'
			LEFT JOIN {$wpdb->solidie_content_meta} _state ON content.content_id=_state.object_id AND _state.meta_key='content_state_code'";

		// If it is segmentation
		if ( $segmentation ) {

			$total_count = (int) $wpdb->get_var(
				"SELECT 
					COUNT(DISTINCT content.content_id)
				FROM 
					{$from_tables}
				WHERE 1=1 {$where_clause}"
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
		$order_by     = 'newest' === $order_by ? 'content.created_at' : 'download_trend, download_date';
		$order_clause = " GROUP BY content.content_id ORDER BY {$order_by} DESC";
		$limit_offset = $wpdb->prepare( ' LIMIT %d OFFSET %d', $limit, $offset );

		// If not segmentation, return data
		$contents = $wpdb->get_results(
			"SELECT
				content.content_title, 
				content.product_id, 
				content.content_id, 
				content.content_type, 
				content.content_status, 
				content.content_slug,
				content.contributor_id,
				COUNT(pop.download_id) AS download_trend,
				UNIX_TIMESTAMP(pop.download_date) AS download_date,
				UNIX_TIMESTAMP(content.created_at) AS created_at,
				UNIX_TIMESTAMP(content.modified_at) AS modified_at,
				cat.category_name
			FROM 
				{$from_tables}
			WHERE 1=1 {$where_clause} {$order_clause} {$limit_offset}",
			ARRAY_A
		);

		return self::assignContentMeta( _Array::castRecursive( $contents ) );
	}

	/**
	 * Assign content meta like permalink, latest release, contributor etc.
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
			$contents[ $index ]['content_permalink'] = self::getPermalink( $content );

			// Assign tutorial URL or Download URL
			if ( 'tutorial' === $content['content_type'] ) {
				
				$contents[ $index ]['tutorial_url'] = $contents[ $index ]['content_permalink'] . '0/';
				$contents[ $index ]['lesson_count'] = Tutorial::getLessonCount( $content['content_id'] );

			} else {
				$contents[ $index ]['release'] = Release::getRelease( (int) $content['content_id'] );
			}

			// Contributor avatar URL
			$contents[ $index ]['contributor'] = ! empty( $content['contributor_id'] ) ? User::getUserData( $content['contributor_id'] ) : null;
			
			// Add reaction data
			$contents[ $index ]['reactions'] = Reaction::getStats( $content['content_id'], get_current_user_id() );
		
			// Add location meta (For classifieds actually)
			$meta                         = self::getAllMetaData( $content['content_id'] );
			$country_code                 = $meta['content_country_code'] ?? null;
			$state_code                   = $meta['content_state_code'] ?? null;
			$meta['content_country_name'] = Geo::getCountryName( $country_code );
			$meta['content_state_name']   = Geo::getStateName( $country_code, $state_code );
			$meta['currency_code']        = Geo::getCurrencyCode( $country_code );
			$contents[ $index ]['meta']   = $meta;
		}

		$contents = apply_filters( 'solidie_contents_meta', self::assignContentMedia( $contents ) );

		return $was_single ? $contents[0] : $contents;
	}

	/**
	 * Delete content by content ID
	 *
	 * @param int $content_id The content ID to delete
	 * @return void
	 */
	public static function deleteContent( $content_id ) {

		global $wpdb;

		// Get the content which is gonna be deleted
		$content = $wpdb->get_row(
			$wpdb->prepare(
				"SELECT * FROM {$wpdb->solidie_contents} WHERE content_id=%d",
				$content_id
			),
			ARRAY_A
		);
		$content = is_array( $content ) ? _Array::castRecursive( $content ) : array();

		do_action( 'solidie_content_delete', $content_id, $content );

		// Meta object
		$meta = Meta::content( $content_id );

		// Delete preview file
		$media_ids = $meta->getMeta( self::MEDIA_IDS_KEY );
		$media_ids = array_values( _Array::getArray( $media_ids ) );
		$media_ids = _Array::flattenArray( $media_ids );
		FileManager::deleteFile( $media_ids );

		// Delete files embedded in content description
		FileManager::deleteFilesFromContent( $content['content_description'] ?? '' );

		// Delete all the meta
		$meta->deleteBulkMeta( $content_id );

		// Delete releases
		Release::deleteReleaseByContentId( $content_id );

		// Delete Reactions
		Reaction::deleteByContentId( $content_id );

		// Delete comments
		Comment::deleteCommentByContentId( $content_id );

		// Delete popularity trend
		Popularity::deleteByContentId( $content_id );

		// Delete lessons
		Tutorial::deleteLessonsByContentId( $content_id );

		// Delete the directory created for this content
		FileManager::deleteDirectory( FileManager::getContentDir( $content_id ) );

		// Delete the content itself at the end
		Field::contents()->deleteField( array( 'content_id' => $content_id ) );
	}

	/**
	 * Delete content by user id
	 *
	 * @param int $user_id
	 * @return void
	 */
	public static function deleteContentsByContributor( $user_id ) {

		global $wpdb;

		$content_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT 
					content_id 
				FROM 
					{$wpdb->solidie_contents} 
				WHERE 
					contributor_id=%d",
				$user_id
			)
		);
		
		if ( ! empty( $content_ids ) ) {
			foreach ( $content_ids as $id ) {
				self::deleteContent( $id );
			}
		}
	}

	/**
	 * Get content ID by slug
	 *
	 * @param string $slug The content slug to get content by
	 * @param mixed  $fallback The fallback if content ID not found
	 *
	 * @return int|null
	 */
	public static function getContentIdBySlug( string $slug, $fallback = null ) {
		return Field::contents()->getField( array( 'content_slug' => $slug ), 'content_id', $fallback );
	}

	/**
	 * Get post ID by meta key-value and post type
	 *
	 * @param string $key The meta key
	 * @param mixed  $value The value to get post by
	 * @param mixed  $post_type The post type to get by.
	 *
	 * @return int
	 */
	public static function getPostIDByMeta( $key, $value, $post_type ) {

		global $wpdb;
		$post_id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT 
					_post.ID 
				FROM 
					{$wpdb->posts} _post
					INNER JOIN {$wpdb->postmeta} _meta ON _meta.post_id=_post.ID AND _meta.meta_key=%s
				WHERE 
					_meta.meta_value=%s
					AND _post.post_type=%s
				LIMIT 1",
				$key,
				$value,
				$post_type
			)
		);

		return ( int ) $post_id;
	}

	/**
	 * Check if a user can edit/delete a content
	 *
	 * @param int $content_id
	 * @param int $user_id
	 * @return boolean
	 */
	public static function isUserCapableToManage( $content_id, $user_id ) {
		$contributor_id = Field::contents()->getField( array( 'content_id' => $content_id ), 'contributor_id' );
		return ! empty( $contributor_id ) && ( $contributor_id == $user_id || User::validateRole( $user_id, User::getSolidieAdminRole() ) );
	}

	/**
	 * Get meta data defined in the array
	 *
	 * @param int $content_id
	 * @return array
	 */
	public static function getAllMetaData( $content_id ) {

		$meta_array = array();
		$meta = Meta::content( $content_id );

		foreach ( self::CONTENT_META_KEYS as $key ) {
			$meta_array[ $key ] = $meta->getMeta( $key );
		}

		return $meta_array;
	}

	/**
	 * Change content status
	 *
	 * @param int $content_id
	 * @param string $status
	 * @return void
	 */
	public static function changeContentStatus( $content_id, $status ) {
		Field::contents()->updateField(
			array( 'content_status' => $status ),
			array( 'content_id' => $content_id )
		);
	}


	/**
	 * Get contents by category ID, it will expand query to parent categories until 0 if limit not filled.
	 *
	 * @param array|int $category_id
	 * @param int $limit
	 * @param array $exclude
	 * @param string $content_type
	 * @return array
	 */
	private static function getContentIDsByCategory( $category_id, $limit, $exclude, $content_type ) {

		$cats    = Category::getDescendentsOfParent( $category_id, $content_type );
		$cat_ids = array_column( $cats, 'category_id' );

		if ( empty( $cat_ids ) ) {
			return array();
		}
		
		global $wpdb;

		$where_clause = '';

		// Include contents in the cat IDs
		$where_clause .= ' AND category_id IN (' . implode( ',', $cat_ids ) . ')';

		// Exclude already collected contents
		if ( ! empty( $exclude ) ) {
			$where_clause .= ' AND content_id NOT IN (' . implode( ',', $exclude ) . ')';
		}

		$content_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT 
					content_id 
				FROM 
					{$wpdb->solidie_contents} 
				WHERE 
					content_status='publish'
					AND content_type=%s
					{$where_clause}
				ORDER BY 
					created_at DESC
				LIMIT %d",
				$content_type,
				$limit
			)
		);

		$remaining = $limit - count( $content_ids );

		if ( $category_id !== 0 && $remaining ) {
			$parent      = Category::getParent( min( $cat_ids ) );
			$parent_id   = is_array( $parent ) ? ( $parent['category_id'] ?? 0 ) : 0;
			$more_ids    = self::getContentIDsByCategory( $parent_id, $remaining, array_merge( $exclude, $content_ids ), $content_type );
			$content_ids = array_merge( $content_ids, $more_ids );
		}

		return $content_ids;
	}

	/**
	 * Get similar contents by category, if category filter doesnt fille requirements, then get from same content type.
	 *
	 * @param int $content_id
	 * @param string $content_type
	 * @return array
	 */
	public static function getSimilarContents( $content_id, $content_type ) {

		$content_limit = Utilities::getLimit();
		
		global $wpdb;

		// Get the category ID of the content
		$category_id = ( int ) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT category_id FROM {$wpdb->solidie_contents} WHERE content_id=%d",
				$content_id
			)
		);

		// Get similar contents by the category ID
		$content_ids = self::getContentIDsByCategory( $category_id, $content_limit, array( $content_id ), $content_type );
		$remaining   = max( 0, ( $content_limit - count( $content_ids ) ) );

		// If not content found by category, then get using content type
		if ( $remaining ) {

			$where_clause = '';
			if ( ! empty( $content_ids ) ) {
				$where_clause .= ' AND content_id NOT IN (' . implode( ',', $content_ids ) . ')';
			}

			$more_content_ids = $wpdb->get_col(
				$wpdb->prepare(
					"SELECT 
						content_id 
					FROM 
						{$wpdb->solidie_contents} 
					WHERE 
						content_status='publish'
						AND content_type=%s 
						AND content_id != %d
						{$where_clause}
					ORDER BY
						created_at DESC
					LIMIT %d",
					$content_type,
					$content_id,
					$remaining
				)
			);

			$content_ids = array_unique( array_map( 'intval', array_merge( $content_ids, $more_content_ids ) ) );
		}

		return ! empty( $content_ids ) ? self::getContents( array( 'content_id' => $content_ids ) ) : array();
	}
}
