<?php

namespace AppStore\Models;

class Page {
	public static function getPageList() {
		$pages = get_pages();
		if ( ! is_array( $pages ) ) {
			$pages = array();
		}

		$page_array = array();
		foreach ( $pages as $page ) {
			$page_array[ $page->ID ] = $page->post_title;
		}

		return $page_array;
	}
}