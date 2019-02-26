DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity VARCHAR (100) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "electronics", 1000, 104),
 ("Samsung", "electronics", 900, 20),
 ("Beats Wireless", "electronics", 399.99, 55),
 ("Charging Pad", "electronics", 29.95, 22),
 ("AirPods", "electronics", 129.99, 99),
 ("Headphones", "electronics", 45.45, 33),
 ("iPad", "electronics", 899, 77),
 ("MacBook Pro", "electronics", 1400, 89),
 ("HomePod", "electronics", 399, 44),
 ("Amazon Alexa", "electronics", 56.98, 10);
