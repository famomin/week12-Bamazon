//adding dependencies	
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//creating connection with mySQL database
var connection = mysql.createConnection ({
	host: "127.0.0.1",
	port: 3306,

	// username, password and name of database
	user: "root",
	password: "hopmrm2atf",
	database: "bamazonDB"
});

//connecting to the database, and starting bamazon app
connection.connect (function (err){
	if (err) throw err;
	startBamazon();
});


//startBamazon function
function startBamazon (){ 

	//seleting products from the table, and showing thing to the user
	connection.query("Select * FROM products", function (err, res) {
		if (err) throw err;

		// instantiate
		var table = new Table({
		    head: ['Product ID', 'Product Name', 'Department', 'Price per item', 'Quantity Left' ], 
		    colWidths: [25, 50, 35, 25, 25]
		});

		for (var i = 0; i < res.length; i++) {
			table.push ([
				res[i].item_id, 
				res[i].product_name,
				res[i].department_name,
				res[i].price_to_consumer,
				res[i].stock_quantity
			]
			);
		}
		console.log(table.toString());

		//asking people what item they want to buy
		inquirer.prompt([

			//asking for what item they want to buy
			{
				type: "input",
				name: "item",
				message: "Please enter Product ID for the item you want to purchase."
			},

			//asking for quantity they want to buy
			{
				type: "input",
				name: "quantity",
				message: "Please enter quantity you want you purchase."

			}
		]).then(function (user){

			//check if item number exists
			//starting with for loop to loop thru all items ids
			for (var i = 1; i <= res.length; i++) {

				// // //if user inpute item  id does not match then error.
				// if (parseInt(user.item) > math.max(res)) {
				// 	console.log("Product Id Invalid");
				// 	process.exit();
				// }

				//checking if user input item id matches database or not
				if(parseInt(user.item) ===res[i].item_id) {

					//if items id matches, then check if enough quantity is available or not.
					if(res[i].stock_quantity >= parseInt(user.quantity)) {

						console.log("You bought " + parseInt(user.quantity) + " " + res[i].product_name);
						console.log("Your total for this purchase is $" + parseInt(user.quantity)*res[i].price_to_consumer);
						
						//updating quantity on database
						connection.query ("UPDATE products SET ? WHERE ?", 
							[ { stock_quantity : res[i].stock_quantity-user.quantity}, { item_id: res[i].item_id } ]);

						process.exit();
					}

					//if not enough quanitty then say not enough quantity.
					else {
						console.log("Not Enough left in stock.");
						process.exit();
					}

				}

			} // closing for loope		
		}); //closing .then(function) callback
	}); //closing query from database.
} //closing startBamazon 