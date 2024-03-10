<?php

/**
 * Methods for both public and admin side
 *
 * @link       http://wordpress.org/plugins/rate-my-post/
 * @since      3.0.0
 *
 * @package    Rate_My_Post
 * @subpackage Rate_My_Post/common
 */

class Rate_My_Post_Common
{

    // Plugin name - string
    private $rate_my_post;

    // Plugin version - string
    private $version;

    // Init
    public function __construct($rate_my_post, $version)
    {
        $this->rate_my_post = $rate_my_post;
        $this->version      = $version;
    }

    // post's vote count
    public static function get_vote_count($post_id = false)
    {
        if ( ! $post_id) {
            $post_id = get_the_id();
        }

        return intval(get_post_meta($post_id, 'rmp_vote_count', true));
    }

    // post's sum of ratings
    public static function get_sum_of_ratings($post_id = false)
    {
        if ( ! $post_id) {
            $post_id = get_the_id();
        }

        return intval(get_post_meta($post_id, 'rmp_rating_val_sum', true));
    }

    // calculate average rating
    public static function calculate_average_rating($sum_of_ratings, $vote_count)
    {
        if ( ! $sum_of_ratings || ! $vote_count) {
            return 0;
        }

        return round(($sum_of_ratings / $vote_count), 1);
    }

    // returns average rating
    public static function get_average_rating($post_id = false)
    {
        if ( ! $post_id) {
            $post_id = get_the_id();
        }
        $ratings_sum = self::get_sum_of_ratings($post_id);
        $vote_count  = self::get_vote_count($post_id);

        if ($ratings_sum && $vote_count) {
            return round(($ratings_sum / $vote_count), 1);
        }

        return 0;
    }

    // returns max rating
    public static function max_rating()
    {
        $max_rating = 5;
        if (has_filter('rmp_max_rating')) {
            $max_rating = apply_filters('rmp_max_rating', $max_rating);
        }

        return intval($max_rating);
    }

    public static function update_post_id_rating($post_id, $vote_count, $avg_rating)
    {
        $post_id = intval($post_id);

        $max_rating = self::max_rating();

        $rating_sum = intval(round($vote_count * $avg_rating));

        // recalculate avg rating - for example if user inserts vote count 1 and rating 4.5 we want to avg rating to be 4 as the former is not possible
        if ($rating_sum && $vote_count) {
            $avg_rating = $rating_sum / $vote_count;
        } else {
            $rating_sum = 0;
            $vote_count = 0;
            $avg_rating = 0;
        }

        if ( ! $vote_count || $vote_count < 1 || $avg_rating < 1 || $avg_rating > $max_rating) {
            return new WP_Error('update_post_id_rating_error', esc_html__('Invalid vote count or average rating!', 'rate-my-post'));
        }

        // update vote count, sum of ratings and average rating
        update_post_meta($post_id, 'rmp_vote_count', $vote_count);

        update_post_meta($post_id, 'rmp_rating_val_sum', $rating_sum);

        update_post_meta($post_id, 'rmp_avg_rating', $avg_rating);

        return true;
    }
}
