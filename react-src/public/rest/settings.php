<?php

if (!class_exists('Comic_Theme_Settings_Rest_API')) :
    class Comic_Theme_Settings_Rest_API
    {
        /**
         * Register the routes for the objects of the controller.
         *
         * @return void
         */
        public static function register_routes()
        {
            $version = '1';
            $namespace = 'settings/v' . $version;

            register_rest_route($namespace, '/cast_page/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_cast_page'),
                'permission_callback' => '__return_true',
            ));
            register_rest_route($namespace, '/char_group_order/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_character_group_order'),
                'permission_callback' => '__return_true',
            ));
            register_rest_route($namespace, '/logos/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_logo_images'),
                'permission_callback' => '__return_true',
            ));
            register_rest_route($namespace, '/selector_images/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_selector_images'),
                'permission_callback' => '__return_true',
            ));
            register_rest_route($namespace, '/backgrounds/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_backgrounds'),
                'permission_callback' => '__return_true',
            ));
        }

        /**
         * Retrieving the page allocated for the case
         *
         * @return array
         */
        public static function get_cast_page()
        {
            $general_settings = get_option('comic_theme_general_settings');
            return $general_settings['cast_page'] ?? '';
        }

        /**
         * Retrieving the character group order
         *
         * @return array
         */
        public static function get_character_group_order()
        {
            $general_settings = get_option('comic_theme_general_settings');
            return $general_settings['character_group_order'] ?? [];
        }

        /**
         * Retrieving the comic selector background images
         *
         * @return array
         */
        public static function get_selector_images()
        {
            $general_settings = get_option('comic_theme_general_settings');
            return $general_settings['comic_selector_image'] ?? '';
        }

        /**
         * Retrieving the comic logo images
         *
         * @return array
         */
        public static function get_logo_images()
        {
            $general_settings = get_option('comic_theme_general_settings');
            return $general_settings['logo'] ?? '';
        }

        /**
         * Retrieving the background images
         *
         * @return array
         */
        public static function get_backgrounds()
        {
            $general_settings = get_option('comic_theme_general_settings');
            return $general_settings['background'] ?? '';
        }
    }

    add_action('rest_api_init', array('Comic_Theme_Settings_Rest_API', 'register_routes'));

endif;
