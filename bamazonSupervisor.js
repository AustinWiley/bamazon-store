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
    "GROUP BY  products.department_name"
    , function (err, res) {
        if (err) throw err;
        // console.log(res[0])
        console.log('\x1b[32m')
        for (let i = 0; i < res.length; i++) {
            console.log(res[i]);
        };
        console.log('\x1b[0m');
        // managerMenue();
    });
};