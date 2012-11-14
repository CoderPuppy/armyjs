var engine  = require('engine.io'),
    connect = require('connect'),
    http    = require('http'),
    https   = require('https');

var Application = (function() {
	function Application() {
		this.plugins = [];
		this.options = {

		};

		this.mw = connect();
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

			this.connect = function connect() {
				return connect()
				           .use(connect.static(this.get('root')))
				           .use(this.mw);
			}

			this.server = function server(httpsOptions) {
				if(httpsOptions) {
					return https.createServer(httpsOptions, this.connect());
				} else {
					return http.createServer(this.connect());
				}
			};

			this.listen = function listen() {
				var server = this.server();

				server.listen.apply(server, arguments);

				return server;
			};

			this.handle = function handle() {
				return this.app.apply(this.app, arguments);
			};

			this.use = function use(plugin) {
				if(plugin.arity == 3) {
					this.mw.use(plugin);
				} else if(plugin.arity == 1) {
					this.plugins.push(plugin);
					plugin(this);
				}

				return this;
			};
		}).call(this.prototype);

		return this;
	}).call(Application);
})();

module.exports = Application;