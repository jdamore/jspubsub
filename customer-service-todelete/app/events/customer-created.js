function CustomerCreated(event, eventStore) {
	this.event = event;
	this.eventStore = eventStore;
}

CustomerCreated.prototype.publish = function() {

	this.eventStore.publish({ 
	    channel   : 'jrpubsubdemo',
	    message   : this.event,
	    callback  : function(e) { },
	    error     : function(e) { }
	});

}

module.exports = CustomerCreated;