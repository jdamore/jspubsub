function start() {

	var app 				= require('express')();
	var bodyParser 	= require('body-parser')
	var http 				= require('http').Server(app);
	var _ 					= require('underscore');

	var customerDb 					= require('./store/customer-db');
	var customerEventStore 	= new require('./store/customer-eventstore');

	var CreateCustomerCommand	= require('./commands/create-customer');
	var GetCustomerCommand 		= require('./commands/get-customer');
	var CustomerCreatedEvent	= require('./events/customer-created');

	app.use(bodyParser.json()); 

	app.get('/', function(req, res) {
	  var customers = new GetCustomerCommand({}, customerDb).handle();
	  res.send(customers);
	});

	app.get('/:name', function(req, res) {
	  var customer = new GetCustomerCommand({ 'name':req.param('name')}, customerDb).handle();
	  res.send(customer);
	});

	app.post('/', function(req, res) {
	  new CreateCustomerCommand(req.body, customerDb).handle();
	  new CustomerCreatedEvent(req.body, customerEventStore).publish();
	  res.send(200);
	});

	http.listen(3000, function(){
	  console.log('customer service listening on *:3000');
	});

}


module.exports = start;