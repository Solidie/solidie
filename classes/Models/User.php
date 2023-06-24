<?php 

namespace Solidie\Store\Models;

class User{
	public static function hasUserRole( $roles, $user_id = null ) {
		$roles = is_array( $roles ) ? $roles : array( $roles );
		$user  = new \WP_User( null === $user_id ? get_current_user_id() : $user_id);
		return count( array_intersect( $roles, $user->roles ?? array() ) ) > 0;
	}
}