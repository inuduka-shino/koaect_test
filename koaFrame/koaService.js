/*eslint no-console: 0*/

module.exports = (function () {
    'use strict';
    var koa = require('koa'),
        mount = require('koa-mount'),
        ectModule = require('ect'),
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
    function setErrorHandling(context) {
        var app = context.app;

        app.use(function * (next) {
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
    }

    function start(context, port) {
        var app = context.app;

        context.port = port;
        app.listen(port);

        return Promise.resolve(context);
    }

    function map(context, point, handler) {
        var app = context.app,
            subApp = koa();

        return app.use(mount(
            point,
            subApp.use(handler)
        ));
    }


    function init() {
        var app =  koa(),
            context = {
                app: app
            };

        setErrorHandling(context);

        return {
            app: app,
            start: start.bind(null, context),
            map: map.bind(null, context)
        };
    }

    return {
        init: init
    };

}());
