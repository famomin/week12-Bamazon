var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
	host: "127.0.0.1",
	port: 3306,

	//your username
	user: "root",

	//your password
	password: "hopmrm2atf",
	database: "bamazonDB"
});

connection.connect (function (err){
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
});

connection.query("Select * FROM products", function (err, res) {
	if (err) throw err;

	for (var i = 0; i < res.length; i++) {
		console.log("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department: " + res[i].department_name +  " | Price per unit: " + res[i].price_to_consumer + " | Quantity Available: " + res[i].stock_quantity);
	}
});

connection.end();