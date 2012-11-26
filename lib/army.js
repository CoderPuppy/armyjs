var util   = require('util');
var events = require('events');
var crdt   = require('crdt');

var Soldier = require('./army/soldier');
var state   = require('./army/state');
var cli     = require('./army/cli');

var Army = (function() {
	function Army() {
		this.soldiersDoc = new crdt.Doc();
		this.soldiers    = {};
	}
	util.inherits(Army, events.EventEmitter);

	return (function() {
		(function() {
			
		}).call(this.prototype);

		return this;
	}).call(Army);
})();

function army() {
	return new Army();
}

exports = module.exports = army;
exports.Army = Army;

exports.cli = cli;