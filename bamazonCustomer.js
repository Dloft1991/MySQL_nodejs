const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Dlofton2",
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
    console.log("-------");
    console.log("Items for sale");
    console.log("-------");
    console.log("Item #: " + res[0].item_id + "     Product name: " + res[0].product_name + "     Price:$ " + res[0].price);
    console.log("-------");
    startQuestions();
    // connection.end();

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
          buyiPhone();
          break;

        case "2":
          multiSearch();
          break;

        case "3":
          rangeSearch();
          break;

        case "4":
          songSearch();
          break;

        case "5":
          songAndAlbumSearch();
          break;
      }
    });

}

function buyiPhone() {
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
