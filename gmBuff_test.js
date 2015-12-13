/*eslint no-console: 0 */
/*global console */

(function () {
    'use strict';

    var fs = require('fs'),
        imBuffUtil = require('./gmBuffUtil');


    function readTestData() {
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

    function writeTestFile(buff) {
        return new Promise(function (resolve, reject) {
            fs.writeFile('image/testOutput.jpg', buff, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(buff);
                }
            });
        });
    }

    function test() {
        readTestData()
            .then(imBuffUtil.identify)
            .then(function (data){
                console.dir(data.identify.size);
                return data.data;
            })
            .then(imBuffUtil.converter({
                rotate: -90,
                width: 300,
                hight: 300
            }).conv)
            .then(writeTestFile)
            .then(imBuffUtil.identify)
            .then(function (data){
                console.dir(data.identify.size);
                return data.data;
            })
            .catch(function (err){
                console.log('error');
                console.dir(err);
            });
    }

/*
    function test1() {
        var imUtil = require('./gmBuffUtil');

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
*/
    console.log('gm test start');
    //test0();
    test();
    console.log('end');

}());
