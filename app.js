/*eslint no-console: 0*/

(function () {
    'use strict';

    var koa = require('koa'),
        mount = require('koa-mount'),
        staticDelivery = require('koa-static'),
        ectModule = require('ect'),

        rootApp = koa(),
        ectRenderer = ectModule({
            watch: true,
            root: __dirname + '/views',
            ext : '.ect'
        });

    function genKoaError(info) {
        var name = 'Koa-Error',
            subname,
            message,
            newError;
        if (typeof info === 'string') {
            subname = message = info;
        } else {
            subname = info.subname;
            message = info.message;
        }
        newError = new Error(message);
        newError.name = name;
        newError.subname = subname;

        return newError;
    }

    //error trap
    rootApp.use(function * (next) {
        try {
            yield next;
            if (this.body === undefined) {
                throw genKoaError({
                    subname: 'emptyBody',
                    message: 'BODY doed not generated.'
                });
            }
        } catch (e) {
            if (e.name === 'Koa-Error' && e.subname === 'emptyBody') {
                this.response.status = 404;
                this.body =  ectRenderer.render(
                    'warnning.ect',
                    {
                        message: 'コンテンツが見つかりません。'
                    }
                );
            } else {
                this.response.status = 500;
                this.body =  ectRenderer.render(
                    'error.ect',
                    {
                        message: 'サーバエラー発生。',
                        stack: e.stack
                    }
                );
            }

        }
    });

    // ect render
    rootApp.use(function *(next) {
        var url = this.request.url;
        if (url === '/') {
            this.body =  ectRenderer.render('index.ect', {});
        }
        yield next;
    });

    // hello world
    rootApp.use(mount(
        '/hello',
        koa().use(function* (next) {
            this.body = 'Hello World';
            yield next;
        })
    ));

    // hello world 2
    rootApp.use(mount(
        '/hello/world',
        koa().use(function* (next) {
            // hello を上書き
            this.body = 'Hello, Hello World.';
            yield next;
        })
    ));

    // static
    rootApp.use(mount(
        '/static',
        koa().use(staticDelivery(
            __dirname + '/static'
        ))
    ));

    // static world
    rootApp.use(mount(
        '/static/hello',
        koa().use(function* (next) {
            // static を上書き
            this.body = 'Hello, static World.';
            yield next;
        })
    ));

    // exception test
    rootApp.use(mount(
        '/error_test',
        koa().use(function* () {
            throw new Error('sample Error');
        })
    ));

    // start http service
    (function () {
        var port = 3001;
        rootApp.listen(port);
        console.log('start http service on ' + port);
    }());
}());
