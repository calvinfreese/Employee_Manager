-- View All (allEmployees() in server.js)
SELECT a.id, a.first_name, a.last_name, title, salary, name, CONCAT(b.first_name, ' ',b.last_name) as manager
FROM employee as a
LEFT JOIN employee as b ON a.manager_id = b.id
INNER JOIN role ON a.role_id = role.id
INNER JOIN department ON role.department_id = department.id
ORDER by a.id;


-- View All Roles (allRoles() in server.js)
SELECT * FROM role

-- View All Departments (allDepartments() in server.js)
SELECT * FROM department



-- Add Role 
SELECT role.id, title, salary, department.name 
FROM role
RIGHT JOIN department ON role.department_id = department.id;
    -- part two after data is retrieved via prompts
    INSERT INTO role SET ?



-- Add Employee (addEmployee() in server.js)
SELECT role.id, role.title, employee.id, employee.first_name, employee.last_name, employee.manager_id
FROM role
LEFT JOIN employee ON role.id = employee.role_id;

   -- part two after data is retrieved via prompts (addNewEmp nested inside addEmployee())
    INSERT INTO employee SET ?
    --     {
    --     title: answer.roleName,
    --     salary: answer.roleSal,
    --     department_id: uniqueDept.indexOf(answer.deptName) + 1 //need to +1 to align with ID values that start at 1

    --   }



--Add Department (addDepartment() in server.js)
SELECT * FROM department
    -- part two after data is retrieved via prompts
    INSERT INTO department SET ?
    --     {
    --     name: answer.deptName
    --   }
        


-- Update Employee Role (updateEmployeeRole() in server.js)
SELECT role.id, role.title, role.salary, employee.role_id, employee.first_name, employee.last_name, employee.manager_id
  FROM role
  LEFT JOIN employee ON role.id = employee.role_id
  ORDER BY employee.id;
  -- part two after data is retrieved from first prompt
    SELECT * FROM role
  -- part three after data is retrieved from second prompt
    UPDATE employee SET ? WHERE ?
        -- role_id: filteredRole[0].id
        -- first_name: employeeToUpdate[0].first_name

-- View employees by manager (viewByManager() in server.js)
SELECT * FROM employee
    -- part two after prompt
    SELECT a.id, a.first_name, a.last_name, CONCAT(b.first_name, ' ', b.last_name) as manager
      FROM employee as a
      LEFT JOIN employee as b ON a.manager_id = b.id 
      WHERE a.manager_id = ? -- [selectedManager[0].id]

-- Update Employee Manager (updateEmployeeManager() in server.js)
SELECT * FROM employee
  -- part two after prompts 
  UPDATE employee SET ? WHERE ?
            -- {
            --   manager_id: mgr
            -- },
            -- {
            --   id: emp
            -- }