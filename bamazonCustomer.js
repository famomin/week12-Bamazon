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
	shop()
});


function shop (){ 

	connection.query("Select * FROM products", function (err, res) {
		if (err) throw err;

		for (var i = 0; i < res.length; i++) {
			console.log("Product ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department: " + res[i].department_name +  " | Price per unit: " + res[i].price_to_consumer + " | Quantity Available: " + res[i].stock_quantity);
		}
	

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
			//starting with for loop to loop thru all items ids
			for (var i = 1; i <= res.length; i++) {

				//checking if user input item id matches database or not
				if(parseInt(user.item) ===res[i].item_id) {

					//if items id matches, then check if enough quantity is available or not.
					if(res[i].stock_quantity >= parseInt(user.quantity)) {
						console.log("You bought " + parseInt(user.quantity) + " " + res[i].product_name);
						console.log("Your total for this purchase is $" + parseInt(user.quantity)*res[i].price_to_consumer)
					}

					//if not enough quanitty then say no enough quantity.
					else {
						console.log("Not Enough left in stock.");
					}

				}

				// //if user inpute item  id does not match then error.
				// else{
				// 	console.log("Product Id Invalid")
				// }	
			}
			
		});
	});


}






