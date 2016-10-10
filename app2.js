/*eslint no-console: 0*/
(function (){
    'use strict';
    const
        koa = require('koa'),
        route = require('koa-route'),
        https = require('https'),
        fs = require('fs'),
        options = {
            key: fs.readFileSync('keys/decrypt_server.key'),
            cert: fs.readFileSync('keys/server.crt')
        },

        port = 4431,
        app = koa();

    app.use(route.get('/', function *() {
        this.body = 'hello world';
    }) );

    https.createServer(options, app.callback()).listen(port);
    console.log('Server running at https://127.0.0.1:' + port);
}());
