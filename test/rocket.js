var rocket = require('../').current;

var repl = require('repl').start({});

repl.context.rocket = rocket;