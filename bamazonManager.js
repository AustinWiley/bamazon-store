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
    managerMenue();
});

const managerMenue = () => {
    inquirer.prompt({
        name: 'manager_list',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'EXIT']
    }).then(res => {
        // do what was selected
        switch (res.manager_list) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'EXIT':
                connection.end();
        };
    });
};

const viewProducts = () => {
    console.log("\nSelecting all products...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log('\x1b[32m')
        for (let i = 0; i < res.length; i++) {
            console.log(`Item_ID: ${res[i].item_id} || ${res[i].product_name} || Price: $${res[i].price} || Stock quantity: ${res[i].stock_quantity}`);
        };
        console.log('\x1b[0m');
        managerMenue();
    });
};

const lowInventory = () => {
    console.log("\nSelecting all products with low inventory...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let lowStock = 0;
        console.log('\x1b[32m')
        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                lowStock++;
                console.log(`Item_ID: ${res[i].item_id} || ${res[i].product_name} || Price: $${res[i].price} || Stock quantity: ${res[i].stock_quantity}`);
            }
        };
        console.log("\x1b[31m" + lowStock + "\x1b[32m Items with low inventory\x1b[0m\n")
        managerMenue();
    });
};

const addInventory = () => {
    inquirer.prompt([{
            name: 'item_id',
            type: 'input',
            message: 'Enter the item ID for product you would like to undate Inventory'
        },
        {
            name: "quantity",
            type: 'input',
            message: 'How many units would you like to add to inventory',
            validate: function (input) {
                if (isNaN(input)) {
                    return 'Enter a number';
                } else {
                    return true;
                }
            }
        }
    ]).then(res => {
        var query = connection.query(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
            [res.quantity, res.item_id],
            function (err, res) {
                if (res.affectedRows <= 0 || res == undefined) {
                    console.log()
                    console.log('\x1b[31mSomething went wrong. . . . .Did you enter a valid Item ID?\x1b[0m\n')
                } else if (res.affectedRows >= 1) {
                    console.log('\n\x1b[32mINVENTORY UPDATED!!!\x1b[0m\n')
                } else {
                    console.log('\x1b[31mSomething went wrong. . . . .\x1b[0m\n')
                }
                managerMenue();
            }
        );

    })
};

const addProduct = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter poroduct name'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter product Department'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Enter Price',
            validate: function (input) {
                if (isNaN(input)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter inventory quantity',
            validate: function (input) {
                if (isNaN(input)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(res => {
        console.log(res.quantity);
        connection.query(
            'INSERT INTO products SET ?', {
                product_name: res.name,
                department_name: res.department,
                price: res.price,
                stock_quantity: res.quantity
            },
            function (err) {
                if (err) throw err;
                console.log('\n\x1b[32mPRODUCT ADDED!!!\x1b[0m\n')
                managerMenue();
            }
        );
    });
};
