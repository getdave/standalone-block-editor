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

	$settings = array(
		'disableCustomColors'    => get_theme_support( 'disable-custom-colors' ),
		'disableCustomFontSizes' => get_theme_support( 'disable-custom-font-sizes' ),
		// 'imageSizes'             => $available_image_sizes,
		'isRTL'                  => is_rtl(),
		// 'maxUploadFileSize'      => $max_upload_size,
	);
	list( $color_palette, ) = (array) get_theme_support( 'editor-color-palette' );
	list( $font_sizes, )    = (array) get_theme_support( 'editor-font-sizes' );
	if ( false !== $color_palette ) {
		$settings['colors'] = $color_palette;
	}
	if ( false !== $font_sizes ) {
		$settings['fontSizes'] = $font_sizes;
	}

	wp_enqueue_script(
		'getdave_aht-cgb-block-js', // Handle.
		plugins_url( 'getdave-standalone-block-editor/build/index.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-block-library' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'build/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	wp_enqueue_style( 'wp-format-library' );

	// Styles.
	// wp_enqueue_style(
	// 'getdave_aht-cgb-block-editor-css', // Handle.
	// plugins_url( 'build/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
	// array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	// filemtime( plugin_dir_path( __DIR__ ) . 'build/blocks.editor.build.css' ) // Version: File modification time.
	// );
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
	Block Editor here
	</div>
	<?php
}



