<?php
/*
Plugin Name: Map Plugin
Description: IRC Standortkarte
Author: Janik Hotz
Author URI: mailto:janikhotz@gmail.com
*/


//Exit if accessed directly
if (!defined('ABSPATH')) {
    die;
}

require_once(plugin_dir_path(__FILE__). '/includes/map-plugin-scripts.php');
require_once(plugin_dir_path(__FILE__). '/includes/map-plugin-class.php');

//Register Widget
function register_map_widget() {
    register_widget('Map_Widget');
}

add_action('widgets_init', 'register_map_widget');