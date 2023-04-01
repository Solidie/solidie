<?php

namespace AppStore;

use AppStore\Setup\Dispatcher;
use AppStore\Setup\Scripts;
use AppStore\Setup\AdminPage;

class Init {
	/**
	 * Initialize Plugin
	 *
	 * @return void
	 */
	public function setup() {
		// Loader
		spl_autoload_register( array( $this, 'loader' ) );

		// Modules
		( new Dispatcher() )->setup();
		( new Scripts() )->setup();
		( new AdminPage() )->setup();
	}

	/**
	 * Class auto loader
	 *
	 * @param string $className
	 * 
	 * @return void
	 */
	public function loader( $className ) {
		if ( class_exists( $className ) ) {
			return;
		}

		$className = preg_replace(
			array( '/([a-z])([A-Z])/', '/\\\/' ),
			array( '$1$2', DIRECTORY_SEPARATOR ),
			$className
		);

		$className = str_replace( 'AppStore' . DIRECTORY_SEPARATOR, 'classes' . DIRECTORY_SEPARATOR, $className );
		$file_name = APPSTORE_DIR . $className . '.php';

		if ( file_exists( $file_name ) && is_readable( $file_name ) ) {
			require_once $file_name;
		}
	}
}