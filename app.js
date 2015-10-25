/*eslint no-console: 0*/

(function () {
    'use strict';

    var koaService = require('./koaFrame/koaService'),

        service,
        ectRenderer,
        toppageLinks = []; // top page link info for ect render

    // init
    service = koaService.create();
    ectRenderer = koaService.createEctRenderer( __dirname + '/views');

    // root
    service.app.use(function *(next) {
        var url = this.request.url;
        if (url === '/') {
            this.body =  ectRenderer.render('index.ect', {
                toppageLinks: toppageLinks
            });
        }
        yield next;
    });
    toppageLinks.push({
        url: '/',
        title: 'TOP',
        comment: 'root + ect render. (this page)'
    });

    // hello world
    service.map(
        '/hello',
        function* (next) {
            this.body = 'Hello World';
            yield next;
        }
    );
    toppageLinks.push({
        url: '/hello',
        title: 'hello world',
        comment: 'hello world'
    });

    // hello world 2
    service.map(
        '/hello/world',
        function* (next) {
            // hello を上書き
            this.body = 'Hello, Hello World.';
            yield next;
        }
    );
    toppageLinks.push({
        url: '/hello/world',
        title: 'hello world2',
        comment: '/hello 配下に追加'
    });

    // static
    service.map(
        '/static',
        koaService.createStaticDelivery(
            __dirname + '/static'
        )
    );
    toppageLinks.push({
        url: '/static/test.html',
        title: 'static file',
        comment: 'static file 公開'
    });
    toppageLinks.push({
        url: '/static/no.html',
        title: 'static file not found',
        comment: 'static file エラー'
    });

    // static world
    service.map(
        '/static/hello',
        function* (next) {
            // static を上書き
            this.body = 'Hello, static World.';
            yield next;
        }
    );
    toppageLinks.push({
        url: '/static/hello',
        title: 'static hello',
        comment: '/static配下で再マップ'
    });

    // exception test
    service.map(
        '/error_test',
        function* () {
            throw new Error('sample Error');
        }
    );
    toppageLinks.push({
        url: '/error_test',
        title: 'exception',
        comment: '例外発生'
    });
    toppageLinks.push({
        url: '/no_mapping',
        title: 'nomap',
        comment: 'マウントなし'
    });

    // start http service
    service.start(3001).then(function (srvc) {
        console.log('start http service on ' + srvc.port);
    });

}());
