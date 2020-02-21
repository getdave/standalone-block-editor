# Standalone Gutenberg Block Editor

![alt text](screenshots/editor.png "The Standalone Editor instance populated with example Blocks within a custom WP Admin page.")

> One developer's experiment to create a standalone instance of the Block Editor
> within WPAdmin.

## What?

This repo is part of a personal _experiment_ to discover how easy (or otherwise) it is to create a standalone instance of the WordPress Block Editor.

The editor you see here is not be the same _Block Editor_ you are familiar with when creating `Post`s in with WordPress. Rather it is an entirely **custom block editor instance** built using the lower-level `@wordpress/block-editor` npm package (and friends).

## Why?

As part of my goal to learn Gutenberg deeply, I wanted to understand how it worked at a fundamental level. What better way than a deep dive into the core parts of the editor?

## Disclaimer

This repo is by no means perfect and should not been seen as an "official" way to build custom instances of the Block Editor. There will be many bugs and errors - if you spot any please do raise an `Issue` and I'll do my best to correct them.

## Getting Started

1. Clone this repo into the `plugins` directory of a WordPress installation.

```bash
// Change into your local WP install's Plugin directory.
cd {{mylocalwp}}/wp-content/plugins/

// Clone this repo into that directory.
git clone git@github.com:getdave/standalone-block-editor.git
```

2. Install the dependencies using `npm install`.

3. Build the Plugin by running `npm run build` (or alternatively run `npm start` to watch build automatically on file change).

4. Activate the Plugin from within WPAdmin.

## More Information

If you're interesting in learning about how this works, I've written [a full walk-through of the code in TUTORIAL.md](TUTORIAL.md).