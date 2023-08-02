<?php

namespace Solidie\Store\Helpers;

class Cast {
	public static function _array( $value, $default = array() ) {
		return is_array( $value ) ? $value : $default;
	}
}