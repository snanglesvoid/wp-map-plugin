<?php
//Add scripts

function mp_add_scripts() {
    wp_enqueue_script('mp-main-script', plugins_url(). '/map-plugin/js/index.js');
}

add_action('wp_enqueue_scripts', 'mp_add_scripts');