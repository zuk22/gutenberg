# Frequently Asked Questions

## What is Gutenberg?

"Gutenberg" is the codename for the 2017 WordPress editor focus. The goal if this focus is to create a new post and page editing experience that makes it easy for anyone to create rich post layouts. This was the kickoff goal:

> The editor will endeavour to create a new page and post building experience that makes writing rich posts effortless, and has “blocks” to make it easy what today might take shortcodes, custom HTML, or “mystery meat” embed discovery.

Key take-aways from parsing that paragraph:

- Authoring richly laid out posts is a key strength of WordPress.
- By embracing "the block", we can potentially unify multiple different interfaces into one. Instead of learning how to write shortcodes, custom HTML, or paste URLs to embed, you should do with just learning the block, and all the pieces should fall in place.
- "Mystery meat" refers to hidden features in software, features that you have to discover. WordPress already supports a large amount of blocks and 30+ embeds, so let's surface them.

Gutenberg is being developed on [Github](https://github.com/WordPress/gutenberg), and you can try [an early beta version today from the plugin repository](https://wordpress.org/plugins/gutenberg/). Though keep in mind it's not fully functional, feature complete, or production ready.

## How is Gutenberg built?

Gutenberg is a client side application built using Node, modern JavaScript, and SCSS with a build process.

## What browsers will Gutenberg support?

Gutenberg will work in modern browsers, and Internet Explorer 11+.

## How do I make my own block?


## Does Gutenberg involve editing posts/pages in the frontend?

No, Gutenberg is a replacement for the post and page editing screens.
## Will plugins be able to add custom meta-boxes in Gutenberg?

We are in the process of making Gutenberg pluggable. The work we are doing is being tracked in https://github.com/WordPress/gutenberg/issues/1352.

At a high level we expect these to be pluggable:

- Areas in the editor bar (top bar)
- Sidebar (add new metaboxes)
- Footer area (for metaboxes that need more space, and for legacy metaboxes)

Which aspects are pluggable will continue to be iterated and improved.

## Given Gutenberg is built in JavaScript, how will old metaboxes (PHP) work?

We are looking at creating a metabox tray at the bottom of the post, were wide metaboxes sit today. We are tracking this in https://github.com/WordPress/gutenberg/issues/952, where we are discussing more options.

## How will new JS powered metaboxes be built?

The API for this is still being finalized, as part of the work ongoing in https://github.com/WordPress/gutenberg/issues/1352

## Will there be columns?

Columns are not part of the initial version since we want to focus on a solid basic post and page editing experience. But Gutenberg ties into a customization focus that is likely going to look at columns.

See also https://github.com/WordPress/gutenberg/issues/219

## Will there be nested blocks?

HTML markup can nest, of course. But for the initial editor focus, we won't provide a UI for anything but the top level blocks. This is likely to be revisited as the customization focus looks at page building.

See also https://github.com/WordPress/gutenberg/issues/428

## Will drag and drop be used for rearranging blocks?

A key value for Gutenberg has been to see drag and drop as an _additive enhancement_. Only when explicit actions (click or tab & space) exist, can we add drag and drop as an enhancement on top of it.

So yes, we expect drag and drop to be part of Gutenberg, even if it isn't today.

## Can themes _style_ blocks?

Yes.

The behavior is similar to how shortcodes work. That is, blocks can provide their own styles, which themes can add to or override. Or blocks can provide no styles at all, and rely fully on what the theme provides.
## How will block styles work in the frontend and backend both?

Blocks will be able to provide CSS that goes both in the backend and the frontend. Some blocks, like a Separator (`<hr/>`), likely won't need any frontend styles, while others like Gallery need a few.

Other features, like the new _wide_ and _full-wide_ alignment options will simply be CSS classes applied to blocks with this alignment provided. We are looking at how a theme can either opt in to this feature, or opt out, for example using `add_theme_support`.

See also https://github.com/WordPress/gutenberg/issues/963

## When will Gutenberg be merged into WordPress?

We are hoping that Gutenberg will be sufficiently polished, tested, iterated and proven, that it can be [merged into WordPress 5.0](https://ma.tt/2017/06/4-8-and-whats-coming/).

The editor focus so far has taken 6 months. The first 3 months were spent designing, planning, prototyping and testing prototypes, to help us inform how to approach this. The actual plugin you can test in the repository right now has come together in the other 3 months.

We are far from done yet, but we are moving fast. Please help us by giving feedback, surfacing issues, testing, or even contributing, so hopefully we can be ready in time for WordPress 5.0.

## Is Gutenberg written in TinyMCE?

No.

TinyMCE is one of the best tools for enabling rich text on the web. In Gutenberg, TinyMCE does exactly that. Nearly every textfield you'll find is augmented with TinyMCE for rich text. Whether it be text, lists, or even just a single caption, TinyMCE can be invoked on blocks for rich text enhancements.

## I'm concerned that Gutenberg will make my plugin obsolete

The goal of Gutenberg is not to put anyone out of business. It is to evolve WordPress so there's more business to be had in the future.

Aside from enabling a rich post and page building experience, a meta goal is to _move WordPress forward_ as a platform. Not only by modernizing the UI, but my modernizing the foundation also.

We realize it's a big change. We also think there will be many new opportunities for plugins. WordPress is likely to ship with a range of basic blocks, but there will be plenty of room for highly tailored premium plugins that augment existing blocks, or add new blocks to the mix.

See also: https://github.com/WordPress/gutenberg/issues/1516

## Will I be able to opt out of Gutenberg for my site?

We are looking at ways to make Gutenberg configurable for many use cases, including disabling many aspects (like blocks, panels etc.).

There will also be a "Classic Text" block, which is virtually the same as the current editor, except in block-form.

There’s also likely to be a very popular plugin in the repository to replace Gutenberg with the classic editor.

## How will custom TinyMCE buttons work in Gutenberg?

Custom TinyMCE buttons will still work in the "Classic Text" block, which is a block version of the classic editor you know today.

(Gutenberg comes with a new universal inserter tool, which gives you access to every block available, searchable, sorted by recency and categories. This inserter tool levels the playing field for every plugin that adds content to the editor, and provides a single interface to learn how to use.)

## How will shortcodes work in Gutenberg?

Shortcodes will continue to work as they do now.

However we see the block as an evolution of the shortcode. Instead of having to type out code, you can use the universal inserter tray to pick a block and get a richer interface for both configuring the block, and previewing it. We would recommend people eventually upgrade their shortcodes to be blocks.
## Should I move shortcodes to content blocks?

We think so. Blocks are designed to be visually representative of the final look, and they will likely become the expected way in which users will discover and insert content in WordPress.

## Will Gutenberg be made properly accessible?

Accessibility is not an afterthought. Although not every aspect of Gutenbeg is accessible at the moment, we are tracking issues in https://github.com/WordPress/gutenberg/labels/Accessibility, and we are fixing them. We understand that WordPress is for everyone, and that accessibility is about inclusion. This is a key value for us.

We understand that there are concerns that these issues won't be addressed, or that features are being built in a way that doesn't lend itself to being made accessible. Perhaps the only way to alleviate these concerns, is to fix the issues that are being reported, and continue to iterate as fast as we can.

Although the plugin itself has (at the time of this writing) only been in development for 3 months, there's a long way to go still. All the while the plugin is being tested by volunteers, feedback is being given, and we are trying to address issues that come up. So far this has resulted in us rethinking and redesigning many interfaces, including writing prompts, the insertion tool, and how advanced block settings are accessed, in order to ensure accessibility.

Even if in the near future we reach our goal of being a feature complete plugin with good accessibility, the editor won't be frozen in amber. It will continue to be refined, redesigned, and iterated. Not only with the customization focus that is set to continue the work, but also after that.

Hopefully by continuing to address accessibility issues brought up, we can demonstrate our commitment to accessibility as a key value of Gutenberg.

## Are there any design resources for Gutenberg?

Yes, primarily https://github.com/WordPress/gutenberg/blob/master/docs/design.md

We are still adding more documentation.

## How is data stored? I've seen HTML comments, what is their purpose?

Our approach — as outlined in [the technical overview introduction](https://make.wordpress.org/core/2017/01/17/editor-technical-overview/) — was to augment the existing data format with the notion and intention of blocks in a way that didn't break the decade and a half fabric of content that WordPress has provided. In other terms, this optimizes for a format that prioritizes human readability (the html document of the web) and easy-to-render-anywhere over a machine convenient file (JSON in post-meta) that benefits the editing context primarily.

This also [gives us the flexibility](https://github.com/WordPress/gutenberg/issues/1516) to store those blocks that are inherently separate from the content stream (reusable pieces like widgets or small post type elements) elsewhere, and just keep token references for their placement.

## How can I parse the post content back out into blocks in PHP or JS?

In JS:

```js
wp.blocks.parse( postContent );
```

In PHP:

```php
$parser = new Gutenberg_PEG_Parser;
$blocks = $parser->parse( $post_content );
```

## Why should I start using this once released?

Blocks are likely to become the main way users interact with content. If you don’t move to blocks, your functionality is likely to become more obscure, confusing, and second-class in the eyes of users in the future.

## What features will be available at launch? What’s the post-launch roadmap look like?

As part of the focus on the editor in 2017, a focus on customization and sitebuilding is next. From [the kickoff post](https://make.wordpress.org/core/2017/01/04/focus-tech-and-design-leads/):

> The customizer will help out the editor at first, then shift to bring those fundamental building blocks into something that could allow customization “outside of the box” of post_content, including sidebars and possibly even an entire theme.

So essentially with the editor we are laying the foundation for bigger things when it comes to page building and customization.

A lot of features are planned, too many to list. But a rough roadmap is: v1) post and page editor v2) page template editor, v3) site builder.
