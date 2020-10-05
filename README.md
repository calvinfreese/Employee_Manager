# Employee Manager

#### Table of Contents
  * [Description](#Description)
  * [Installation](#Installation)
  * [Screenshots](#Screenshots)
  * [Credits](#Credits)
  * [License](#License)

## Description
Use this application to manage your company's employees, roles, and departments. 
Employee Manager uses a series of CLI prompts that will kick off queries to the MySQL database "employee_db" based on the user's input.

#### Prompts
1. * View all employees.
2. * View all roles.
3. * View all departments.
4. * Add an employee.
5. * Add a role.
6. * Add a department.
7. * Update an employee's role.
8. * Update an employee's reporting manager.
9. * View employees by manager.

See [Screenshots](#Screenshots) for examples.
 
## Installation
#### Technologies Used
* HTML
* JavaScript
* [MySQL](https://www.mysql.com/) & [MySQL Workbench](https://www.mysql.com/products/workbench/)
* [Bootstrap](https://getbootstrap.com/)
* [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/package/npm)
* [Visual Studio Code](https://code.visualstudio.com/)
* [cmder](https://cmder.net/)

#### Steps
1. * Start by entering the following in your terminal: `Git clone https://github.com/whackingMUFN/Employee_Manager.git`

2. * Change directory to `Employee_Manager` and enter `npm install` into your terminal. This will install all package dependencies.

3. * Add node_modules to .gitignore.

4. * Create a `config.js` file based on the template [here](./config/config.js.example).
    * If file `config.js` is created in another location other than the parent folder, remember to update `server.js` `const credentials = require('./config')` with the new relative path.
    * Replace `<ID>` in the `user` and `password` fields in `config.js` with the credential information for the database.

5. * Copy Database and Table setup from `./db/scehma.sql`
        * Paste into MySQL Workbench and execute.
6. * Copy table data from `./db/employeeSeed.sql` 
        * Paste into MySQL and execute only the `INSERT INTO ...  VALUES (...)` information code blocks for each table. This can be done by selecting/highlighting the desired code blocks and clicking the lightning bolt.

* Start the application by running `npm start`



## Screenshots
#### Employee Manager Tour - View All Employees/Roles/Departments
![Tour](./Assets/imgs/viewAll.gif)

#### Add Employee
![Tour](./Assets/imgs/addEmployee.gif)

#### Add Role
![Tour](./Assets/imgs/addRole.gif)

#### Add Department
![Tour](./Assets/imgs/addDepartment.gif)

#### Update Employee Role
![Tour](./Assets/imgs/updateRole.gif)

#### Update Employee Manager
![Tour](./Assets/imgs/updateManager.gif)

## Credits
This assignment was provided by Trilogy Education Services. Code was developed based on in class activities and lectures, [MDN](https://developer.mozilla.org/en-US/) Reference Documents for JavaScript syntax, [JSHint](https://jshint.com/) for JavaScript validation, [mysqltutorial](https://www.mysqltutorial.org/basic-mysql-tutorial.aspx) for reference documentation and examples, and various other online resources. 

## License

[License](LICENSE)
MIT &copy; 2020 Calvin Freese
