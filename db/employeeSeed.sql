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
    ("Salesperson", 45000, 2),
    ("HR Manager", 10000, 3),
    ("HR Analyst", 72000, 3),
    ("Legal Analyst", 85000, 4);


INSERT INTO department (name)
VALUES
("IT Operations"),
("Sales"),
("Human Resources"),
("Legal");


SELECT employee.id, first_name, last_name, title, salary, name, manager_id
FROM role 
RIGHT JOIN department ON role.department_id = department.id 
RIGHT JOIN employee ON employee.role_id = role.id 
ORDER BY employee.id;

select a.first_name, CONCAT(b.first_name, ' ', b.last_name) as manager
from employee as a
left outer join employee as b
on a.manager_id = b.id; 


