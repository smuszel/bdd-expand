typeof before !== 'undefined' &&
    before(() => {
        require('@babel/register', {
            extensions: ['.js', '.ts', 'ts'],
        });
        console.log('XXXXX');
        global.expect = require('chai').expect;
    });
