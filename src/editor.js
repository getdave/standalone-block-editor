import {
    Popover,
    SlotFillProvider,
    DropZoneProvider,
    navigateRegions,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Header from './header';
import Sidebar from './sidebar';
import BlockEditor from './block-editor';

function Editor({ settings={} }) {
    return (
        <SlotFillProvider>
            <DropZoneProvider>
                <div class="getdavesbe-block-editor-layout">
                    <Header />
                    <Sidebar />
                    <BlockEditor settings={settings} />
                </div>
                <Popover.Slot />
            </DropZoneProvider>
        </SlotFillProvider>
    );
}

export default navigateRegions(Editor);