function CustomerEventStore() {
	this.pubnub = require('pubnub')({
		publish_key   : 'pub-c-cd240436-3970-4654-8bc6-df767da50619',
		subscribe_key : 'sub-c-e0302386-b12b-11e4-984f-0619f8945a4f'
	});
}

CustomerEventStore.prototype.publish = function(event) {

	this.pubnub.publish({ 
	    channel   : 'jrpubsubdemo',
	    message   : event,
	    callback  : function(e) { console.log( 'Customer Event published successfully!', e ); },
	    error     : function(e) { console.log( 'Error publoishing Customer Event!', e ); }
	});
}

module.exports = exports = new CustomerEventStore();
