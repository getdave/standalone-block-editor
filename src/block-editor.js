/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary
import '@wordpress/format-library';

import { useEffect, useState } from '@wordpress/element';
import {
    BlockEditorKeyboardShortcuts,
    BlockEditorProvider,
    BlockList,
    BlockInspector,
    WritingFlow,
    ObserveTyping,
} from '@wordpress/block-editor';
import {
    Popover,
    SlotFillProvider,
    DropZoneProvider,
} from '@wordpress/components';






/**
 * Internal dependencies
 */
// import './style.scss';

function BlockEditor() {
    const [blocks, updateBlocks] = useState([]);

    useEffect(() => {
        // registerCoreBlocks();
    }, []);

    return (
        <div className="">
            <SlotFillProvider>
                <DropZoneProvider>
                    <BlockEditorProvider
                        value={blocks}
                        onInput={updateBlocks}
                        onChange={updateBlocks}
                    >
                        <div className="sidebar">
                            <BlockInspector />
                        </div>
                        <div className="editor-styles-wrapper">
                            <BlockEditorKeyboardShortcuts />
                            <WritingFlow>
                                <ObserveTyping>
                                    <BlockList />
                                </ObserveTyping>
                            </WritingFlow>
                        </div>
                        <Popover.Slot />
                    </BlockEditorProvider>
                </DropZoneProvider>
            </SlotFillProvider>
        </div>
    );
}

export default BlockEditor;

