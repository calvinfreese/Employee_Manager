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
  let query = `SELECT a.id, a.first_name, a.last_name, title, salary, name, CONCAT(b.first_name, ' ',b.last_name) as manager
  FROM employee as a
  LEFT JOIN employee as b ON a.manager_id = b.id
  INNER JOIN role ON a.role_id = role.id
  INNER JOIN department ON role.department_id = department.id
  ORDER by a.id;`
  connection.query(query, function(err, res){
    if (err) throw err;
    
    //empty array to push to
    let mainArr = []
   
    // for (i = 0; i < res.length; i++) {
    //    //aligning manager_id to item in managerArr to be able to push it to the mainArr  ----- here vvvv ------
    //   mainArr.push([res[i].id, res[i].first_name, res[i].last_name, res[i].title, res[i].salary, res[i].name, res[i].manager]);
    // }

    res.forEach(el => {
      mainArr.push([el.id, el.first_name, el.last_name, el.title, el.salary, el.name, el.manager])
    });

    console.log(' ');         
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

//add manager names to array for selection
// convert name to id of manager name.
function addEmployee() {
  let query = `SELECT * 
  FROM role
  LEFT JOIN employee ON role.id = employee.role_id`;
  //"SELECT * FROM employee; SELECT * FROM role"
  connection.query(query, function(err, res){
    let roleArr = [];
    let roleUnique = [];
    
    let managerArr = ['None',];

    res.forEach(el => {
      if (el.first_name) {
        managerArr.push(el.first_name + ' ' + el.last_name)
      }
    })
    res.forEach(el => {
      roleArr.push(el.title);
      roleUnique = [...new Set(roleArr)]
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
        choices: roleUnique
      },
      {
        type: 'rawlist',
        name: 'manager',
        message: 'Who does the new employee report to?',
        choices: managerArr
      }
    ])
    .then((answer) =>{
  
      let manager;
      
      
      //If the string value of answer.manager matches the concat value of res.first/last_name = manager is set the value of the id of the matched response.
      for (i = 0; i < res.length; i++) {
        if (answer.manager == res[i].first_name + ' ' + res[i].last_name){
          console.log('Correct Manager Found ' + res[i].id+') ' + res[i].first_name + ' ' + res[i].last_name)
          return addNewEmp(manager = res[i].id);           
        } else if (answer.manager == "None"){
          console.log('No Manager set, logging as null')
          return addNewEmp(answer.manager = null);
        } else {
          console.log('Correct Manager not Found. Iterating through again.')
        }
      }
        
            
      function addNewEmp(mgr) {
        connection.query("INSERT INTO employee SET ?", 
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: roleUnique.indexOf(answer.title) + 1, //need to +1 to align with ID values that start at 1
        manager_id: mgr
      },
      function(err,res){
        if (err) throw err;
        start();
      })
      
      }
    })
  });
}



function addRole() {
  let query = `SELECT role.id, title, salary, department.name 
  FROM role
  RIGHT JOIN department ON role.department_id = department.id;`
  //"SELECT * FROM role; SELECT * FROM department"
  connection.query(query, function(err, res){

    let dept = [];
    let uniqueDept = [];
    //push each item to an array, and then push only the unique items to an array to remove duplicate values.
    res.forEach((el) => {
      dept.push(el.name);
      uniqueDept = [...new Set(dept)]
    });
    
       
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
        type: 'rawlist',
        message: 'Which department is this role in?',
        name: 'deptName',
        choices: uniqueDept
        
      }
    ])
    .then((answer) =>{
      connection.query("INSERT INTO role SET ?", 
      {
        title: answer.roleName,
        salary: answer.roleSal,
        department_id: uniqueDept.indexOf(answer.deptName) + 1 //need to +1 to align with ID values that start at 1

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

  



