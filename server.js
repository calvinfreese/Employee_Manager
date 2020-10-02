const inquirer = require('inquirer');
const mysql = require('mysql');
const figlet = require('figlet');


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "",
  
    // Your password
    password: "",
    database: "employee_db"
  });



  connection.connect(function(err) {
    if (err) throw err;
    console.log('connected!');

    figlet('Employee Manager', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        start();
    });

    
  });

  function start() {
    inquirer
      .prompt({
        type: "list",
        message: "Would you like to do?",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "Add an employee",
          "Add a role",
          "Add a department",
          "Update employee role",
        ],
        name: "choice"
      })
      .then(function (answer) {
        switch (answer.choice) {
          case "View all employees":
            allEmployees();
            break;
          case "View all roles":
            allRoles()
            break;
          case "View all departments":
            allDeptartments();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Update employee role":
            updateEmployee();
            break;
        }
      });
  }


function allEmployees() {
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw err;
    console.log(res);
    start();
  });
}

function allRoles() {
  connection.query("SELECT * FROM role", function(err, res){
    if (err) throw err;
    console.log(res);
    start();
  });
}

function allDeptartments() {
  connection.query("SELECT * FROM department", function(err, res){
    if (err) throw err;
    console.log(res);
    start();
  });
}

// function addEmployee() {

// }

// function addRole() {

// }

// function addDepartment() {

// }

// function updateEmployee() {

// }

  

