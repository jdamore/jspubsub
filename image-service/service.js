var app = require('express')();
var http = require('http').Server(app);
var _ = require('underscore');


var images = [];

var generate_image = function(pizza_name) {
	images.push({'pizza_name':pizza_name, 'pizza_image_url':'http://lorempixel.com/400/200/sports/'+pizza_name+'/'});
}


var subscribe = function(event_type) {

	var pubnub = require('pubnub')({
		  publish_key   : 'pub-c-cd240436-3970-4654-8bc6-df767da50619',
		  subscribe_key : 'sub-c-e0302386-b12b-11e4-984f-0619f8945a4f'
	});

	pubnub.subscribe({
	    channel  : "jrpubsubdemo",
	    callback : function(event) {
  			console.log('got event ', event);
	    	if(event.event_type==event_type) {
  				console.log('will generate image for ' + event.pizza_name);
	        generate_image(event.pizza_name)
	      }
	    }
	});
}




app.get('/image/:pizza_name', function(req, res){
	var image = _.find(images, function(image) { return image.pizza_name==req.param('pizza_name') });
	res.redirect(302, image.pizza_image_url);
});

app.get('/images', function(req, res){
	res.json(images);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


http.listen(3001, function(){
	subscribe('pizza_created');
  console.log('image service suscribed to pizza_created events');
  console.log('image service listening on *:3001');
});