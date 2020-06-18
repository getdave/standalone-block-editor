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

/**
 * Module Constants
 */
const MODULE_KEY = 'getdavesbe';

const store = registerStore( MODULE_KEY, {
	reducer,
	selectors,
	actions,
} );

window.getDaveStore = store;

export default store;
