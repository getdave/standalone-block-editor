import { parse } from "@wordpress/blocks";
import { fetchBlocksFromStorage, updateBlocks } from "./actions";

export function *getBlocks() {
    const rawBlocks = yield fetchBlocksFromStorage();
    const persist = false;
    const blocks = parse(rawBlocks);
    yield updateBlocks(blocks, persist);
    return blocks;
}