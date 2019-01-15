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
    connection.query("SELECT DISTINCT department_name FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res[0])
        console.log('\x1b[32m')
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].department_name);
        };
        console.log('\x1b[0m');
        // managerMenue();
    });
};




// function viewSales() {
//     // query the database for all items being auctioned
//     connection.query('SELECT DISTINCT department_name FROM products', function (err, results) {
//       if (err) throw err;
//       // once you have the items, prompt the user for which they'd like to bid on
//       inquirer
//         .prompt([{
//             name: "choice",
//             type: "rawlist",
//             choices: function () {
//               var choiceArray = [];
//               for (var i = 0; i < results.length; i++) {
//                 choiceArray.push(results[i].item_name);
//               }
//               return choiceArray;
//             },
//             message: "What auction would you like to place a bid in?"
//           },
//           {
//             name: "bid",
//             type: "input",
//             message: "How much would you like to bid?"
//           }
//         ])
//         .then(function (answer) {
//           // get the information of the chosen item
//           var chosenItem;
//           for (var i = 0; i < results.length; i++) {
//             if (results[i].item_name === answer.choice) {
//               chosenItem = results[i];
//             }
//           }
  
//           // determine if bid was high enough
//           if (chosenItem.highest_bid < parseInt(answer.bid)) {
//             // bid was high enough, so update db, let the user know, and start over
//             connection.query(
//               "UPDATE auctions SET ? WHERE ?",
//               [{
//                   highest_bid: answer.bid
//                 },
//                 {
//                   id: chosenItem.id
//                 }
//               ],
//               function (error) {
//                 if (error) throw err;
//                 console.log("Bid placed successfully!");
//                 start();
//               }
//             );
//           } else {
//             // bid wasn't high enough, so apologize and start over
//             console.log("Your bid was too low. Try again...");
//             start();
//           }
//         });
//     });
//   }