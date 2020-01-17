import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { registerCoreBlocks } from '@wordpress/block-library';


import BlockEditor from './block-editor';


domReady(function () {
    console.log("JS Loadeding");
    registerCoreBlocks();
    render(<BlockEditor />, document.getElementById('getdave-sbe-block-editor'));
});

