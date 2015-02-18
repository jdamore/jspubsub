var _ = require('underscore');

function CustomerDb() {
  this.customers = [];
}

CustomerDb.prototype.add = function(customer) {
	this.customers.push(customer);
}

CustomerDb.prototype.all = function() {
	return this.customers;
}

CustomerDb.prototype.get = function(name) {
	return _.find(this.customers, function(c) { return c.name === name });
}

module.exports = exports = new CustomerDb();