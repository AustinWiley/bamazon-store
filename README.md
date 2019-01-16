
# Bamazon-Store

## Overview

Bamazon is a CLI Node and MYSQL store-front that you can interact with as a Customer a Manager or a Supervisor. The app uses a database called bamazon_db and contains two tables `products` and `departments`.

## How it works

### Customer View

* Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale.

* The app then prompt users with two messages.

   * The first will ask them the ID of the product they would like to buy.
   * The second message will ask how many units of the product they would like to buy.

* Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs the phrase `Insuffecient product inventory.`, and then prevents the order from going through.

* If the store _does_ have enough of the product it will fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through it shows the customer the total cost of their purchase.
   
### Manager View

* Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store by updating the database.

### Supervisor View

* Node application called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

* When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in the terminal/bash window.

* The `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales` over the two tables in teh database. `total_profit` is calculated on the fly and not stored in any database.

### NPM Packages used

   * [mysql](https://www.npmjs.com/package/mysql)

   * [inquirer](https://www.npmjs.com/package/inquirer)
   
## Watch the Demo 

* Click the link to watch a full Demo of the app. [Bamazon-Store-app-Demo](https://drive.google.com/file/d/10l92vW4SYR_vJq7nfvVAFDxxpcNnxcUF/view)
