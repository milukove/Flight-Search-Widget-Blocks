<?php
/**
 * Register plugin's custom blocks category
 *
 * @since 1.0.0
 * @param  array $categories Existing categories
 * @return array             Categories with plugins one included
 */
function fswb_block_categories( $categories ) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'fswb',
                'title' => __( 'Flight Search Widget Blocks', 'fswb' ),
            ),
        )
    );
}

add_filter( 'block_categories', 'fswb_block_categories', 10, 2 );
