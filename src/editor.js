/**
 * WordPress dependencies
 */
import {
	Popover,
	SlotFillProvider,
	DropZoneProvider,
} from '@wordpress/components';

import { __experimentalEditorSkeleton as EditorSkeleton } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Notices from 'components/notices';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import BlockEditor from 'components/block-editor';

function Editor( { settings } ) {
	return (
		<SlotFillProvider>
			<DropZoneProvider>
				<EditorSkeleton
					header={ <Header /> }
					sidebar={<Sidebar />}
					content={
						<>
							<Notices />
							<BlockEditor settings={settings} />
						</>
					}
				/>
				<Popover.Slot />
			</DropZoneProvider>
		</SlotFillProvider>
	);
}

export default Editor;
