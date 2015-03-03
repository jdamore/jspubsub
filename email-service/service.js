var app = require('express')();
var http = require('http').Server(app);
var _ = require('underscore');

var Email = require('./email');
var eventStore = require('./eventstore')("jrpubsubdemo");

var emails = [];

app.get('/:email', function(req, res){
	var email = _.find(emails, function(e) { return e.to==req.param('email') });
	res.send(email);
});

app.get('/', function(req, res){
	res.send(emails);
});


http.listen(3001, function() {

	// eventStore.history('customer_created', function(customer) {
	// 	if(!hasWelcomeEmail(customer)) {
	// 		sendWelcomeEmail(customer);
	// 	}
	// });

 	eventStore.subscribe('customer_created', function(customer) {
		sendWelcomeEmail(customer);
	});

  console.log('email service listening on *:3001');

});




function sendWelcomeEmail(customer) {
	var email = new Email().welcome(customer);
	emails.push(email);
	console.log('Welcome email sent to', customer.email);
}

function hasWelcomeEmail(customer) {
	_.find(emails, function(e) { return e.to==customer.email })!==undefined;
}