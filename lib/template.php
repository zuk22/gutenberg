<?php
/**
 * Dynamic template registration and overrides.
 *
 * @package gutenberg
 */

/**
 * Replaces the output content of the template with the post content of a
 * dynamic template, if it is the result of a dynamic template override.
 *
 * @see wp-includes/template-loader.php
 *
 * @param string $template The path or slug of the template to include.
 */
function gutenberg_template_include( $template ) {
	// Assume if template override resulted in no dynamic template result, that
	// original should be used.
	if ( preg_match( '/\.php$/', $template ) ) {
		return $template;
	}

	$template_post_query = new WP_Query( array(
		'name'      => $template,
		'post_type' => 'wp_template',
	) );

	// Abort and fall through to theme error messages.
	if ( ! $template_post_query->have_posts() ) {
		return;
	}

	$template_posts = $template_post_query->get_posts();
	$template_post  = $template_posts[0];

	echo apply_filters( 'the_content', $template_post->post_content );

	// End of page lifecycle, abort to prevent theme error messages.
	exit;
}
add_filter( 'template_include', 'gutenberg_template_include' );

/**
 * Given a template path, returns a template name with file extension removed.
 *
 * @param string $template_name The path of the template.
 *
 * @return string The name of the template with path extension removed.
 */
function gutenberg_get_template_slug( $template_name ) {
	return preg_replace( '/\.php$/', '', $template_name );
}

/**
 * Overrides template lookup to consider whether any dynamic templates exist,
 * and if the priority for that template in the hierarchy is higher, uses it in
 * place of the original discovered template.
 *
 * @param string $template  Path to the template. See locate_template().
 * @param string $type      Filename without extension.
 * @param array  $templates A list of template candidates, in descending order of priority.
 *
 * @return string Path to the template file or slug of the dynamic template.
 */
function gutenberg_override_template( $template, $type, $templates ) {
	// Determine original priority of the default discovered template to avoid
	// overriding if the dynamic template is of lower priority. Template may be
	// an empty string if one is not loaded.
	$original_priority = PHP_INT_MAX;
	if ( $template ) {
		for ( $i = 0; $i < count( $templates ); $i++ ) {
			$template_name = $templates[ $i ];

			// If post is explicitly assigned a dynamic template, return immediately.
			if ( ! preg_match( '/\.php$/', $template_name ) ) {
				return $template_name;
			}

			// `$template` filter value is a absolute path, so check that template
			// file exists at end of path.
			$is_template = ( 0 === substr_compare(
				$template,
				'/' . $template_name,
				( -1 * strlen( $template_name ) ) - 1
			) );

			if ( $is_template ) {
				$original_priority = $i;
				break;
			}
		}
	}

	// Remove file extension from template paths before slug lookup.
	$override_templates = array_map( 'gutenberg_get_template_slug', $templates );

	$candidate_template_posts_query = new WP_Query( array(
		'post_name__in' => $override_templates,
		'post_type'     => 'wp_template',
	) );

	if ( ! $candidate_template_posts_query->have_posts() ) {
		return $template;
	}

	$candidate_template_posts = $candidate_template_posts_query->get_posts();
	$override_template        = $candidate_template_posts[0]->post_name;
	$override_priority        = array_search( $override_template, $override_templates );

	// Override template if priority is higher.
	if ( $override_priority <= $original_priority ) {
		$template = $override_template;
	}

	return $template;
}

/**
 * Array of all override-able default template types.
 *
 * @see get_query_template
 *
 * @var array
 */
$template_types = array(
	'index',
	'404',
	'archive',
	'author',
	'category',
	'tag',
	'taxonomy',
	'date',
	'embed',
	'home',
	'frontpage',
	'page',
	'paged',
	'search',
	'single',
	'singular',
	'attachment',
);

foreach ( $template_types as $template_type ) {
	add_filter( $template_type . '_template', 'gutenberg_override_template', 20, 3 );
}

/**
 * Merges discovered post templates with those available by matching taxonomy
 * of dynamic templates.
 *
 * @param array        $templates Array of post templates. Keys are filenames,
 *                                values are translated names.
 * @param WP_Theme     $theme     The theme object.
 * @param WP_Post|null $post      The post being edited, provided for context, or null.
 * @param string       $post_type Post type to get the templates for.
 *
 * @return string Post templates, including dynamic templates.
 */
function gutenberg_templates( $templates, $theme, $post, $post_type ) {
	$templates_query = new WP_Query( array(
		'post_type' => 'wp_template',
		'tax_query' => array(
			array(
				'taxonomy' => 'wp_template_post_types',
				'field'    => 'slug',
				'terms'    => $post_type,
			),
		),
	) );

	foreach ( $templates_query->get_posts() as $template ) {
		$templates[ $template->post_name ] = $template->post_title;
	}

	return $templates;
}

/*
 * TODO: This needs to be dynamically generated for all post types, either
 * queried here or a new filter made available for generic templates filter.
 *
 * - add_filter( 'theme_{$post_type}_templates', 'gutenberg_templates' );
 */

add_filter( 'theme_post_templates', 'gutenberg_templates', 10, 4 );
add_filter( 'theme_page_templates', 'gutenberg_templates', 10, 4 );

/**
 * Registers post tyes and taxonomies for dynamic templates.
 */
function gutenberg_register_template_post_types() {
	register_post_type( 'wp_template', array(
		'public'       => true,
		'menu_icon'    => 'dashicons-layout',
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor' ),
		'labels'       => array(
			'name' => __( 'Templates', 'gutenberg' ),
		),
	) );

	register_taxonomy( 'wp_template_post_types', 'wp_template', array(
		'public'       => true,
		'show_in_rest' => true,
		'show_in_menu' => false,
		'labels'       => array(
			'name' => __( 'Post Types', 'gutenberg' ),
		),
	) );
}
add_action( 'init', 'gutenberg_register_template_post_types' );
