/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary
import '@wordpress/format-library';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { serialize, parse } from '@wordpress/blocks';
import { uploadMedia } from '@wordpress/media-utils';

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




    return (
        <div className="getdavesbe-block-editor">
            <BlockEditorProvider
                value={blocks}
                onInput={updateBlocks}
                onChange={updateBlocks}
                settings={settings}
            >
                <Sidebar.InspectorFill>
                    <BlockInspector />
                </Sidebar.InspectorFill>
                <div className="editor-styles-wrapper">
                    <BlockEditorKeyboardShortcuts />
                    <WritingFlow>
                        <ObserveTyping>
                            <BlockList className="getdavesbe-block-editor__block-list"/>
                        </ObserveTyping>
                    </WritingFlow>
                </div>
            </BlockEditorProvider>

        </div>
    );
}

export default BlockEditor;

