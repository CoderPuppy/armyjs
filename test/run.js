var rocket = require('../'),
    swarm  = rocket.swarm();

swarm.run(0); // Start the swarm (With 0 rockets)

swarm.start(10); // Start 10 rockets