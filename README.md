Lets say we want to make unit tests for simple add function

```javascript
export const add = (a, b) => a + b;
```

Full BDD style requires quite verbose syntax to get it done

```javascript
describe('Add', () => {
    it('Adds two digits', () => {
        expect((add(1, 5))).to.eq(6);
    });

    it('Works with negative numbers', () => {
        expect((add(-1, 5))).to.eq(4);
    });

    it('Works for larger numbers', () => {
        expect((add(1000000, 5))).to.eq(1000005);
    });
})
```
It is handy when we have to do extra mocking and setup, but in this case it might be overkill. All the above can be reduced to which function is being tested and map of example inputs to expected outputs.
This tool enables to write short, concise test definition

```javascript
import { bddExpand } from 'bdd-expand';

// Style 1
bddExpand(add, [
    [[1, 5], 6],
    [[-1, 5], 4],
    [[1000000, 5], 1000005],
]);

// Style 2
bddExpand(add, [
    {
        title: 'Adds two digits',
        args: [1, 5],
        expected: 6,
    },
    {
        title: 'Works with negative numbers',
        args: [-1, 5],
        expected: 4,
    },
    {
        title: 'Works for larger numbers',
        args: [1000000, 5],
        expected: 1000005,
    }
]);
```

You can run the spec in either mocha or jest test runner to get identical output to the classical way :wink:

### Minor features

* types support :sparkles:
* works for mocha/chai - uses `deep.equal` comparison
* works for jest - uses `toEqual`
* in cypress suite name will be the file basename