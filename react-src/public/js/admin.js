jQuery(document).ready(function ($) {
    let currentBlock;

    // Instantiates the variable that holds the media library frame.
    var mediaUploader;

    jQuery('.comic-theme-admin-image-selector').on('click', function (e) {
        setting_name = $(this).attr('id');
        currentBlock = $(this);

        // Prevents the default action from occuring.
        e.preventDefault();

        // Check if media frame already exists
        if (mediaUploader)
        {
            mediaUploader.open();
            return;
        }

        // Create the media frame.
        mediaUploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Thumbnail Image',
            button: {text: 'Choose Image'},
            multiple: false
        });

        // When a file is selected, get the URL
        mediaUploader.on('select', function () {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            var url = attachment.url;

            jQuery.ajax({
                type: "POST",
                url: ajax_localize.ajax_url,
                data: {
                    action: ajax_localize.ajax_action_name,
                    data_type: "image",
                    setting_name: setting_name,
                    image_url: url
                },
                success: function (data) {
                    currentBlock.children('img').remove();
                    currentBlock.append('<img src="' + url + '" />');
                },
                error: function (errorThrown) {
                    alert(errorThrown);
                }
            });


        });

        // Open the uploader dialog
        mediaUploader.open();
    });
});