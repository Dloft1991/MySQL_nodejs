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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
  
  
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("-------");
    console.log("Items for sale");
    console.log("-------");
    console.log("Item #: " + res[0].item_id + "     Product name: " +  res[0].product_name + "     Price:$ " + res[0].price);
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
      name: "action",
      type: "input",
      message: "What item would you like to buy? (select using item #)"
    }
  ]).then(function(answer) {
    switch (answer.action) {
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
      name: "item",
      type: "input",
      message: "How many units would you like?"
    }
  ])
  .then(function(answer) {

    

                           //stock_quantity
    connection.query("SELECT item_id FROM products", function(err, res) {
      if (err) throw err;
     
      function checkQuantity() {
                                  //answer.item
        if (res[0].stock_quantity < answer.item) {
          console.log("Sorry we can not fullfill this order.");
          console.log("Insufficient quantity!");
        }
        else {
          var update = "UPDATE products SET stock_quantity = " + (res[0].stock_quantity - answer.item) + " WHERE item_id = " + type;


          connection.query(update, function(err, res) {
              if (err) throw err;
              console.log("Your order is complete.");
              console.log(res[0].stock_quantity - answer.item);

          })
        }
        
      }
      checkQuantity();
        // console.log("Quantity: " + res[0].stock_quantity);
     
      // updateQuantity();
       connection.end();
    });
    
  });
  
}
