var engine  = require('engine.io');
var connect = require('connect');
var http    = require('http');
var https   = require('https');

// var Army = require('./army');
var state = require('./state');

var Soldier = (function() {
	function Soldier(army) {
		if(!(this instanceof Soldier)) return new Soldier(army);
		
		this.army = army;
		
		this.plugins = [];
		this.options = {

		};
		
		this.app = connect();
	}

	return (function() {
		(function() {
			this.set = function set(name, val) {
				this.options[name] = val;

				return this;
			};

			this.get = function get(name) {
				return this.options[name];
			};
			
			this.server = function server(isHttps) {
				if(isHttps) {
					return this._httpsServer || (this._httpsServer = https.createServer(this.get('https'), this.app));
				} else {
					return this._httpServer || (this._httpServer = http.createServer(this.app));
				}
			};

			this.start = function start(https) {
				if(https && !this.get('https')) return;

				state.current = this;
				
				var server = this._server(https), port;

				if(https) {
					port = this.get('https port');
				} else {
					port = this.get('port');
				}

				server.listen(this.get('listen interface'), port);
				
				this.engine = engine.listen(server);
				
				if(!https) this.start(true);
				
				this.emit('start');

				return server;
			};

			this.handle = function handle() {
				return this.app.apply(this.app, arguments);
			};

			this.use = function use(plugin) {
				this.plugins.push(plugin);

				if(plugin.arity == 1)
					plugin = plugin(this);

				if(plugin.arity == 3 || plugin.arity == 2)
					this.app.use(plugin);

				return this;
			};
		}).call(this.prototype);

		return this;
	}).call(Soldier);
})();

module.exports = Soldier;