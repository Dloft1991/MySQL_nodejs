const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "
  ",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();


});


function displayItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // console.log(res);
    console.log("-------");
      console.log("Items for sale");
      console.log("-------");
    for ( i = 0; i < res.length; i++) {
      console.log("Item #: " + res[i].item_id + "     Product name: " + res[i].product_name + "     Price:$ " + res[0].price);
      console.log("-------");
     
      // connection.end();
    }
     
    startQuestions();
    

  });

}

/// use of activity 14
function startQuestions() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "product",
        type: "input",
        message: "What item would you like to buy? (select using item #)"
      }
    ]).then(function (answer) {
      switch (answer.product) {
        case "1":
          purchases();
          break;

        case "2":
          purchases();
          break;

        case "3":
          purchases();
          break;

        case "4":
          purchases();
          break;

        case "5":
          purchases();
          break;
        case "6":
          purchases();
          break;
        case "7":
          purchases();
          break;
        case "8":
          purchases();
          break;
        case "9":
          purchases();
          break;
        case "10":
          purchases();
          break;

      }
    });

}

function purchases() {
  inquirer
    .prompt([
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like?"
      }
    ])
    .then(function (answer) {

      connection.query("SELECT stock_quantity FROM  products", function (err, res) {
        if (err) throw err;

       
        function checkQuantity() {
          if (answer.quantity <= res[0].stock_quantity) {
        
            console.log("Your order is complete.");
            console.log(res[0].stock_quantity - answer.quantity);
            
            // show total price
            connection.query("SELECT price FROM  products", function (err, res) {
              if (err) throw err;
              console.log("Your total is: $" + res[0].price * answer.quantity);
            });
            //
            connection.query("SELECT product_name FROM  products", function (err, res) {
              if (err) throw err;
              console.log("Enjoy your new " + res[0].product_name);
            });
          }

          else {
            console.log("Sorry we can not fullfill this order.");
            console.log("Insufficient quantity!");
          }

        }
        checkQuantity();
        // console.log("Quantity: " + res[0].stock_quantity);

        // updateQuantity();
        connection.end();
      });

    });

}
