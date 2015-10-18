/*eslint no-console: 0*/

(function () {
    'use strict';

    var koaService = require('./koaFrame/koaService'),
        staticDelivery = require('koa-static'),
        ectModule = require('ect'),

        ectRenderer = ectModule({
            watch: true,
            root: __dirname + '/views',
            ext : '.ect'
        }),

        service;

    service = koaService.init();

    // ect render
    service.app.use(function *(next) {
        var url = this.request.url;
        if (url === '/') {
            this.body =  ectRenderer.render('index.ect', {});
        }
        yield next;
    });

    // hello world
    service.map(
        '/hello',
        function* (next) {
            this.body = 'Hello World';
            yield next;
        }
    );

    // hello world 2
    service.map(
        '/hello/world',
        function* (next) {
            // hello を上書き
            this.body = 'Hello, Hello World.';
            yield next;
        }
    );

    // static
    service.map(
        '/static',
        staticDelivery(
            __dirname + '/static'
        )
    );

    // static world
    service.map(
        '/static/hello',
        function* (next) {
            // static を上書き
            this.body = 'Hello, static World.';
            yield next;
        }
    );

    // exception
    service.map(
        '/error_test',
        function* () {
            throw new Error('sample Error');
        }
    );

    // start http service
    service.start(3001).then(function (srvc) {
        console.log('start http service on ' + srvc.port);
    });

}());
