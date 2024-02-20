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
            register_rest_route($namespace, '/selector_images/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_selector_images'),
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
            return $general_settings['cast_page'] ?? '-1';
        }

        /**
         * Retrieving the character group order
         *
         * @return array
         */
        public static function get_character_group_order()
        {
            $characters = get_terms(array(
                'taxonomy'   => 'characters',
                'hide_empty' => false,
            ));

            $character_groups = [];

            foreach ($characters as $character) {
                $character_group = get_term_meta($character->term_id, 'character_group', true);

                if (!in_array($character_group, $character_groups)) {
                    $character_groups[] = $character_group != '' ? $character_group : 'Unknown';
                }
            }

            $result = [];
            $general_settings = get_option('comic_theme_general_settings');

            foreach ($character_groups as $index => $_) {
                $result[] = $general_settings['character_group_order_' . $index] ?? false;
            }

            return $result;
        }

        /**
         * Retrieving the comic selector background images
         *
         * @return array
         */
        public static function get_selector_images()
        {
            $general_settings = get_option('comic_theme_general_settings');
            return $general_settings['cast_page'] ?? '-1';
        }
    }

    add_action('rest_api_init', array('Comic_Theme_Settings_Rest_API', 'register_routes'));

endif;
