import { bddExpand } from '../dist/bdd-expand.es5';

/**
 * @param {any} obj
 * @param {string} path
 * @returns {any}
 */
const f = (obj, path) => {
    return path.split('.').reduce((acc, prop) => {
        return acc && acc[prop];
    }, obj);
};

bddExpand(f, [
    {
        title: 'non existing prop',
        args: [{}, 'a'],
        expected: undefined,
    },
    {
        title: 'existing prop',
        args: [{ a: 1 }, 'a'],
        expected: 1,
    },
    {
        title: 'chain with dot separator',
        args: [{ a: { b: 1 } }, 'a.b'],
        expected: 1,
    },
    {
        title: 'optional chain with dot separator',
        args: [{ a: { b: 1 } }, 'x.b'],
        expected: undefined,
    },
]);
