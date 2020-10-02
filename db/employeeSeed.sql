USE employee_db;


-- employee

-- role
-- title [1Access Manager, 2Access Analyst, 3Sales Manager, 4Salesperson, 5HR Manager, 6HR Analyst]
-- salary[1 90000, 2 60000, 3 70000, 4 45000, 5 100000, 6 72000]


-- department
-- names: [1IT Operations, 2sales, 3HR]



-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES 
--     ("Cathy", "Johnson", 3, null),
--     ("Vanessa", "Ambrose", 1, null),
--     ("Derek", "Zoolander", 5, null),
--     ("Steve", "Isaacs", 2, 1),
--     ("Nancy", "Hampton", 4, 3),
--     ("Caius", "Engels", 6, 5);


-- INSERT INTO role (title, salary, department_id)
-- VALUES
--     ("Access Manager", 90000, 1),
--     ("Access Analyst", 60000, 1),
--     ("Sales Manager", 70000, 2),
--     ("Salesperson", 45000, 2),
--     ("HR Manager", 10000, 3),
--     ("HR Analyst", 72000, 3);


-- INSERT INTO department (name)
-- VALUES
-- ("IT Operations"),
-- ("Sales"),
-- ("Human Resources");


-- select first_name, last_name, title, salary
-- FROM role
-- RIGHT JOIN employee ON employee.role_id = role.id;

-- SELECT title, name
-- FROM role
-- LEFT JOIN department ON department.id = role.department_id




