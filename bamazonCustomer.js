const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});

//make connection with DB
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
    console.log("connected")
    showProducts();
});

// list all current product
const showProducts = () => {
    console.log("Selecting all products...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log('\n\x1b[32m')
        for (let i = 0; i < res.length; i++) {
            console.log(`Item_ID: ${res[i].item_id} || ${res[i].product_name} || Price: $${res[i].price}`);
        };
        console.log('\x1b[0m');
        startShopping();
    });
}

const startShopping = () => {
    inquirer.prompt([{
            name: 'item_id',
            type: 'input',
            message: 'Enter an item by its ID number to purchase'
        },
        {
            name: "quantity",
            type: 'input',
            message: 'How many units of this product would you like to purchase',
            validate: function (input) {
                if (isNaN(input)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(res => {
        checkInventory(res.item_id, res.quantity)
    });
};

//read items from DB and compare with customer input
const checkInventory = (id, quantity) => {
    console.log("checking inventory...\n");
    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        var delayInMilliseconds = 3000; //3 seconds
        if (err) throw err;

        if (res.length <= 0 || res == undefined) {
            console.log("\x1b[31mPRODUCT NOT FOUND\x1b[0m")
            //3 second delay
            setTimeout(function () {
                showProducts();
            }, delayInMilliseconds);
          //if there is enough enventory then update remaining inventory and product_sales  
        } else if (res[0].stock_quantity >= quantity) {
            let purchaseTotal = res[0].price * quantity;
            console.log(`\n\x1b[32mORDER PLACED. Your total is $${purchaseTotal}\x1b[0m`)
            //3 second delay
            let newQuantity = res[0].stock_quantity - quantity;
            let productSales = res[0].product_sales + purchaseTotal;
            setTimeout(function () {
                updateProductDB(id, newQuantity, productSales);
            }, delayInMilliseconds);
        } else {
            console.log(`\x1b[31mInsuffecient product inventory. Only ${res[0].stock_quantity} units in stock\x1b[0m`);
            //3 second delay
            setTimeout(function () {
                showProducts();
            }, delayInMilliseconds);
        };
    });
};

//Update the products table the bamazon database.
const updateProductDB = (id, newQuantity, productSales) => {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: newQuantity,
            product_sales: productSales
        },
        {
            item_id: id
        }],
        function (err, res) {
            // console.log(res.affectedRows + " products updated!\n");
            showProducts();
        }
    );
};