<?php

namespace Solidie\Models;

use Solidie\Helpers\_Array;
use Solidie\Helpers\File;

class Contents {
	/**
	 * Meta key to store preview file URL to product
	 */
	const PREVIEW_META_KEY = 'solidie-content-preview-id';

	/**
	 * The meta key for thumbnail
	 */
	const THUMBNAIL_KEY = 'content-thumbnail-image-id';

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

		// Determine content ID
		$content['content_id']          = ! empty( $content_data['content_id'] ) ? $content_data['content_id'] : 0;
		$content['product_id']          = ! empty( $content_data['product_id'] ) ? $content['product_id'] : null;
		$content['content_title']       = ! empty( $content_data['content_title'] ) ? $content_data['content_title'] : 'Untitled Content';
		$content['content_description'] = ! empty( $content_data['content_description'] ) ? $content_data['content_description'] : null;
		$content['product_id']          = ! empty( $content_data['product_id'] ) ? $content_data['product_id'] : null;
		$content['content_type']        = $content_data['content_type'];
		$content['category_id']         = $content_data['category_id'] ?? null;
		$content['content_status']      = $content_data['content_status'] ?? 'review';
		$content['contributor_id']      = $content_data['contributor_id'] ?? get_current_user_id();
		$content['modified_at']         = $gmdate;

		global $wpdb;

		if ( empty( $content['content_id'] ) ) {
			$content['created_at'] = $gmdate;
			$wpdb->insert(
				DB::contents(),
				$content
			);
			$content['content_id'] = $wpdb->insert_id;
		} else {
			$wpdb->update(
				DB::contents(),
				$content,
				array(
					'content_id' => $content['content_id']
				)
			);
		}

		$content_id = $content['content_id'];
		if ( empty( $content_id ) ) {
			return false;
		}

		// Meta manager instance
		$meta = Meta::content( $content_id );
		
		// Save thumbnail
		if ( ! empty( $files['thumbnail'] ) ) {
			$file_id = FileManager::uploadFile( $content['content_id'], $files['thumbnail'], $content['content_title'] . ' - Thumbnail' );
			if ( ! empty( $file_id ) ) {
				// Delete existing thumbnail first
				$thumbnail_id = $meta->getMeta( self::THUMBNAIL_KEY );
				if ( ! empty( $thumbnail_id ) ) {
					File::deleteFile( $thumbnail_id, true );
				}

				// Set the new one
				$meta->updateMeta( self::THUMBNAIL_KEY, $file_id );
			}
		}

		// Set preview file
		if ( ! empty( $files['preview_file'] ) ) {
			$file_id = FileManager::uploadFile( $content['content_id'], $files['preview_file'], $content['content_title'] . ' - Preview' );
			if ( ! empty( $file_id ) ) {
				// Delete existing preview first
				$preview_id = $meta->getMeta( self::PREVIEW_META_KEY );
				if ( ! empty( $preview_id ) ) {
					File::deleteFile( $preview_id, true );
				}

				// Set the new one
				$meta->updateMeta( self::PREVIEW_META_KEY, $preview_id );
			}
		}

		// Save downloadable file
		if ( ! empty( $files['downloadable_file'] ) ) {
			Release::pushRelease(
				array(
					'version'    => $content_data['version'] ?? null,
					'changelog'  => $content_data['changelog'] ?? null,
					'content_id' => $content_id,
					'release_id' => ( int ) ($content_data['release_id'] ?? 0),
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
	 * @return object|null
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
	 * @return object|null
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
			)
		);

		if ( empty( $content ) || ! is_object( $content ) ) {
			return null;
		}

		// Apply content meta
		$content = self::assignContentMeta( $content );

		return $field ? ( $content->$field ?? null ) : $content;
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
		return ! empty( $content ) ? self::isContentTypeEnabled( $content->content_type ) : false;
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
	 * @param int $product_id
	 * @param mixed $content_or_type
	 * 
	 * @return string
	 */
	public static function getPermalink( $product_id, $content_type = null ) {
		$content_type = $content_type ? $content_type : self::getContentByProduct( $product_id )->content_type;
		$post_name    = get_post_field( 'post_name', $product_id );
		$base_slug    = AdminSetting::get( 'contents.' . $content_type . '.slug' );
		return get_home_url() . '/' . trim( $base_slug, '/' ) . '/' . $post_name . '/';
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
	 * @return array
	 */
	public static function getContents( array $args ) {
		// Prepare arguments
		$content_type = $args['content_type'] ?? null;
		$customer_id  = $args['customer_id'] ?? null;
		$page         = absint( $args['page'] ?? 1 );
		$limit        = absint( $args['limit'] ?? 15 );

		// To Do: Validate paramaters for the user as per context. 

		$type_clause   = $content_type ? " AND content.content_type='" . esc_sql( $content_type ) . "'" : '';
		$customer_clse = $customer_id ? " AND sale.customer_id=" . $customer_id : '';
		$limit_clause  = " LIMIT " . $limit;
		$offset_clause = " OFFSET " . ( absint( $page - 1 ) * $limit );
		
		global $wpdb;
		$contents = $wpdb->get_results(
			"SELECT DISTINCT 
				content.content_title, 
				content.product_id, 
				content.content_id, 
				content.content_type, 
				content.content_status, 
				sale.sale_id
			FROM " . DB::contents() . " product 
				LEFT JOIN " . DB::sales() . " sale ON content.content_id=sale.content_id
			WHERE 1=1 {$type_clause} {$customer_clse} {$limit_clause} {$offset_clause}",
		);

		return self::assignContentMeta( $contents );
	}

	/**
	 * Undocumented function
	 *
	 * @param array|object $content
	 * @param array $meta_array
	 * @return array|object
	 */
	public static function assignContentMeta( $contents ) {
		// Support both list and single content
		if ( $was_single = ! is_array( $contents ) ) {
			$contents = array( $contents );
		}

		foreach ( $contents as $index => $content ) {
			// Content permalink
			$contents[ $index ]->content_url = self::getPermalink( $content->product_id, $content->content_type );

			// Content thumbnail URL
			$contents[ $index ]->thumbnail_url = get_the_post_thumbnail_url( $content->product_id );

			// Releases if it is app
			if ( $content->content_type === 'app' ) {
				$contents[ $index ]->releases = Release::getReleases( (int)$content->content_id );
			}
		}

		$contents = apply_filters( 'solidie_contents_meta', $contents );

		return $was_single ? $contents[0] : $contents;
	}
}
