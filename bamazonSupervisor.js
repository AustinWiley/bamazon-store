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
    supervisorMenue();
});

const supervisorMenue = () => {
    inquirer.prompt({
        name: 'manager_list',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Product Sales by Department', 'Create New Department', 'Add to Inventory', 'Add New Product', 'EXIT']
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