<?php

namespace AppStore\Models;

class Apps{
	/**
	 * Get app list that is accessible by a user. 
	 *
	 * @param int $user_id
	 * @return array
	 */
	public function getAppListForUser( $user_id ) {
		return array();
	}
}