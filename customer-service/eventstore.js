
function EventStore(channel) {
	this.channel = channel;
	this.pubnub = require('pubnub')({
		publish_key   : 'pub-c-cd240436-3970-4654-8bc6-df767da50619',
		subscribe_key : 'sub-c-e0302386-b12b-11e4-984f-0619f8945a4f'
	});
}


EventStore.prototype.publish = function(event) {
	this.pubnub.publish({ 
	    channel   : this.channel,
	    message   : event,
	    callback  : function(e) { console.log('customer-service: published event ' + event + ' succesfully', e) },
	    error     : function(e) { console.log('customer-service: failed publishing event ' + event, e) },
	});
}

var createEventStore = function(channel) {
	return new EventStore(channel);
}

exports = module.exports = createEventStore;
