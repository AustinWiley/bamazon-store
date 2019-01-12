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
    // connection.end();
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
            message: 'How many units of this product would you like to purchase'
        }
    ]).then(res => {
        console.log(res.item_id);
        console.log(res.quantity);
       
        checkInventory(res.item_id, res.quantity)
    })
};

//read items from DB and compare with customer input
function checkInventory(id, quantity) {
    console.log("checking inventory...\n");
    connection.query("SELECT * FROM products WHERE item_id = ? AND stock_quantity >= ?",[id, quantity], function (err, res) {
        if (err) throw err;
        console.log(res)
    });
};




function updateProduct(bid, product) {
    console.log("\nUpdating current Bid...\n");
    var query = connection.query(
        "UPDATE items SET ? WHERE ?",
        [{
                current_bid: bid
            },
            {
                name: product
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            startBidding();
        }
    );
};