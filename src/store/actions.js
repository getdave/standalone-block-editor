import { dispatch } from '@wordpress/data-controls';

/**
 * Returns an action object used in signalling that undo history should
 * restore last popped state.
 *
 * @yield {Object} Action object.
 */
export function* redo() {
	yield dispatch( 'core', 'redo' );
}

/**
 * Returns an action object used in signalling that undo history should pop.
 *
 * @yield {Object} Action object.
 */
export function* undo() {
	yield dispatch( 'core', 'undo' );
}
