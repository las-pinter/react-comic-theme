<?php
@require('admin.php');
@require('rest/settings.php');

function custom_theme_setup()
{
    register_nav_menus(array(
        'top' => esc_html__('Primary Menu', 'comic-theme'),
        'social'  => esc_html__('Social Menu', 'comic-theme'),
        'related'  => esc_html__('Related Menu', 'comic-theme'),
    ));
}
add_action('after_setup_theme', 'custom_theme_setup');

function custom_widgets_init()
{
    register_sidebar(array(
        'id'            => 'right-to-main-content',
        'name'          => 'Right to Main Content Side',
        'show_in_rest' => true,
    ));

    register_sidebar(array(
        'id'            => 'footer',
        'name'          => 'Footer',
        'show_in_rest' => true,
    ));

    register_sidebar(array(
        'id'            => 'under-comic',
        'name'          => 'Under Comic',
        'show_in_rest' => true,
    ));
}
add_action('widgets_init', 'custom_widgets_init');

remove_filter( 'the_title', 'wptexturize' );