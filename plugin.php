<?php
/**
 * Plugin Name: Standalone Block Editor Demo
 * Plugin URI: https://aheadcreative.co.uk
 * Description: a @getdave demo of a standalone Gutenberg Block Editor instance.
 * Author: @getdave
 * Author URI: https://aheadcreative.co.uk
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package GSBE
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'init.php';
