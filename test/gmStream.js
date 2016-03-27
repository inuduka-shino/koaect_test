require('mocha');
const assert = require('assert');
/*global describe, it */

describe('gm stream', function() {
    it('1st test 1+3 = 4', function() {
        assert.equal(4, 1 + 3);
    });
    it('2nd test 2 + 2 <> 5', function() {
        assert.notEqual(2 +2 , 5);
    });
});
