const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
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
    //   console.log("-------");
    //     console.log("Items for sale");
    //     console.log("-------");
      for ( i = 0; i < res.length; i++) {
        console.log("Item #: " + res[i].item_id + "     Product name: " + res[i].product_name + "     Price:$ " + res[0].price);
        // console.log("-------");
       
        // connection.end();
      }inquirer
          .prompt([
            {
              type: "text",
              name: "product",
              type: "input",
              message: "What item would you like to buy? (select using item #)"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like?"
              }
          ]).then(function (answer) {
            
                // console.log(res[0].product_name);
                if (answer.quantity < res[0].stock_quantity){
                    let newStock = (res[0].stock_quantity)-(answer.quantity);
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {stock_quantity:newStock}
                       
                    ], function(error) {
                        if(err) throw err;
                        
                    });
                    
                    console.log("Your purchase is completed.");
                    console.log(res[0].stock_quantity);
                }
                else {
                    console.log("There is not enough stock to completed.");
                    displayItems();
                }
                
                
            
          });
      
    });
  connection.end();
  }