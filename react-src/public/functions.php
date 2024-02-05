<?php

function custom_theme_setup()
{
    register_nav_menus(array(
        'top' => esc_html__('Primary Menu', 'comic-theme'),
        'social'  => esc_html__('Social Menu', 'comic-theme'),
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');
