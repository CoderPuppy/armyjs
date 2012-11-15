var Rocket = require('./rocket/rocket'),
    Swarm  = require('./rocket/swarm');

function rocket(swarm) {
    return new Rocket(swarm);
}
rocket.Rocket = Rocket;
rocket.Swarm = Swarm;
rocket.swarm = function swarm() {
    return new Swarm();
};

module.exports = rocket;