/*jslint node: true, indent:4, nomen:true */
/*eslint no-console: 0 */
/*global console */

(function () {
    'use strict';
    var gf, x;
    console.log('test');

    gf = function* () {
        console.log('step 1');
        yield 1;
        console.log('step 2');
        yield 2;
        console.log('step Last');
        return 'last';
    };
    x = gf();
    console.log(x.next());
    console.log(x.next());
    console.log(x.next());
    console.log(x.next());
}());
