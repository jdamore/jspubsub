
var Customer = require('../model/customer-model');

function newCustomer(cerateCustomerCommand) {
	return new Customer(cerateCustomerCommand.name, cerateCustomerCommand.email);
}

function CreateCustomer(command, db) {
	this.command = command;
	this.db = db;
}

CreateCustomer.prototype.handle = function() {
	this.db.add(newCustomer(this.command));
}

module.exports = CreateCustomer;