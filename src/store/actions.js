import { dispatch } from '@wordpress/data-controls';
import {
	UPDATE_BLOCKS,
	PERSIST_BLOCKS,
	FETCH_BLOCKS_FROM_STORAGE,
	PERSIST_BLOCKS_TO_STORAGE,
} from "./action-types";
import { ActionCreators } from "redux-undo";


export function undo() {
	return ActionCreators.undo();
}

export function redo() {
	return ActionCreators.redo();
}



export function *updateBlocks( blocks, persist = false ) {

	if( persist ) {
		yield persistBlocksToStorage(blocks);
	}

	return {
		type: persist ? PERSIST_BLOCKS : UPDATE_BLOCKS,
		blocks,
	};
}

export function fetchBlocksFromStorage() {
	return {
		type: FETCH_BLOCKS_FROM_STORAGE,
	};
};

export function persistBlocksToStorage(blocks) {
	return {
		type: PERSIST_BLOCKS_TO_STORAGE,
		blocks,
	};
}


