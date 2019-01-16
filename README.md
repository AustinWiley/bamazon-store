
# Bamazon-Store

## Overview

Bamazon is a CLI Node and MYSQL store front that you can interact with as a Customer a Manager or a Supervisor.  
The app will take in orders from customers and deplete stock from the store's inventory.  The Managers app will handle requests to view inventory or make changes to products and inventory.  The Supervisor app can view sales and profit and add departments. App uses a database called bamazon_db and contains two tables `products` and `departments`.

## Instructions

### Customer View

1. Node application called `bamazonCustomer.js`. Uses a MySQL Database called `bamazon`.

2. there is a Table inside of that database called `products`.

3. The products table contains each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)
   
   * product_sales (price of the product multiplied by the quantity purchased)

4. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

5. The app then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

6. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase like `Insufficient quantity!`, and then prevent the order from going through.
   
   * If not, the app logs a phrase like `Insufficient quantity!`, and then prevent the order from going through.

7. If the store _does_ have enough of the product it will fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through it shows the customer the total cost of their purchase.

### Manager View

* a Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.

### Supervisor View

1. uses a MySQL table called `departments`. Table includes the following columns:

   * department_id

   * department_name

   * over_head_costs

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in the terminal/bash window.

5. The `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` is not stored in any database.

### NPM Packages used

   * [mysql](https://www.npmjs.com/package/mysql)

   * [inquirer](https://www.npmjs.com/package/inquirer)
   
## Watch the Demo 

* Click the link to watch a full Demo of the app. [Bamazon-Store-app-Demo](https://drive.google.com/file/d/10l92vW4SYR_vJq7nfvVAFDxxpcNnxcUF/view)
