DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTEGER NOT NULL auto_increment,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INTEGER NOT NULL auto_increment,
  department_name VARCHAR(100) NULL,
  overhead_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);