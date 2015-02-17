
var customers = [];

function Customer(name, email) {
	this.name = name;
	this.email = email;
}

Customer.prototype.save = function() {
	customers.push(this);
}

Customer.prototype.all = function() {
	return customers;
}

module.exports = Customer;
