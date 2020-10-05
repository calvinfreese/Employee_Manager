USE employee_db;


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



