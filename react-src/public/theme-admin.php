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
        add_submenu_page(
            'comic-theme-settings',
            'Background Settings',
            'Background Settings',
            'manage_options',
            'comic-theme-background-settings',
            array($this, 'admin_menu_backgrounds'),
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

        $pages = get_pages();

        $chapters = get_terms([
            'taxonomy' => 'chapters',
            'hide_empty' => false,
        ]);

        $comics = array();

        foreach ($chapters as $chapter) {
            $parent_chapter = Comic_Plugin_Library::get_parent_chapter($chapter->term_id);
            $found = false;
            foreach ($comics as $comic) {
                if (($comic['slug'] ?? '') == $parent_chapter->slug) {
                    $found = true;
                    break;
                }
            }

            if ($found) {
                continue;
            }

            $comics[] = array(
                'name' => $parent_chapter->name,
                'slug' => $parent_chapter->slug
            );
        }

        $characters = get_terms(array(
            'taxonomy'   => 'characters',
            'hide_empty' => false,
        ));

        $character_groups = [];

        foreach ($characters as $character) {
            $character_group = get_term_meta($character->term_id, 'character_group', true);

            $character_group = $character_group != '' ? $character_group : 'Unknown';

            if (!in_array($character_group, $character_groups)) {
                $character_groups[] = $character_group;
            }
        }
?>
        <div class="wrap">
            <h1>Comic Theme General Settings</h1>

            <h2>Cast Page Settings</h2>
            <h3>Cast Page<h3>
            <?php
                $current_cast_page = $general_settings['cast_page'] ?? '';
            ?>
            <select class="comic-theme-admin-option-selector" id="cast_page">
                <option value="-1">None</option>
                <?php
                    foreach ($pages as $page) {
                ?>
                    <option class="level-0" value="<?php echo $page->post_name ?>" <?php echo $page->post_name == $current_cast_page ? 'selected="selected"' : '' ?>><?php echo $page->post_title ?></option>
                <?php
                    }
                ?>
            </select>

            <h3>Character Group Order</h3>
            <?php
                foreach ($character_groups as $index => $_) {
            ?>
            <select class="comic-theme-admin-option-selector" id="<?php echo "character_group_order:place_" . $index ?>">
                <option value="-1">None</option>
                <?php
                    foreach ($character_groups as $character_group) {
                        $current_group_setting = $general_settings["character_group_order"]['place_' . $index] ?? '';
                ?>
                    <option class="level-0" value="<?php echo $character_group ?>" <?php echo $character_group == $current_group_setting ? 'selected="selected"' : '' ?>><?php echo $character_group ?></option>
                <?php
                    }
                ?>
            </select>
            <?php
                }
            ?>

            <h2>Comic Logo Settings</h2>
            <div class="comic-theme-admin-image-group">
                <div class="comic-theme-admin-image-item">
                    <h3>Main Logo</h3>
                    <div class="comic-theme-admin-image-selector" id="logo:main">
                        <img src="<?php
                            echo $general_settings['logo']['main'] ?? '';
                        ?>">
                    </div>
                </div>
                <?php
                    foreach ($comics as $comic) {
                        $logo_image_url = $general_settings['logo'][$comic['slug']] ?? '';
                ?>
                    <div class="comic-theme-admin-image-item">
                        <h3><?php echo $comic['name'] ?></h3>
                        <div class="comic-theme-admin-image-selector" id="<?php echo 'logo:' . $comic['slug'] ?>" >
                            <img src="<?php echo $logo_image_url ?? '' ?>">
                        </div>
                    </div>
                <?php
                    }
                ?>
            </div>

            <h2>Comic Selector Settings</h2>
            <div class="comic-theme-admin-image-group">
                <?php
                    foreach ($comics as $comic) {
                        $selector_image_url = '';
                        if (isset($general_settings['comic_selector_image'])) {
                            $selector_image_url = $general_settings['comic_selector_image'][$comic['slug']] ?? '';
                        }
                ?>
                        <div class="comic-theme-admin-image-item">
                            <h3><?php echo $comic['name'] ?></h3>
                            <div class="comic-theme-admin-image-selector" id="<?php echo 'comic_selector_image:' . $comic['slug'] ?>">
                                <img src="<?php echo $selector_image_url ?? '' ?>">
                            </div>
                        </div>
                <?php
                    }
                ?>
            </div>
        </div>
<?php
    }

    /**
     * Function for the background settings
     */
    function admin_menu_backgrounds()
    {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }

        wp_enqueue_media();

        $general_settings = get_option('comic_theme_general_settings');

        $comics = array();

        $chapters = get_terms([
            'taxonomy' => 'chapters',
            'hide_empty' => false,
        ]);

        foreach ($chapters as $chapter) {
            $parent_chapter = Comic_Plugin_Library::get_parent_chapter($chapter->term_id);
            $found = false;
            foreach ($comics as $comic) {
                if (($comic['slug'] ?? '') == $parent_chapter->slug) {
                    $found = true;
                    break;
                }
            }

            if ($found) {
                continue;
            }

            $comics[] = array(
                'name' => $parent_chapter->name,
                'slug' => $parent_chapter->slug
            );
        }

        $locations = get_terms([
            'taxonomy' => 'locations',
            'hide_empty' => false,
        ]);
?>
        <div class="wrap">
            <h1>Comic Theme Background Settings</h1>

            <h2>Main Background</h2>
            <div class="comic-theme-admin-image-group">
                <div class="comic-theme-admin-image-item">
                    <h3>First Layer</h3>
                    <div class="comic-theme-admin-image-selector" id="background:main:first">
                        <img src="<?php
                            echo $general_settings['background']['main']['first'] ?? '';
                        ?>">
                    </div>
                </div>
                <div class="comic-theme-admin-image-item">
                    <h3>Second Layer</h3>
                    <div class="comic-theme-admin-image-selector" id="background:main:second">
                        <img src="<?php
                            echo $general_settings['background']['main']['second'] ?? '';
                        ?>">
                    </div>
                </div>
                <div class="comic-theme-admin-image-item">
                    <h3>Third Layer</h3>
                    <div class="comic-theme-admin-image-selector" id="background:main:third">
                        <img src="<?php
                            echo $general_settings['background']['main']['third'] ?? '';
                        ?>">
                    </div>
                </div>
            </div>
            <h2>Location Backgrounds</h2>
            <?php
                foreach ($locations as $location) {
            ?>
                <h3><?php echo $location->name ?></h3>
                <div class="comic-theme-admin-image-group">
                    <div class="comic-theme-admin-image-item">
                        <h4>First Layer</h4>
                        <div class="comic-theme-admin-image-selector" id="<?php echo 'background:' . $location->slug . ":first" ?>">
                            <img src="<?php echo $general_settings['background'][$location->slug]['first'] ?? '' ?>">
                        </div>
                    </div>
                    <div class="comic-theme-admin-image-item">
                        <h4>Second Layer</h4>
                        <div class="comic-theme-admin-image-selector" id="<?php echo 'background:' . $location->slug . ":second" ?>">
                            <img src="<?php echo $general_settings['background'][$location->slug]['second'] ?? '' ?>">
                        </div>
                    </div>
                    <div class="comic-theme-admin-image-item">
                        <h4>Third Layer</h4>
                        <div class="comic-theme-admin-image-selector" id="<?php echo 'background:' . $location->slug . ":third" ?>">
                            <img src="<?php echo $general_settings['background'][$location->slug]['third'] ?? '' ?>">
                        </div>
                    </div>
                </div>
            <?php
                }
            ?>
        </div>
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

        function setValueByIndexes(&$array, $indexes, $value) {
            $tempArray = &$array;
            foreach ($indexes as $index) {
                if (!isset($tempArray[$index])) {
                    $tempArray[$index] = array();
                }
                $tempArray = &$tempArray[$index];
            }
            $tempArray = $value;
        }

        if (!empty($_POST)) {
            $data_type = $this->ajax_input_changer($_POST['data_type']);
            switch ($data_type) {
                case 'image':
                    $setting_name = $this->ajax_input_changer($_POST['setting_name']);
                    $image_url = $this->ajax_input_changer($_POST['image_url']);
                    $settings = get_option('comic_theme_general_settings');
                    if (str_contains($setting_name, ':')) {
                        $setting_names = explode(':', $setting_name);
                        setValueByIndexes($settings, $setting_names, $image_url);;
                    } else {
                        $settings[$setting_name] = $image_url;
                    }

                    update_option('comic_theme_general_settings', $settings);
                    break;
                case 'text':
                    $setting_name = $this->ajax_input_changer($_POST['setting_name']);
                    $value = $this->ajax_input_changer($_POST['value']);
                    $settings = get_option('comic_theme_general_settings');
                    if (str_contains($setting_name, ':')) {
                        $setting_names = explode(':', $setting_name);
                        setValueByIndexes($settings, $setting_names, $value);;
                    } else {
                        $settings[$setting_name] = $value;
                    }

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
