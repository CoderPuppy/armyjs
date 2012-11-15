var engine  = require('engine.io'),
    connect = require('connect'),
    http    = require('http'),
    https   = require('https');

var Swarm = require('./swarm');

var Rocket = (function() {
	function Rocket(swarm) {
        if(!(this instanceof Rocket)) return new Rocket(swarm);
        
        this.swarm = Swarm.from(swarm);
        
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
                var res = plugin(this);
				if(plugin.arity == 3) {
					this.app.use(res);
				} else if(plugin.arity == 1) {
					this.plugins.push(plugin);
				}

				return this;
			};
		}).call(this.prototype);

		return this;
	}).call(Rocket);
})();

module.exports = Rocket;