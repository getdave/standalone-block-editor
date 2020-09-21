/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import controls from './controls';
import { parse } from "@wordpress/blocks";



/**
 * Module Constants
 */
const MODULE_KEY = 'getdavesbe';

const store = registerStore(MODULE_KEY, {
	reducer,
	selectors,
	actions,
	controls,
	resolvers: {
		*getBlocks() {
			const rawBlocks = yield actions.fetchBlocksFromStorage();
			const persist = false;
			const blocks = parse(rawBlocks);
			yield actions.updateBlocks(blocks, persist);
			return blocks;
		},
	},
});

window.getDaveStore = store;

export default store;
