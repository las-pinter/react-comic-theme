<?php
class Comic_Theme_Settings
{
    private $ajax_action_name = 'tfs_ajax_action';

    /**
     * Constructor
     */
    public function __construct()
    {
        if (is_admin()) {
            // Hook for adding admin menu
            add_action('admin_menu', array($this, 'admin_menu'));
            // Hook for removing top level setting menu, we rely on submenu pages
            add_action('admin_menu', array($this, 'remove_top_menu'));
            // For the css and other scripts
            add_action('admin_enqueue_scripts', array($this, 'init_admin_scripts'));
            // For settings registration
            add_action('admin_init', array($this, 'register_settings'));
            // For handling requests
            add_action('wp_ajax_' . $this->ajax_action_name, array($this, 'ajax_handler'));
        }
    }

    /**
     *  Adding the admin menus
     */
    function admin_menu()
    {
        add_menu_page(
            'Comic Theme Settings',
            'Comic Theme Settings',
            'manage_options',
            'comic-theme-settings',
            array($this, 'admin_menu_general'),
            'dashicons-admin-settings',
            7
        );
        add_submenu_page(
            'comic-theme-settings',
            'General Settings',
            'General Settings',
            'manage_options',
            'comic-theme-general-settings',
            array($this, 'admin_menu_general'),
            'dashicons-admin-generic'
        );
    }

    /*
     * Function for removing top level setting menu, we rely on submenu pages
     */
    function remove_top_menu()
    {
        remove_submenu_page('comic-theme-settings', 'comic-theme-settings');
    }

    /**
     * Function for the general settings
     */
    function admin_menu_general()
    {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }

        wp_enqueue_media();

        $general_settings = get_option('comic_theme_general_settings');
        
?>
        <h1>Comic Theme General Settings</h1>

        <h2>Comic Logo Settings</h2>

        <h2>Test Image</h2>
        </div>

        <div class="comic-theme-admin-image-selector" id="comic_theme_test_image_url">
            <img src="<?php echo $general_settings['comic_theme_test_image_url'] ?>">
        </div>

        <h2>Comic Selector Settings</h2>
<?php
    }

    /**
     * For the scripts and the CSS
     */
    function init_admin_scripts()
    {
        wp_register_style('comic-theme-admin-style', get_stylesheet_directory_uri() . '/style-admin.css', array(), 1);
        wp_enqueue_style('comic-theme-admin-style');

        wp_register_script('comic_theme_admin_js', get_stylesheet_directory_uri() . '/js/admin.js', array('jquery'));
        wp_enqueue_script('comic_theme_admin_js');
        wp_localize_script('comic_theme_admin_js', 'ajax_localize', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'ajax_action_name' => $this->ajax_action_name
        ));
    }

    /**
     * For registering the settings
     */
    function register_settings()
    {
        register_setting('comic-theme-general-settings', 'comic_theme_general_settings');
    }


    /**
     * Modifying the received ajax inpot
     *
     * @param string $input
     * @return string
     */
    function ajax_input_changer($input)
    {
        $data = trim($input);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    /**
     * For handling requests
     *
     * @param $data Received data from the ajax request
     *
     */
    public function ajax_handler($data)
    {
        $error = false;

        if (!empty($_POST)) {
            $data_type = $this->ajax_input_changer($_POST['data_type']);
            switch ($data_type) {
                case 'image':
                    $setting_name = $this->ajax_input_changer($_POST['setting_name']);
                    $image_url = $this->ajax_input_changer($_POST['image_url']);
                    $settings = get_option('comic_theme_general_settings');
                    $settings[$setting_name] = $image_url;
                    update_option('comic_theme_general_settings', $settings);
                    break;
                default:
                    error_log('Comic Theme ajax_handler: Unknown data type: ' . $data_type);
                    $error = true;
                    break;
            }
        }

        if ($error) {
            wp_send_json_error('Error');
        }

        wp_die();
    }
}

if (is_admin()) {
    new Comic_Theme_Settings();
}
