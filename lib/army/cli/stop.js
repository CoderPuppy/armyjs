module.exports = function(cmd) {
	this.name('stop')
	    .title('Stop an army')
	    .helpful()
	    .arg()
	    	.name('army')
	    	.title('What army to stop')
	    	.end();
};