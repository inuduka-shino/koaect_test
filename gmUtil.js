/*eslint no-console: 0 */
/*global Promise */

module.exports = (function () {
    'use strict';
    var imagemagic = require('gm').subClass({imageMagick: true});

/*
    function cloneObject(src){
        var dst = {};
        for(var k in src){
            dst[k] = src[k];
        }
        return dst;
    }
*/
    function resize(size, im) {
        return im.resize(
                size.x,
                size.y
            );
    }

    function resizer(size) {
        return resize.bind(null, size);
    }

    function identify(im) {
        return new Promise(function (resolve, reject) {
            im.identify(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


    function write(filepath, im) {
        return new Promise(function (resolve, reject) {
            im.write(filepath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(im);
                }
            });
        });
    }

    function construct(buff) {
        return imagemagic(buff);
    }

    return {
        construct: construct,
        identify: identify,
        write: write,
        resizer: resizer
    };
}());
