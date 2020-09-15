import { dispatch } from '@wordpress/data-controls';
import { UPDATE_BLOCKS, PERSIST_BLOCKS } from "./action-types";
import { ActionCreators } from "redux-undo";


export function undo() {
	return ActionCreators.undo();
}

export function redo() {
	return ActionCreators.redo();
}

export function updateBlocks( blocks, persist = false ) {
	return {
		type: persist ? PERSIST_BLOCKS : UPDATE_BLOCKS,
		blocks,
	};
}


