function Email() {
	this.from = 'jrpubsubdemo@thoughtworks.com';
}

Email.prototype.welcome = function(customer) {
	this.to = customer.email;
	this.subject = 'Welcome ' + customer.name + '!'; 
	this.body = 'Thanks for registering to jrpubsubdemo';
	return this;
}

module.exports = Email;

