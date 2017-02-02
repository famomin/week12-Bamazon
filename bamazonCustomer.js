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

//asking people what item they want to buy
inquirer.prompt([

	//asking for what item they want to buy
	{
		type: "input",
		name: "item",
		message: "Please enter Product ID for the item you want to purchase."
	},

	{
		type: "input",
		name: "quantity",
		message: "Please enter quantity you want you purchase."

	}
]).then(function (user){

	//check if item number exists
	for (var i = 1; i <= res.length; i++){
		if(user.item ===res[i].item_id) {
			
		}	
	}
	
});





