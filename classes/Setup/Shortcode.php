<?php

namespace Solidie\Store\Setup;

class Shortcode {
	function __construct() {
		// For only development purpose
		add_shortcode( 'solidie_fa_icon_list', function(){
			return '<div id="solidie_fa_icon_list"></div>';
		} );
	}
}