var app = require('express')();
var bodyParser = require('body-parser')
var http = require('http').Server(app);
var _ = require('underscore');

app.use(bodyParser.json()); 

var pubnub = require('pubnub')({
	  publish_key   : 'pub-c-cd240436-3970-4654-8bc6-df767da50619',
	  subscribe_key : 'sub-c-e0302386-b12b-11e4-984f-0619f8945a4f'
});

var pizzas = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/pizzas', function(req, res){
	res.json(pizzas);
});

app.get('/pizza/:pizza_name', function(req, res){
	res.json(_.find(pizzas, function(pizza) { return pizza.name==req.param('pizza_name') }));
});


app.post('/', function(req, res) {

	console.log(req.body);

	var pizza = req.body;
	// var links = { 'image' : 'http://localhost:3001/image/'+pizza.name}
	// pizza.links = links
	pizzas.push(pizza);

	var pizza_created_event = { 
		'event_type': 'pizza_created', 
		'pizza_name': req.body.name,
		'pizza_price': req.body.price 
	};

	pubnub.publish({ 
	    channel   : 'jrpubsubdemo',
	    message   : pizza_created_event,
	    callback  : function(e) { console.log( "SUCCESS!", e ); },
	    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
	});

  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('pizza service listening on *:3000');
});