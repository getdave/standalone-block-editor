import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { displayShortcut } from '@wordpress/keycodes';
import { undo as undoIcon } from '@wordpress/icons';

function HistoryUndo( { hasUndo, undo, ...props } ) {
	return (
		<Button
			{ ...props }
			icon={ undoIcon }
			label={ __( 'Undo' ) }
			shortcut={ displayShortcut.primary( 'z' ) }
			// If there are no undo levels we don't want to actually disable this
			// button, because it will remove focus for keyboard users.
			// See: https://github.com/WordPress/gutenberg/issues/3486
			aria-disabled={ ! hasUndo }
			onClick={ hasUndo ? undo : undefined }
			className="editor-history__undo"
		/>
	);
}

const EnhancedHistoryUndo = compose( [
	withSelect( ( select ) => ( {
		hasUndo: select( 'getdavesbe' ).hasEditorUndo(),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		undo: dispatch( 'getdavesbe' ).undo,
	} ) ),
] )( HistoryUndo );

export default EnhancedHistoryUndo;
