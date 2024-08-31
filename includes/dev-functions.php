<?php

add_action('admin_menu', function () {
    if (defined('RATE_MY_POST_PRO_VERSION')) return;
    if ( ! current_user_can('edit_others_posts')) return;
    global $submenu;
    $submenu['rate-my-post'][] = [
        '<span style="color: #fff;background-color: #8d00b1d9;padding: 6px;">' . esc_html__('Upgrade to Pro', 'rate-my-post') . '</span>',
        'manage_options',
        'https://feedbackwp.com/pricing/?utm_source=wp_dashboard&utm_medium=menu-link&utm_campaign=menu-upsell'
    ];
}, 9999);


$basename = plugin_basename(RATE_MY_POST_SYSTEM_FILE_PATH);
$prefix   = is_network_admin() ? 'network_admin_' : '';
add_filter("{$prefix}plugin_action_links_$basename", function ($actions, $plugin_file, $plugin_data, $context) {
    if (defined('RATE_MY_POST_PRO_VERSION')) return $actions;

    $custom_actions['rmp_upgrade'] = sprintf(
        '<a style="color:#d54e21;font-weight:bold" href="%s" target="_blank">%s</a>', 'https://feedbackwp.com/pricing/?utm_source=wp_dashboard&utm_medium=upgrade&utm_campaign=action_link',
        __('Go Premium', 'rate-my-post')
    );

    // add the links to the front of the actions list
    return array_merge($custom_actions, $actions);

}, 10, 4);
