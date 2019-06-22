import { bddExpand } from '../dist/bdd-expand.es5';

/**
 * @param {number} x
 * @param {number} y
 */
const f = (x, y) => (x || 0) + (y || 0);

bddExpand(f, [
    [[1, 2], 3],
    [[1000, 2], 1003],
    [[0, 0], 0],
    [[Infinity, 0], Infinity],
    [[NaN, 1], 1],
]);
