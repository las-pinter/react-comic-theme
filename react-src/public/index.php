<?php
$TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="apple-touch-icon" href="<?php echo $TEMPLATE_PATH; ?>/logo192.png" />
    <link rel="manifest" href="<?php echo $TEMPLATE_PATH; ?>/manifest.json" />
    <title>React WordPress Theme</title>
    <?php wp_head(); ?>
</head>

<body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
</body>

<?php wp_footer(); ?>


</html>