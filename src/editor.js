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
                <Header />
                <Sidebar />
                <BlockEditor settings={settings} />
                <Popover.Slot />
            </DropZoneProvider>
        </SlotFillProvider>
    );
}

export default navigateRegions(Editor);