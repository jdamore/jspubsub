var app = require('express')();
var bodyParser 	= require('body-parser')
var http = require('http').Server(app);
var _ = require('underscore');

var eventStore 	= require('./eventstore')("jrpubsubdemo");

app.use(bodyParser.json()); 

var customers = [];

app.get('/', function(req, res) {
  res.send(customers);
});

app.get('/:name', function(req, res) {
  var customer = _.find(customers, function(c) { return req.param('name') === name });
  res.send(customer);
});

app.post('/', function(req, res) {
  customers.push(req.body);
  var event = { 'type':'customer_created', 'data':req.body };
  publish(event);
  res.sendStatus(200);
});

http.listen(3000, function(){
  console.log('customer service listening on *:3000');
});




