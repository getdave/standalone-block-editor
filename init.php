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

	// Inline the Editor Settings
	$settings = getdave_sbe_get_block_editor_settings();
	wp_add_inline_script( $script_handle, 'window.getdaveSbeSettings = ' . wp_json_encode( $settings ) . ';' );

	// Preload server-registered block schemas.
	wp_add_inline_script(
		'wp-blocks',
		'wp.blocks.unstable__bootstrapServerSideBlockDefinitions(' . wp_json_encode( get_block_editor_server_block_settings() ) . ');'
	);

	// Editor default styles
	wp_enqueue_style( 'wp-format-library' );

	// Styles
	wp_enqueue_style(
		'getdave-sbe-styles', // Handle.
		plugins_url( 'build/index.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( dirname( __FILE__ ) . '/build/index.css' ) // Version: File modification time.
	);
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


function getdave_sbe_get_block_editor_settings() {
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

	return $settings;
}
