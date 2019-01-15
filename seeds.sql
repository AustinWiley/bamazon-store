USE bamazon_DB;
-- products
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'Flannel Shirt', 'clothing', 24.99, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, 'Jeans', 'clothing', 56.99, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, 'Italian 00 Flour', 'grocery', 9.34, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, 'eggs', 'grocery', 5.25, 48);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, 'Insulin', 'pharmacy', 585.76, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, 'Blood Sugar test strips(40 count)', 'pharmacy', 39.24, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, 'Camera Drone', 'electronics', 89.99, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, 'Walk Man casset player', 'electronics', 14.95, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, 'USB drive (16G)', 'electronics', 19.75, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, 'Bell Biv Devoe casset tape', 'muic', 2.99, 8);

--Departments
INSERT INTO departments (department_name, overhead_costs)
VALUES ('clothing', 200);

INSERT INTO departments (department_name, overhead_costs)
VALUES ('grocery', 100);

INSERT INTO departments (department_name, overhead_costs)
VALUES ('pharmacy', 200);

INSERT INTO departments (department_name, overhead_costs)
VALUES ('electronics', 300);