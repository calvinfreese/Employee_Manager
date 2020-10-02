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