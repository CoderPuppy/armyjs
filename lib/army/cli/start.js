module.exports = function() {
	this.name('start')
	    .title('Start an army')
	    .helpful()
	    .opt()
	    	.name('soldiers')
	    	.title('How many soldiers to start')
	    	.short('n')
	    	.long('soldiers')
	    	.def(1)
	    	.end();
};