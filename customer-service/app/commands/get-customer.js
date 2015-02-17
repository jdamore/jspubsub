
function GetCustomer(command, db) {
	this.command = command;
	this.db = db;
}

GetCustomer.prototype.handle = function() {
	return !this.command.name ? this.db.all() : this.db.get(this.command.name);
}

module.exports = GetCustomer;