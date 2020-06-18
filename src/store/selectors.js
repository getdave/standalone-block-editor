import { createRegistrySelector } from '@wordpress/data';

/**
 * Returns true if any past editor history snapshots exist, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether undo history exists.
 */
export const hasEditorUndo = createRegistrySelector( ( select ) => () => {
	return select( 'core' ).hasUndo();
} );

/**
 * Returns true if any future editor history snapshots exist, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether redo history exists.
 */
export const hasEditorRedo = createRegistrySelector( ( select ) => () => {
	return select( 'core' ).hasRedo();
} );
