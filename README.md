# Standalone Gutenberg Block Editor

> One developer's experiment to create a standalone instance of the Block Editor
> within WPAdmin.

## What?

This repo is part of a personal _experiment_ to discover how easy (or otherwise) it is
to create a standalone instance of the Block Editor in WPAdmin.

## Why?

As part of my goal to learn Gutenberg deeply, I wanted to understand how it
worked at a fundemental level. What better way than a deep dive into the core
parts of the editor!?

## Disclaimer

This repo is by no means perfect and should not been seen as an
"official" way to build custom instances of the Block Editor. There will be many
bugs and errors - if you spot any please do raise an `Issue` and I'll do my best
to correct it.

## More Information

Whilst Gutenberg the "Editor" is comprised of many moving parts, at it's core is
the `@wordpress/block-editor` package. Let's walk through how the standalone
editor example is put together.

### Registering the Admin Page

The first thing we do is [register our custom Admin page](https://developer.wordpress.org/reference/functions/add_menu_page/).

```php
// init.php
add_menu_page(
    'Standalone Block Editor',
    'Block Editor',
    'edit_posts',
    'getdavesbe', // hook/slug of page
    'getdave_sbe_render_block_editor', // function to render the page
    'dashicons-welcome-widgets-menus'
);
```

As Gutenberg is a React powered application, we now need to output some HTML into which the block editor
can be rendered.

```php
function getdave_sbe_render_block_editor() {
	?>
	<div
		id="getdave-sbe-block-editor"
		class="getdave-sbe-block-editor"
	>
		Loading Editor...
	</div>
	<?php
}
```

Note the `id` attribute `getdave-sbe-block-editor`. We'll be using that shortly.

### Enqueuing JavaScript and CSS

Gutenberg uses React and React itself is written in JavaScript. Therefore, we now need to
enqueue some JavaScript (as well as some CSS styles) so that they will run on our custom Admin
page.

To do this we hook into `admin_enqueue_scripts`. Firstly, we define a function
which will exit early if the page doesn't match the identifier of our custom
Admin page:

```php
function getdave_sbe_block_editor_init( $hook ) {

    // Exit if not the correct page
	if ( 'toplevel_page_getdavesbe' !== $hook ) {
		return;
    }

    // Script/style registration here...
}

add_action( 'admin_enqueue_scripts', 'getdave_sbe_block_editor_init' );
```

With this in place, we can then safely register our JavaScript using the standard WP
`wp_enqueue_script` function:

```php
// Variable assignment omitted for brevity - [see here for details](https://github.com/getdave/standalone-block-editor/blob/974a59dcbc539a0595e8fa34670e75ec541853ab/init.php#L19).
wp_enqueue_script( $script_handle, $script_url, $script_asset['dependencies'], $script_asset['version'] );
```

Note that we register dependencies as the 3rd argument - this is being
dynamically generated using [@wordpress/dependency-extraction-webpack-plugin](https://developer.wordpress.org/block-editor/packages/packages-dependency-extraction-webpack-plugin/) to
[ensure that WordPress provided scripts are not included in the built
bundle](https://developer.wordpress.org/block-editor/packages/packages-scripts/#default-webpack-config).

Next we register both our custom CSS styles and the WordPress default formatting
library to take advantage of some nice default styling:

```php
// Editor default styles
wp_enqueue_style( 'wp-format-library' );

// Custom styles
wp_enqueue_style(
    'getdave-sbe-styles', // Handle.
    plugins_url( 'build/index.css', __FILE__ ), // Block editor CSS.
    array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
    filemtime( dirname( __FILE__ ) . '/build/index.css' ) // Version: File modification time.
);
```

Lastly, we also [inline some editor settings as JSON](https://github.com/getdave/standalone-block-editor/blob/974a59dcbc539a0595e8fa34670e75ec541853ab/init.php#L48) so that we can access
these from the JavaScript on the `window.getdaveSbeSettings` object:

```php
// Inline the Editor Settings
$settings = getdave_sbe_get_block_editor_settings();
wp_add_inline_script( $script_handle, 'window.getdaveSbeSettings = ' . wp_json_encode( $settings ) . ';' );
```

## Registering and Rendering our Editor

With the above in place, we're now finally ready to render the Block Editor into
the Admin page DOM.

Inside our main `src/index.js` file we first pull in required JS packages and
import our CSS styles (note using Sass requires [extending the default
`@wordpress/scripts` Webpack
config](https://github.com/getdave/standalone-block-editor/blob/974a59dcbc539a0595e8fa34670e75ec541853ab/webpack.config.js#L13)).

Next, once the dom is ready we run a function which

* Grabs our editor settings from `window.getdaveSbeSettings` (inlined from PHP -
  see above).
* Registers all the Core Gutenberg Blocks using `registerCoreBlocks`.
* Renders an `<Editor>` component into the waiting `<div>` on our custom Admin page.

```jsx
domReady( function() {
	const settings = window.getdaveSbeSettings || {};
	registerCoreBlocks();
	render( <Editor settings={ settings } />, document.getElementById( 'getdave-sbe-block-editor' ) );
} );
```

## The `<Editor>` component

Now let's take a look at the `<Editor>` component (`src/editor.js`) we saw
above.

To start with we pull in some dependencies. The most important of these are the
internal components `BlockEditor` and `Sidebar`, which we will explore in greater detail
shortly. The remainder comprise the layout and surrounding UI of the editor.

```jsx
/**
 * Internal dependencies
 */
import Notices from 'components/notices';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import BlockEditor from 'components/block-editor';
```

With those in place we can proceed to define our render. This defines the core
of the editor's layout alongside specialised [context providers](https://reactjs.org/docs/context.html#contextprovider) which make particular functionality
available throughout the component hierarchy.

Here's what's going on:

* `<SlotFillProvider>` - enables the use of the ["Slot/Fill"
  pattern](https://github.com/WordPress/gutenberg/blob/e38dbe958c04d8089695eb686d4f5caff2707505/docs/designers-developers/developers/slotfills/README.md).
* `<DropZoneProvider>` - enables the use of [dropzones for drag and drop functionality](https://github.com/WordPress/gutenberg/tree/e38dbe958c04d8089695eb686d4f5caff2707505/packages/components/src/drop-zone).
* `<Notices>` - provides a "snack" bar Notice that will be rendered if any
  messages are dispatched to `core/notices`.
* `<Header>` - renders the title "Standalone Block Editor" at the top of the
  editor UI.
* `<BlockEditor>` - our custom block editor component. This is where things get
  interesting and will focus more on this in a moment.
* `<Popover.Slot />` - renders a slot into which `<Popover>`s can be rendered
  using the Slot/Fill mechanic.


```jsx
function Editor( { settings } ) {
	return (
		<SlotFillProvider>
			<DropZoneProvider>
				<div className="getdavesbe-block-editor-layout">
					<Notices />
					<Header />
					<Sidebar />
					<BlockEditor settings={ settings } />
				</div>
				<Popover.Slot />
			</DropZoneProvider>
		</SlotFillProvider>
	);
}
```

With this basic component stucture in place the only remaining thing left to do
is wrap everything in [the `navigateRegions` HOC](https://github.com/WordPress/gutenberg/tree/e38dbe958c04d8089695eb686d4f5caff2707505/packages/components/src/higher-order/navigate-regions) to provide keyboard navigation to
switch between the different "regions" in the layout.

```jsx
export default navigateRegions( Editor );
```

### Our custom `<BlockEditor>`

Now we have a our core layouts and components in place, it's time to explore our
custom implementation of the block editor itself. This is where the magic
happens so let's get ready to dive into some code!

Opening `src/components/block-editor/index.js` we see that this is the most
complex of the components we have encountered thus far. There's a lot going on
so let's break this down!

To begin, let's focus on the components within the render.

#### `<BlockEditorProvider>`

[`<BlockEditorProvider>`](https://github.com/WordPress/gutenberg/tree/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/provider) is one of the most important components in the hierarchy as it establishes
a new block editing context for a new block editor. As a result, it is fundamental to
the entire goal of our project.

All children of `<BlockEditorProvider>` should comprise the UI for the block
editor. These components then have access to data (via `Context`) which enables
them to render and manage the Blocks within the editor.

```jsx
<BlockEditorProvider
    value={ blocks } // array of block objects
    onInput={ updateBlocks } // handler to manage Block updates
    onChange={ persistBlocks } // handler to manage Block updates/persistence
    settings={ settings } // editor "settings" object
/>
```

`<BlockEditorProvider>` accepts array of (parsed) block objects as its `value` prop and fires
`onChange` and/or `onInput` (passing the new Blocks as a argument) when there's
a change within the editor. Internally it does this by subscribing to the
provided `registry` (via the [`withRegistryProvider` HOC](https://github.com/WordPress/gutenberg/blob/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/provider/index.js#L158)), listening to block change events, determining whether Block
changing was persistent and calling the appropriate `onChange|Input` handler.

For the purposes of our simple experiment this allows us to:

* Store the array of blocks in state as `blocks`. This allows us to provide
  previously "saved" blocks (persisted into `localStorage`) as the initial state
  when restoring the editor between page refreshes.
* Update the `blocks` state in memory on `onInput` by calling the hook setter
  `updateBlocks(blocks)`.
* Handle basic persistence of blocks into `localStorage` using `onChange`. This is [fired
  when block updates are considered
  "committed"](https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/provider#onchange).

It's also worth noting that the component accepts a `settings` prop  allowing
you to config the editor settings (eg: disabling custom colors, configuring
available image sizes...etc).

#### Utility components

Moving on in our render we notice the following components which provide
important functionality for our editor instance:

* [`<BlockEditorKeyboardShortcuts />`](https://github.com/WordPress/gutenberg/blob/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/keyboard-shortcuts/index.js) - enables and usage of keyboard shortcuts
  within the editor.
* [`<WritingFlow>`](https://github.com/WordPress/gutenberg/blob/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/writing-flow/index.js) - handles selection, focus management and navigation across blocks.
* [`<ObserveTyping>`](https://github.com/WordPress/gutenberg/tree/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/observe-typing)- used to manage the editor's internal `isTyping` flag. This is used in
    various places, most commonly to show/hide the Block toolbar in response to
    typing.

#### `<BlockList>`

[`<BlockList>`](https://github.com/WordPress/gutenberg/blob/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/block-list/index.js) is one of the most important components in the editor. It's role
is to render a list of Blocks into the editor.

It does this is concert with other components, the hierarchy of which can be approximated as follows:

```
// Pseudo code - example purposes only
<BlockList /> // renders a list of Blocks from the rootClientId.
- <BlockListBlock /> // renders a single "Block" from the BlockList.
-- <BlockEdit /> // renders the standard editable area of a Block .
--- <Component /> // renders the Block interface as defined in its `edit()` implementation.
```

For each Block provided, `<BlockList>` loops over all the Block clientIds and
renders each via [`<BlockListBlock />`](https://github.com/WordPress/gutenberg/blob/e38dbe958c04d8089695eb686d4f5caff2707505/packages/block-editor/src/components/block-list/block.js). This in turn renders the single "Block"
via it's own subcomponents [`<BlockEdit>`](https://github.com/WordPress/gutenberg/blob/def076809d25e2ad680beda8b9205ab9dea45a0f/packages/block-editor/src/components/block-edit/index.js) and finally [the Block itself (via `<Component>`)](https://github.com/WordPress/gutenberg/blob/def076809d25e2ad680beda8b9205ab9dea45a0f/packages/block-editor/src/components/block-edit/edit.js).

These are some of the most complex and involved
components within the `@wordpress/block-editor` package and as such we don't
have space to do a deep dive on them here. That said, if you wish to have a
strong grasp of how the editor works at a fundamental level, I strongly advise
making a study of these components. I leave this as an exercise for the reader!

### The Sidebar

Also within the render of our `<BlockEditor>`, is a `<Sidebar>`. This is used -
alongside other things - to
display advanced Block settings via the `<BlockInspector>` component.

```jsx
<Sidebar.InspectorFill>
    <BlockInspector />
</Sidebar.InspectorFill>
```

However, the keen-eyed readers amongst you will have already noted the presence
of a `<Sidebar>` component within our `<Editor>` (`src/editor.js`) component's
layout:

```jsx
<Notices />
<Header />
<Sidebar /> // <-- eh!?
<BlockEditor settings={ settings } />
```

Opening `src/components/sidebar/index.js` we see that this is in fact the
component rendered within `<Editor>` above. However, the implementation utilises
Slot/Fill to expose a `Fill` (`<Sidebar.InspectorFill>`) which we subsequently
`import` and render inside of our `<BlockEditor>` component (see above).

With this in place, we then render `<BlockInspector />` as a child of the
`Sidebar.InspectorFill`. This has the result of allowing us to keep
`<BlockInspector>` within the React context of `<BlockEditorProvider>` whilst
allowing it to be rendered into the DOM in a separate location (ie: in the `<Sidebar>`).

This might seem overly complex, but it is required in order that
`<BlockInspector>` can have access to information about the current Block.
Without Slot/Fill this setup would be extremely difficult to achieve.


Aside:
[`<BlockInspector>`](https://github.com/WordPress/gutenberg/blob/def076809d25e2ad680beda8b9205ab9dea45a0f/packages/block-editor/src/components/block-inspector/index.js)
 itself actually renders a `Slot` for [`<InspectorControls>`](https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/inspector-controls
). This is what allows you [render a `<InspectorControls>` component inside
the `edit()` definition for your block](https://github.com/WordPress/gutenberg/blob/def076809d25e2ad680beda8b9205ab9dea45a0f/packages/block-library/src/paragraph/edit.js#L127) and have
it display within Gutenberg's sidebar. I recommend looking into this component
in more detail.

## Block Persistence

We've come a long way on our journey to create a custom block editor. But there is
one major area left to touch upon - Block peristence, the act of having our
Blocks saved and available between page refreshes.

As this is only an experiment we've opted to utilise the browser's
`localStorage` API to handle saving Block data. In a real-world scenario however
you'd like choose a more reliable and persistent system (eg: a database).

That said, let's take a closer look at how we're managing to save our Blocks.

Opening `src/components/block-editor/index.js` we will notice we have created
some state to manage the in-memory state of our Blocks as an array:

```js
const [ blocks, updateBlocks ] = useState( [] );
```

As mentioned earlier, `blocks` is passed to the "controlled" component `<BlockEditorProvider>` as its
`value` prop. This "hydrates" it with an initial set of Blocks. Similarly, the
`updateBlocks` setter is hooked up to the `onInput` callback on
`<BlockEditorProvider>` which ensures that our block state is kept in sync with
changes made to blocks within the editor.

### Saving Block data

If we now turn our attention to the `onChange` handler, we will notice it is
hooked up to a function `persistBlocks` which is defined as follows:

```js
function persistBlocks( newBlocks ) {
    updateBlocks( newBlocks );
    window.localStorage.setItem( 'getdavesbeBlocks', serialize( newBlocks ) );
}
```

This function accepts an array of "committed" block changes and calls the state
setter `updateBlocks`. In addition to this however, it also stores the blocks
within LocalStorage under the key `getdavesbeBlocks`. In order to achieve this
the Block data is serialized into [Gutenberg "Block
Grammar"](https://developer.wordpress.org/block-editor/principles/key-concepts/#blocks)
format, meaning it can be safely stored as a string.

If we open DeveloperTools and inspect our LocalStorage we will see serialized
Block data stored and updated as changes occur within the editor. Below is an
example of the format:

```
<!-- wp:heading -->
<h2>An experiment with a standalone Block Editor in WPAdmin</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This is an experiment to discover how easy (or otherwise) it is to create a standalone instance of the Block Editor in WPAdmin.</p>
<!-- /wp:paragraph -->
```

### Retrieving previous Block data

Having persistence in place is all well and good, but it's useless unless that
data is retrieved and restored within the editor upon each instantiation.

Accessing data is a side effect, so naturally we reach for our old (new!?)
friend the `useEffect` hook to handle this.

```js
useEffect( () => {
    const storedBlocks = window.localStorage.getItem( 'getdavesbeBlocks' );

    if ( storedBlocks && storedBlocks.length ) {
        updateBlocks( parse( storedBlocks ) );
        createInfoNotice( 'Blocks loaded', {
            type: 'snackbar',
            isDismissible: true,
        } );
    }
}, [] );
```

In this handler (which runs on the equivalent of the `componentDidMount`
lifecycle hook), we:

* Grab the serialized block data from local storage.
* Convert the serialzed blocks back to JavaScript objects using the `parse()`
  utility.
* Call the state setter `updateBlocks` causing the `blocks` value to be updated
  in state to reflect the blocks retrieved from LocalStorage.

As a result of these operations the controlled `<BlockEditorProvider>` component
is updated with the blocks restored from LocalStorage causing the editor to
reflect this.

Finally, for good measure we generate a notice which will display in our `<Notice>` component as
a "snackbar" notice.

## Conclusion

?

