type ParamsOf<T> = T extends (...args: infer T) => any ? T : never;
type ReturnOf<T> = T extends (...args: any[]) => infer T ? T : never;
type SpecA<T> = { title: string; args: ParamsOf<T>; expected: ReturnOf<T> };
type SpecB<T> = [ParamsOf<T>, ReturnOf<T>];
type Spec<T> = SpecA<T> | SpecB<T>;
type main = <T>(fn: T, spec: Spec<T>[]) => void;

export const bddExpand: main = (f, cases) => {
    // @ts-ignore
    let desc = typeof Cypress === 'undefined' ? 'func' : Cypress.spec.name.split('.')[0];

    describe(desc, () => {
        for (let ix = 0; ix < cases.length; ix++) {
            const cs = cases[ix];

            let norm: SpecA<typeof f>;
            if (Array.isArray(cs)) {
                const args = cs[0];
                const expected = cs[1];
                const readableArgs = args.map(arg => JSON.stringify(arg));
                const readableOut = JSON.stringify(expected);
                const title = `${readableArgs} -> ${readableOut}`;

                norm = { title, args, expected };
            } else {
                norm = cs;
            }

            if (typeof f === 'function') {
                it(norm.title, () => {
                    const result = f(...norm.args);
                    console.log(global);
                    const exp = expect(result);
                    if ('deep' in exp) {
                        // @ts-ignore
                        exp.deep.equal(norm.expected);
                    } else if ('toEqual' in exp) {
                        exp.toEqual(norm.expected);
                    } else {
                        throw new Error(
                            'Expect wrapper doest not have known equality comparison method',
                        );
                    }
                });
            }
        }
    });
};
