<?php 

namespace Solidie\Store\Models;

class User{
	public static function getUserRoles( $user_id = null ) {
		$user = new \WP_User( null === $user_id ? get_current_user_id() : $user_id );
		return $user->roles ?? array();
	}

	public static function hasUserRole( $roles, $user_id = null ) {
		$roles = is_array( $roles ) ? $roles : array( $roles );
		return count( array_intersect( $roles, self::getUserRoles( $user_id ) ) ) > 0;
	}
}