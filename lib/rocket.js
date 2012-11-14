var Application = require('./rocket/application');

function rocket() {
	return new Application();
}
rocket.Application = Application;

module.exports = rocket;