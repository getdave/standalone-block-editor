/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary
import '@wordpress/format-library';

import { useEffect, useState } from '@wordpress/element';
import { serialize, parse } from '@wordpress/blocks';
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
import Sidebar from 'components/sidebar';

function BlockEditor({settings}) {
    const [blocks, updateBlocks] = useState( [] );



    function persistBlocks(blocks) {
        updateBlocks(blocks);
        localStorage.setItem('getdavesbeBlocks', serialize(blocks));
    }

    useEffect(() => {
        const storedBlocks = localStorage.getItem('getdavesbeBlocks');
        console.log(storedBlocks);
        if (storedBlocks && storedBlocks.length) {
            updateBlocks(parse(storedBlocks));
        }

    },[])

    return (
        <div className="getdavesbe-block-editor">
            <BlockEditorProvider
                value={blocks}
                onInput={updateBlocks}
                onChange={persistBlocks}
                settings={settings}
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

