<?php
/**
 * Freemius integration
 * @since 1.0.0
 */
if ( function_exists( 'fswb_fs' ) ) {
    fswb_fs()->set_basename( true, __FILE__ );
    return;
}

/**
 *
 * @since 1.0.0
 */
 if ( ! function_exists( 'fswb_fs' ) ) {
    // Create a helper function for easy SDK access.
    function fswb_fs() {
        global $fswb_fs;

        if ( ! isset( $fswb_fs ) ) {
            // Include Freemius SDK.
            require_once dirname(__FILE__) . '/../freemius/start.php';

            $fswb_fs = fs_dynamic_init( array(
                'id'                  => '3059',
                'slug'                => 'flight-search-widget-blocks',
                'type'                => 'plugin',
                'public_key'          => 'pk_9d34b7f72aed66e7fa3c482a96cf5',
                'is_premium'          => false,
                'premium_suffix'      => 'Premium',
                // If your plugin is a serviceware, set this option to false.
                'has_premium_version' => true,
                'has_addons'          => false,
                'has_paid_plans'      => true,
                'menu'                => array(
                    'slug'           => 'flight-search-widget-blocks',
                    'first-path'     => 'admin.php?page=flight-search-widget-blocks',
                ),
            ) );
        }

        return $fswb_fs;
    }

    // Init Freemius.
    fswb_fs();
    // Signal that SDK was initiated.
    do_action( 'fswb_fs_loaded' );
}
