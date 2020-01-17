import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { registerCoreBlocks } from '@wordpress/block-library';


import Editor from './editor';


domReady(function () {
    console.log("JS Loadeding");
    registerCoreBlocks();
    render(<Editor />, document.getElementById('getdave-sbe-block-editor'));
});

