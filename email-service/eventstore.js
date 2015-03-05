var _ = require('underscore');

function EventStore(channel) {
	this.channel = channel;
	this.pubnub = require('pubnub')({
		publish_key   : 'pub-c-cd240436-3970-4654-8bc6-df767da50619',
		subscribe_key : 'sub-c-e0302386-b12b-11e4-984f-0619f8945a4f'
	});
}

EventStore.prototype.subscribe = function(event_type, event_handler) {
	this.pubnub.subscribe({
	    channel  : this.channel,
	    callback : function(event) {
	    	if(event.type===event_type) {
	        event_handler(event.data);
	      }
	    },
	    restore: true
	});
}

EventStore.prototype.history = function(event_type, event_handler) {
	this.pubnub.history({
	    channel  : this.channel,
	    callback : function(history) {
	    	_.each(history[0], function(event) {
		    	if(event.type===event_type) {
		        event_handler(event.data);
		      }
	      });
	    }
	});
}

var createEventStore = function(channel) {
	return new EventStore(channel);
}

exports = module.exports = createEventStore;

