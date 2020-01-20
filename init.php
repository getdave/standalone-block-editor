<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package GSBE
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




function getdave_sbe_block_editor_init( $hook ) {

	if ( 'toplevel_page_getdavesbe' !== $hook ) {
		return;
	}

	$script_handle = 'getdave-sbe-scripts';

}

add_action( 'admin_enqueue_scripts', 'getdave_sbe_block_editor_init' );



/**
 * Registers the new WP Admin Menu
 *
 * @return void
 */
function getdave_sbe_add_menu_page() {
	global $submenu;

	// add_menu_page(
	// 'Standalone Block Editor',
	// 'Block Editor',
	// 'edit_posts',
	// 'getdavesbe', // hook/slug of page
	// 'getdave_sbe_render_block_editor', // function to render page
	// 'dashicons-welcome-widgets-menus'
	// );
}
add_action( 'admin_menu', 'getdave_sbe_add_menu_page' );


/**
 * Renders the Menu Page
 *
 * @return void
 */
function getdave_sbe_render_block_editor() {
	?>

	<?php
}

