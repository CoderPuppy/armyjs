var coa = require('coa');

function cli() {
	return coa.Cmd()
		.name('army')
		.title('Army - You give the orders')
		.helpful()
		// .completable()
		.opt()
			.short('v')
			.long('version')
			.only()
			.flag()
			.apply(version)
			.end()
		.cmd()
			.helpful()
			.apply(version)
			.end()
		.cmd().apply(require('./cli/start')).end()
		.cmd().apply(require('./cli/stop')).end();
}

function version() {
	this.name('version')
	    .title("Print army's version")
	    .act(function(opts) {
	    	return require('../../package.json').version;
	    });
}

exports = module.exports = cli;