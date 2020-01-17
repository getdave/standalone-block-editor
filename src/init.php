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

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function getdave_sbe_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'getdave-sbe-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);
}

// Hook: Frontend assets.
// add_action( 'enqueue_block_assets', 'getdave_sbe_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function getdave_sbe_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'getdave-sbe-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'getdave-sbe-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
}

// Hook: Editor assets.
// add_action( 'enqueue_block_editor_assets', 'getdave_sbe_editor_assets' );

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
		'getdavesbe',
		'getdave_sbe_render_block_editor',
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
	Block Editor here
	</div>
	<?php
}



