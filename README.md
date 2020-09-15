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

If you'd like to play around with this custom block editor then you have 2 options:

1. Use the WordPress Docker environment bundled with this Repo (provided via [`@wordpress/env`](https://developer.wordpress.org/block-editor/packages/packages-env/).
2. Clone this repo directly into the `plugins` directory of a WordPress installation.

Either way you'll want to take the following steps:

### Clone Repo
```bash
// Clone this repo into that directory.
git clone git@github.com:getdave/standalone-block-editor.git

```

Change into the cloned directory:
```bash
cd standalone-block-editor/
```

### Install Dependencies

Install npm dependencies
```bash
npm install
```

*Important*: check you have [the necessary prerequisites to run `wp-env`](https://developer.wordpress.org/block-editor/packages/packages-env/#prerequisites).

### Start the WordPress Environment (optional)

Start the environment (if using):

```bash
npm run wp-env start
```

You should now be able to login to WordPress at [`localhost:7575/wp-admin`](http://localhost:7575/wp-admin):

* `username`: `admin`
* `password`: `password`

### Build the Plugin

Open a new terminal in the same [`standalone-block-editor/`] directory, then build the Plugin:

```bash
npm run build
```

...or if you'd prefer to watch and build _automatically_ on file change run:

```bash
npm run start
```

### Activate the Plugin

Open the Plugins page within WPAdmin [`localhost:7575/wp-admin/plugins.php`](http://localhost:7575/wp-admin/plugins.php) and activate the `Standalone Block Editor Demo` Plugin.

## More Information

If you're interesting in learning about how this works, I've written [a full walk-through of the code in TUTORIAL.md](TUTORIAL.md).