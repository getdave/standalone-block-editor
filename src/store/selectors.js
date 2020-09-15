import { createRegistrySelector } from '@wordpress/data';






export const getBlocks = ( state ) => {
	return state.present.blocks || [];
}

export const hasUndo = (state) => {
	return state.past?.length;
};

export const hasRedo = (state) => {
	return state.future?.length;
};

