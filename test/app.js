var rocket = require('../');

var app = rocket()
              .set('root', __dirname);

var repl = require('repl').start({});

repl.context.rocket = rocket;
repl.context.app = app;