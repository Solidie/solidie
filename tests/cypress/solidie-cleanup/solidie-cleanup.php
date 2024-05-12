<?php

use Solidie\Models\AdminSetting;
use Solidie\Models\FileManager;
use Solidie\Setup\Database;
use Solidie_Pro\Models\ContentPack;
use Solidie_Pro\Models\Contributor;
use Solidie_Pro\Models\Withdrawal;
use Solidie_Pro\Setup\Updater;

/**
 * Plugin Name: Solidie Cleanup
 * Description: Kind of factory reset plugin for Solidie
 */

function deleteAllWooCommerceData() {

    global $wpdb;

    // Delete WooCommerce products
    $wpdb->query("DELETE FROM {$wpdb->prefix}posts WHERE post_type = 'product'");
    $wpdb->query("DELETE FROM {$wpdb->prefix}postmeta WHERE post_id IN (SELECT ID FROM {$wpdb->prefix}posts WHERE post_type = 'product')");

    // Delete WooCommerce orders
    $wpdb->query("DELETE FROM {$wpdb->prefix}posts WHERE post_type = 'shop_order'");
    $wpdb->query("DELETE FROM {$wpdb->prefix}postmeta WHERE post_id IN (SELECT ID FROM {$wpdb->prefix}posts WHERE post_type = 'shop_order')");
    $wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_order_items WHERE order_id IN (SELECT ID FROM {$wpdb->prefix}posts WHERE post_type = 'shop_order')");
    $wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_order_itemmeta WHERE order_item_id IN (SELECT order_item_id FROM {$wpdb->prefix}woocommerce_order_items)");

    // Delete WooCommerce other related data (you may add more if needed)
    $wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_sessions");
    $wpdb->query("DELETE FROM {$wpdb->prefix}woocommerce_api_keys");

    // Clear WooCommerce transients
    global $wpdb;
    $wpdb->query("DELETE FROM {$wpdb->prefix}options WHERE option_name LIKE '_transient_wc_%'");
    $wpdb->query("DELETE FROM {$wpdb->prefix}options WHERE option_name LIKE '_transient_timeout_wc_%'");
}

function deleteSolidieDirectory($dir) {
    if (!file_exists($dir)) {
        return true; // Directory doesn't exist, nothing to delete
    }
    
    // Get all files and directories within the directory
    $files = glob($dir . '/*');
    
    foreach ($files as $file) {
        if (is_dir($file)) {
            // Recursive call for subdirectories
            deleteSolidieDirectory($file);
        } else {
            // Delete file
            unlink($file);
        }
    }
    
    // Delete the directory itself
    return rmdir($dir);
}

function deleteAllWPploadedMediaFiles() {
    // Retrieve all attachments
    $attachments = get_posts(array(
        'post_type'      => 'attachment',
        'posts_per_page' => -1,
        'fields'         => 'ids', // Retrieve only post IDs
    ));

    // Loop through each attachment and delete it
    foreach ($attachments as $attachment_id) {
        wp_delete_attachment($attachment_id, true); // Force delete to also delete file
    }
}

function deleteGalleryPage() {
	global $wpdb;
	$gallery_ids = $wpdb->get_col(
		"SELECT ID FROM {$wpdb->posts} WHERE post_name LIKE 'gallery%'"
	);

	if ( ! empty( $gallery_ids ) ) {
		foreach ( $gallery_ids as $id ) {
			wp_delete_post( $id, true );
		}
	}
}

add_action(
	'admin_init', 
	function() {
		
		if ( ( $_GET['cleanup-solidie'] ?? null ) === 'yes' ) {
			
			global $wpdb;

			deleteAllWPploadedMediaFiles();

			// Clear all the solidie tables
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_categories}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_contents}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_content_meta}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_license_keys}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_popularity}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_releases}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_sales}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_tokens}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_comments}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_reactions}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_lessons}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_content_pack_link}" );
			$wpdb->query( "DROP TABLE IF EXISTS {$wpdb->solidie_withdrawals}" );

			// Delete gallery page to create new one
			deleteGalleryPage();

			// Delete all the woocommerce product and related data
			deleteAllWooCommerceData();

			// Delete solidie options
			delete_option( AdminSetting::OPTION_NAME );
			delete_option( Updater::LICENSE_OPTION_KEY );
			delete_option( Database::DB_VERSION_KEY );

			// Delete user meta
			foreach ( get_users() as $user ) {
				delete_user_meta( $user->ID, Withdrawal::METHOD_META_KEY );
				delete_user_meta( $user->ID, Contributor::FLAG_META_KEY );
				delete_user_meta( $user->ID, ContentPack::DOWNLOADS_META_KEY );
			}

			// Delete solidie content files directory
			deleteSolidieDirectory( wp_upload_dir()['basedir'] . '/' . FileManager::SOLIDIE_CONTENTS_DIR );

			wp_safe_redirect( admin_url() );
			exit;
		}
	},
	0
);
