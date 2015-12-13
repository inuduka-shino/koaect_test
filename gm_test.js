/*eslint no-console: 0 */
/*global console */

(function () {
    'use strict';

    /*
    function test0() {
        var im = require('gm').subClass({imageMagick: true});
        im('image/PE004.jpg')
            .rotate('green', 90)
            .write('image/imtest.jpg', function (err) {
                if (err) {
                    console.log('write error !');
                    console.dir(err);
                } else {
                    console.log('wrote.');
                }

            });
        return im;
    }
    */

    function readTestData() {
        var fs = require('fs');

        return new Promise(function (resolve, reject) {
            fs.readFile('image/PE004.jpg', function (err, data) {
                if (err) {
                    console.log('test file load error!!');
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    function test1() {
        var imUtil = require('./gmUtil');

        readTestData()
            .then(imUtil.construct)
            .then(imUtil.resizer({
                x: 100,
                y: 100
            }))
            .then(imUtil.write.bind(null, 'image/imtest_resize.jpg'))
            .then(imUtil.identify)
            .then(function (data){
                console.log('identify');
                console.dir(data.size);
            });
    }

    console.log('gm test start');
    //test0();
    test1();
    console.log('end');

}());
