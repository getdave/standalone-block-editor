/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary
import '@wordpress/format-library';
import { useSelect } from '@wordpress/data';
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

function BlockEditor({settings: _settings}) {
    const [blocks, updateBlocks] = useState( [] );

    const canUserCreateMedia = useSelect((select) => {
        const _canUserCreateMedia = select('core').canUser('create', 'media');
        return _canUserCreateMedia || _canUserCreateMedia !== false;
    }, []);

    const settings = useMemo(() => {
        if (!canUserCreateMedia) {
            return _settings;
        }
        return {
            ..._settings,
            mediaUpload({ onError, ...rest }) {
                uploadMedia({
                    wpAllowedMimeTypes: _settings.allowedMimeTypes,
                    onError: ({ message }) => onError(message),
                    ...rest,
                });
            },
        };
    }, [canUserCreateMedia, _settings]);

    useEffect(() => {
        const storedBlocks = localStorage.getItem('getdavesbeBlocks');

        if (storedBlocks && storedBlocks.length) {
            updateBlocks(parse(storedBlocks));
        }

    },[])


    function persistBlocks(blocks) {
        updateBlocks(blocks);
        localStorage.setItem('getdavesbeBlocks', serialize(blocks));
    }


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
                            <BlockList className="getdavesbe-block-editor__block-list"/>
                        </ObserveTyping>
                    </WritingFlow>
                </div>
            </BlockEditorProvider>

        </div>
    );
}

export default BlockEditor;

