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


	// Enqueue scripts with @wordpress package deps extracted via `@wordpress/wp-scripts
	// See:
	// - https://developer.wordpress.org/block-editor/packages/packages-scripts/#webpack-config
	// - https://developer.wordpress.org/block-editor/packages/packages-dependency-extraction-webpack-plugin/
	$script_path       = 'build/index.js';
	$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require $script_asset_path
		: array(
			'dependencies' => array(),
			'version'      => filemtime( $script_path ),
		);
	$script_url        = plugins_url( $script_path, __FILE__ );

	wp_enqueue_script( $script_handle, $script_url, $script_asset['dependencies'], $script_asset['version'] );

	// Editor default styles
	wp_enqueue_style( 'wp-format-library' );

}

add_action( 'admin_enqueue_scripts', 'getdave_sbe_block_editor_init' );



/**
 * Registers the new WP Admin Menu
 *
 * @return void
 */
function getdave_sbe_add_menu_page() {
	global $submenu;

	add_menu_page(
		'Standalone Block Editor',
		'Block Editor',
		'edit_posts',
		'getdavesbe', // hook/slug of page
		'getdave_sbe_render_block_editor', // function to render page
		'dashicons-welcome-widgets-menus'
	);
}
add_action( 'admin_menu', 'getdave_sbe_add_menu_page' );


/**
 * Renders the Menu Page
 *
 * @return void
 */
function getdave_sbe_render_block_editor() {
	?>
		<div
			id="getdave-sbe-block-editor"
			class="getdave-sbe-block-editor"
		>
			Loading Editor...
		</div>
	<?php
}

