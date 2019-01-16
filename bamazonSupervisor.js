const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');

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
        name: 'supervisor_list',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Product Sales by Department', 'Create New Department', 'EXIT']
    }).then(res => {
        // do what was selected
        switch (res.supervisor_list) {
            case 'View Product Sales by Department':
                viewSales();
                break;
            case 'Create New Department':
                createDepartment();
                break;
            case 'EXIT':
                connection.end();
        };
    });
};

const viewSales = () => {
    console.log("\nSelecting all departments...");
    connection.query("SELECT departments.department_id, departments.department_name, " +
    "departments.overhead_costs, " +
    "SUM(product_sales) AS product_sales, " +
    "(SUM(product_sales) - departments.overhead_costs) AS profit " +
    "FROM  products " +
    "CROSS JOIN departments " +
    "WHERE products.department_name =departments.department_name " +
    "GROUP BY  department_id, products.department_name"
    , function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['department_id', 'department_name', 'overhead_cost', 'product_sales', 'profit']
          , colWidths: [15, 15, 15, 15, 15]
        });
        for (let i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].product_sales, res[i].profit]
            );
        };
        console.log(table.toString());
        supervisorMenue();
    });
};

const createDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department name'
        },
        {
            type: 'input',
            name: 'costs',
            message: 'Enter overhead costs for department',
            validate: function (input) {
                if (isNaN(input)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(res => {
        connection.query(
            'INSERT INTO departments SET ?', {
                department_name: res.department,
                overhead_costs: res.costs
            },
            function (err) {
                if (err) throw err;
                console.log('\n\x1b[32mDepartment ADDED!!!!\x1b[0m\n')
                supervisorMenue();
            }
        );
    });
};