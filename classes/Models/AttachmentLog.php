<?php
/**
 * File attachment logger
 *
 * @package solidie
 */

namespace Solidie\Models;

use SolidieLib\_Array;
use Solidie\Main;

/**
 * File and directory handler class
 */
class AttachmentLog {

	private $content_id;
	private $lesson_id;
	private $option_key;

	public function __construct( $content_id, $lesosn_id = 0 ) {
		$this->content_id = $content_id;
		$this->lesson_id  = $lesosn_id;
		$this->option_key = 'solidie-media-attachment-log-' . $this->content_id . '-' . $this->lesson_id ;
	}

	/**
	 * Keep the attached media ID to option, 
	 * so if a content or lesson is not updated after adding a media, 
	 * we can delete the orphan media using this log to keep storage optimized.
	 *
	 * @param int $attachment_id
	 * 
	 * @return void
	 */
	public function logMediaAttachment( $attachment_id ) {
		
		$attachment_id = ( int ) $attachment_id;
		$existing      = $this->getMediaAttachmentLog();

		if ( ! in_array( $attachment_id, $existing ) ) {
			$existing[] = $attachment_id;
		}

		update_option( $this->option_key, $existing );
	}

	/**
	 * Get the attachment IDs that was saved right after adding media, no matter the content/lesson was saved or not.
	 *
	 * @param bool $delete_option Whether to delete the log option after retrieving IDs
	 *
	 * @return array
	 */
	public function getMediaAttachmentLog( $delete_option = false ) {

		$ids = _Array::getArray( get_option( $this->option_key ) );
		
		if ( $delete_option === true ) {
			delete_option( $this->option_key );
		}
		
		return $ids;
	}
}
