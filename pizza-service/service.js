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



var create_pizza = function(pizza_created_event) {

	var pizza = { 'name':pizza_created_event.pizza_name, 'price':pizza_created_event.pizza_price}
	var links = { 'image' : 'http://localhost:3001/image/'+pizza.name}
	pizza._links = links
	pizzas.push(pizza);
}



var subscribe = function(event_type) {

	pubnub.subscribe({
	    channel  : "jrpubsubdemo",
	    callback : function(event) {
  			console.log('got event ', event);
	    	if(event.event_type==event_type) {
  				console.log('will add pizza for ' + event.pizza_name);
	        create_pizza(event)
	      }
	    }
	});
}




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

	var pizza_created_event = { 
		'event_type': 'pizza_created', 
		'pizza_name': req.body.name,
		'pizza_price': req.body.price 
	};

	pubnub.publish({ 
	    channel   : 'jrpubsubdemo',
	    message   : pizza_created_event,
	    callback  : function(e) { console.log( "Success!", e ); },
	    error     : function(e) { console.log( "Failed! Retry publish!", e ); }
	});

  res.sendFile(__dirname + '/index.html');
});



http.listen(3000, function(){
	subscribe('pizza_created');
  console.log('image service suscribed to pizza_created events');
  console.log('pizza service listening on *:3000');
});