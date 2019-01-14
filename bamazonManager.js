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
    managerMenue();
});

const managerMenue = () => {
    inquirer.prompt({
        name: 'manager_list',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }).then(res => {
        // console.log(res.manager_list);
        switch (res.manager_list) {
            case 'View Products for Sale':
            console.log('View Products for Sale');
            break;
            case 'View Low Inventory':
            console.log('View Low Inventory');
            break;
            case 'Add to Inventory':
            console.log('Add to Inventory');
            break;
            case 'Add New Product':
            console.log('Add New Product');
            break;
        }

        // checkInventory(res.item_id, res.quantity)
    })
};