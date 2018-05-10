## Extending the post editor UI

Extending the editor UI can be accomplished with the `registerPlugin` API, allowing you to define all your plugin's UI elements in one place.

Refer to [the plugins module documentation](../plugins/) for more information.

## Plugin Components

The following components can be used with the `registerPlugin` ([see documentation](../plugins)) API.
They can be found in the global variable `wp.editPost` when defining `wp-edit-post` as a script dependency.

**Note:** Plugin scripts should be enqueued to footer by setting `in_footer` option to true ( [see wp_enqueue_script documentation](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) ).

Experimental components can be found under `wp.editPost.__experimental`. Experimental components are still being evaluated and can change in a future version.

### `PluginSidebar`

Renders a sidebar when activated. The contents within the `PluginSidebar` will appear as content within the sidebar.

If you wish to display the sidebar, you can with use the [`PluginSidebarMoreMenuItem`](#pluginsidebarmoremenuitem) component or the `wp.data.dispatch` API:
```js
wp.data.dispatch( 'core/edit-post' ).openGeneralSidebar( 'plugin-name/sidebar-name' );
```

_Example:_

```jsx
const { __ } = wp.i18n;
const { PanelBody } = wp.components;
const { PluginSidebar } = wp.editPost;

const MyPluginSidebar = () => (
	<PluginSidebar
		name="my-sidebar"
		title="My sidebar title"
	>
		<PanelBody>
			{ __( 'My sidebar content' ) }
		</PanelBody>
	</PluginSidebar>
);
```

#### Props

##### name

A string identifying the sidebar. Must be unique for every sidebar registered within the scope of your plugin.

- Type: `String`
- Required: Yes

##### title

Title displayed at the top of the sidebar.

- Type: `String`
- Required: Yes


### `PluginSidebarMoreMenuItem`

Renders a menu item in `Plugins` group in `More Menu` drop down, and can be used to activate the corresponding `PluginSidebar` component.
The text within the component appears as the menu item label.

_Example:_

```jsx
const { __ } = wp.i18n;
const { PluginSidebarMoreMenuItem } = wp.editPost;

const MySidebarMoreMenuItem = () => (
	<PluginSidebarMoreMenuItem
		name="my-plugin"
		icon="yes"
		type="sidebar"
		target="my-sidebar"
	>
		{ __( 'My sidebar title' ) }
	</PluginSidebarMoreMenuItem>
);
```

#### Props

##### name

A string identifying the menu item. Must be unique for every menu item registered within the scope of your plugin.

- Type: `String`
- Required: Yes

##### type

A string identifying the type of UI element you wish this menu item to activate. Can be: `sidebar`.

- Type: `String`
- Required: Yes

##### target

A string identifying the target sidebar you wish to be activated by this menu item. Must be the same as the `name` prop you have given to that sidebar.

- Type: `String`
- Required: Yes

##### icon

The [Dashicon](https://developer.wordpress.org/resource/dashicons/) icon slug string, or an SVG WP element, to be rendered to the left of the menu item label.

- Type: `String` | `Element`
- Required: No


### PluginPrePublishPanel
**Experimental**

Renders provided content to the pre-publish side panel in the publish flow (side panel that opens when user first pushes "Publish" from main editor).

#### Usage
It should be noted that this is named and implemented around the function it serves and not its location, which may change in future iterations.

_Example:_
```jsx
<PluginPrePublishPanel>
    <div>My plugin content</div>
</PluginPrePublishPanel>
```

### PluginPostPublishPanel
**Experimental**

Renders provided content to the post-publish panel in the publish flow (panel that opens after user publishes the post).

```

#### Usage

```jsx
<PluginPostPublishPanel>
    <div>My plugin content</div>
</PluginPostPublishPanel>
```

### `PluginPostStatusInfo`

Renders a row in the Status & Visibility panel of the Document sidebar.
It should be noted that this is named and implemented around the function it serves and not its location, which may change in future iterations.

_Example:_
```jsx
const { __ } = wp.i18n;
const { PluginPostStatusInfo } = wp.editPost;

const MyPluginPostStatusInfo = () => (
	<PluginPostStatusInfo>
		{ __( 'My post status info' ) }
	</PluginPostStatusInfo>
);
```
