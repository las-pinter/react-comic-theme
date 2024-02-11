<?php

if (!class_exists('Comic_Plugin_Generic_Rest_API')) :
    class Comic_Plugin_Generic_Rest_API
    {
        /**
         * Register the routes for the objects of the controller.
         *
         * @return void
         */
        public static function register_routes()
        {
            $version = '1';
            $namespace = 'generic/v' . $version;

            register_rest_route($namespace, '/menu/', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_menus'),
                'permission_callback' => '__return_true',
            ));
            register_rest_route($namespace, '/menu/(?P<id>\d+)', array(
                'methods' => 'GET',
                'callback' => array(__CLASS__, 'get_menu_single'),
                'permission_callback' => '__return_true',
            ));
        }

        /**
         * Retrieving the navigation menus
         *
         * @return array
         */
        public static function get_menus()
        {
            error_log(print_r(wp_get_nav_menus(), true));
            return get_nav_menu_locations();
        }

        /**
         * Retrieving a specific menu by id
         *
         * @param int $data
         * @return array
         */
        public static function get_menu_single($data)
        {
            return wp_get_nav_menu_items($data['id']);
        }
    }

    add_action('rest_api_init', array('Comic_Plugin_Generic_Rest_API', 'register_routes'));

endif;
