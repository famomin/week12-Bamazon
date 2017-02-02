CREATE DATABASE IF NOT EXISTS bamazonDB;

USE bamazonDB;

CREATE TABLE IF NOT EXISTS products (
item_id INTEGER(11) UNSIGNED AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100),
price_to_consumer FLOAT(10,2),
stock_quantity  INTEGER(10),
PRIMARY KEY (item_id));