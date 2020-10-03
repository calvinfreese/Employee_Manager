const inquirer = require('inquirer');
const mysql = require('mysql');
const figlet = require('figlet');
const cTable = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "",

    // Your password
    password: "",
    database: "employee_db",
    multipleStatements: true
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

//employee.manager_id = employee.id/name

function allEmployees() {
  let query = `SELECT *
  FROM role 
  RIGHT join department ON role.department_id = department.id
  RIGHT JOIN employee ON employee.role_id = role.id 
  ORDER BY employee.id; SELECT a.first_name, CONCAT(b.first_name, ' ', b.last_name) as manager
  FROM employee as a
  LEFT OUTER JOIN employee as b
  ON a.manager_id = b.id; `
  connection.query(query, function(err, res){
    if (err) throw err;
    
    //empty arrays to push to
    let mainArr = []
    let managerArr = []

    //renaming responses to something friendlier to work with
    let allRes = res[0]; // response from SELECT * from role and RIGHT JOINs
    let empRes = res[1]; // response from SELECT * FROM employee concatenation

    for (i = 0; i < empRes.length; i++){
      if (!empRes[i].manager) {
        empRes[i].manager = 'No reporting manager'; // If the value is null or empty, this string is assigned.
        managerArr.push(empRes[i].manager);
      } else {
        managerArr.push(empRes[i].manager);

      }
    }
  
    for (i = 0; i < allRes.length; i++) {
      allRes[i].manager_id = managerArr[i]; //aligning manager_id to item in managerArr to be able to push it to the mainArr  ----- here vvvv ------
      mainArr.push([allRes[i].id, allRes[i].first_name, allRes[i].last_name, allRes[i].title, allRes[i].salary, allRes[i].name, allRes[i].manager_id]);
    }

              
    console.table(['id', 'first_name', 'last_name', 'title', 'salary', 'department', 'manager_id'], mainArr);     
    start();

  })
}

function allRoles() {
  connection.query("SELECT * FROM role", function(err, res){
    if (err) throw err;
    let arr = [];

    res.forEach(el => {
      arr.push([el.title, el.salary])
    });
    console.table(['Title','Salary'], arr);
    start();
  });
}

function allDeptartments() {
  connection.query("SELECT * FROM department ", function(err, res){
    if (err) throw err;
    
    let arr = [];

    res.forEach(el => {
      arr.push([el.name])
    });
    console.table(['Department'], arr);
    start();
  });
}

function addEmployee() {
  connection.query("SELECT * FROM employee; SELECT * FROM role", function(err, res){
    let roleArr = [];
    let managerArr = ['None',];
    res[0].forEach(el => {
      managerArr.push(el.first_name + ' ' + el.last_name)
    })
    res[1].forEach(el => {
      roleArr.push(el.title)
    })
    inquirer
    .prompt([
      {
        type: 'input',
        name:"first_name",
        message: "What is the First Name of the new employee"
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the Last Name of the new employee?'
      },
      {
        type: 'list',
        message: "What is title of the new employee?",
        name: 'title',
        choices: roleArr
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who does the new employee report to?',
        choices: managerArr,
        validate: function(res) {
            if (this !== "None"){
              return res
            } else {
            return res = ''
            }
          }
        }
    ])
    .then((answer) =>{

      
      connection.query("INSERT INTO employee SET ?", 
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: roleArr.indexOf(answer.title) + 1, //need to +1 to align with ID values that start at 1
        manager_id: function(answer){
          if (!managerArr.indexOf(answer.manager)){ //If index is 0 or empty, assign a value of null to be accepted by the database.
            answer.manager = null;
          } else {
            managerArr.indexOf(answer.manager)
          }
          
        }
      },
      function(err,res){
        if (err) throw err;
        start();
      })
    })
  });
}

function addRole() {
  connection.query("SELECT * FROM role; SELECT * FROM department", function(err, res){
    let choiceArr = [];
    res[1].forEach(el => {
      choiceArr.push(el.name)
    })
    inquirer
    .prompt([
      {
        type: 'input',
        name:"roleName",
        message: "What is the name of the new role?"
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'roleSal'
      },
      {
        type: 'list',
        message: 'Which department is this role in?',
        name: 'deptName',
        choices: choiceArr
        
      }
    ])
    .then((answer) =>{
      connection.query("INSERT INTO role SET ?", 
      {
        title: answer.roleName,
        salary: answer.roleSal,
        department_id: choiceArr.indexOf(answer.deptName) + 1 //need to +1 to align with ID values that start at 1

      },
      function(err,res){
        if (err) throw err;
        start();
      })
    })
  });
}

function addDepartment() {
  connection.query("SELECT * FROM department", function(err, res){
    inquirer
    .prompt([
      {
        type: 'input',
        name:"deptName",
        message: "What is the name of the new department?"
      }
    ])
    .then((answer) =>{
      connection.query("INSERT INTO department SET ?", 
      {
        name: answer.deptName
      },
      function(err,res){
        if (err) throw err;
        start();
      })
    })
  });

 
}

// function updateEmployee() {

// }

  

