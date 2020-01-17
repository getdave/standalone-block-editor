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
import Sidebar from './sidebar';
// import './style.scss';

function BlockEditor() {
    const [blocks, updateBlocks] = useState([]);

    useEffect(() => {
        // registerCoreBlocks();
    }, []);

    return (
        <div className="getdavesbe-block-editor">
            <BlockEditorProvider
                value={blocks}
                onInput={updateBlocks}
                onChange={updateBlocks}
            >
                <Sidebar.InspectorFill>
                    <BlockInspector />
                </Sidebar.InspectorFill>
                <div className="editor-styles-wrapper">
                    <BlockEditorKeyboardShortcuts />
                    <WritingFlow>
                        <ObserveTyping>
                            <BlockList />
                        </ObserveTyping>
                    </WritingFlow>
                </div>
            </BlockEditorProvider>

        </div>
    );
}

export default BlockEditor;

