import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { registerCoreBlocks } from '@wordpress/block-library';
import Editor from './editor';

import './styles.scss';

domReady(function () {
    registerCoreBlocks();
    render(<Editor />, document.getElementById('getdave-sbe-block-editor'));
});

