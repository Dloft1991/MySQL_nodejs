var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Dlofton2",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
  startQuestions();
  
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("-------");
    console.log("Items for sale");
    console.log("-------");
    console.log("Item #: " + res[0].item_id + "     Product name: " +  res[0].product_name + "     Price:$ " + res[0].price);
    console.log("-------");
    connection.end();
  });
  
}

function startQuestions() {
  inquirer
  .prompt[
      {
      name: "action",
      type: "input",
      message: "What item would you like to buy? (Select using item #)"
    },
    {
      name: "action",
      type: "input",
      message: "How many units would you like?"
    }
  ];
}
