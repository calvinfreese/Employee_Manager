DROP DATABASE employee_db;
CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);


CREATE TABLE IF NOT EXISTS role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DEC(20,2) NOT NULL,
    department_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Cathy", "Johnson", 3, null),
    ("Vanessa", "Ambrose", 1, null),
    ("Derek", "Zoolander", 5, null),
    ("Steve", "Isaacs", 2, 2),
    ("Nancy", "Hampton", 4, 1),
    ("Caius", "Engels", 6, 3);


INSERT INTO role (title, salary, department_id)
VALUES
    ("Access Manager", 90000, 1),
    ("Access Analyst", 60000, 1),
    ("Sales Manager", 70000, 2),
    ("Sales person", 45000, 2),
    ("HR Manager", 100000, 3),
    ("HR Analyst", 72000, 3),
    ("Legal Analyst", 85000, 4);


INSERT INTO department (name)
VALUES
("IT Operations"),
("Sales"),
("Human Resources"),
("Legal");


-- View All 
SELECT a.id, a.first_name, a.last_name, title, salary, name, CONCAT(b.first_name, ' ',b.last_name) as manager
FROM employee as a
LEFT JOIN employee as b ON a.manager_id = b.id
INNER JOIN role ON a.role_id = role.id
INNER JOIN department ON role.department_id = department.id
ORDER by a.id;

-- Add Role 
SELECT role.id, title, salary, department.name 
FROM role
RIGHT JOIN department ON role.department_id = department.id;

-- Add Employee
SELECT role.id, role.title, employee.id, employee.first_name, employee.last_name, employee.manager_id
FROM role
LEFT JOIN employee ON role.id = employee.role_id;
