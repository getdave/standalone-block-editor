import {
	FETCH_BLOCKS_FROM_STORAGE,
	PERSIST_BLOCKS_TO_STORAGE,
} from "./action-types";
import { serialize } from "@wordpress/blocks";

export default {
    [PERSIST_BLOCKS_TO_STORAGE](action) {
        return new Promise((resolve, reject) => {
            window.localStorage.setItem("getdavesbeBlocks", serialize(action.blocks));
            resolve(action.blocks);
        });
    },
    [FETCH_BLOCKS_FROM_STORAGE]() {
        return new Promise((resolve, reject) => {
            const storedBlocks =
                window.localStorage.getItem("getdavesbeBlocks") || [];
            resolve(storedBlocks);
        });
    },
};