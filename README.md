Sample nubsub application for microservices tech talk

# JavaScript Services Event Stream Example
Simple example of using event-based collaboration between two web services: the cuwtomer and email services.
The services are built using [Node Express](http://expressjs.com), and use [PubNub](www.pubnub.com), a JavaScript event stream based on WebSockets.

#To run the customer service:
```
    git clone https://github.com/jdamore/jspubsub
    cd customer-service
    sudo npm install
    node service
    http://localhost:3000
```

#Customer service API
```
- Add a customer: 			POST http://localhost:3000/ {name:{customer_name}, email:{customer_email}}
- Select all customers: 	GET http://localhost:3000/
- Select one customer: 		GET http://localhost:3000/{customer_name}
```

#To run the email service:
```
    git clone https://github.com/jdamore/jspubsub
    cd email-service
    sudo npm install
    node service
    http://localhost:3001
```	

#Email service API
```
- Select all emails: 	GET http://localhost:3001/
- Select one email: 	GET http://localhost:3001/{email}
```

#Test the integration
Run the add_customer.sh script. It will POST a new customer to the customer service, and check an welcome email has automatically been sent, because the customer_created event has been published.


