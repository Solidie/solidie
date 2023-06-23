<?php

namespace Solidie\Store\Setup;

use Solidie\Store\Main;
use Solidie\Store\Models\FrontendDashboard as FrontendDashboardModel;
use Solidie\Store\Models\Store;

class FrontendDashboard extends Main {
	public function __construct() {
		add_filter( 'solidie_frontend_dashboard_data', array( $this, 'solidie_frontend_dashboard_data' ) );
	}

	/**
	 * Provide data to render frontend dashboard based on
	 *
	 * @param array $data
	 * @return array
	 */
	public function solidie_frontend_dashboard_data( array $data ) {
		if ( ! is_array( $data ) ) {
			$data = array();
		}
		
		$data['stores']        = Store::getStoresForKeeper( get_current_user_id() );
		$data['dashbaord_url'] = FrontendDashboardModel::getUrl();
		$data['avatar_url']    = get_avatar_url( get_current_user_id(), array( 'size'=> 120 ) );

		return $data;
	}
}