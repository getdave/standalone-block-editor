
import undoable, { groupByActionTypes, includeAction } from "redux-undo";



import { UPDATE_BLOCKS, PERSIST_BLOCKS } from "./action-types";

function blocksReducer(state = [], action) {
	switch (action.type) {
		case UPDATE_BLOCKS:
		case PERSIST_BLOCKS:
			const { blocks } = action;

			return {
				blocks,
			};
	}

	return state;
}

export default undoable(blocksReducer, {
	filter: includeAction(PERSIST_BLOCKS),
});
