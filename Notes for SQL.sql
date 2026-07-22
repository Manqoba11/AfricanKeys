-- INSERT INTO products
-- (name, price, image, description)
-- VALUES (?, ?, ?, ?)
-- Read it like English:
-- Insert a new row into the products table using the values for name, price, image, and description.

-- Create a database
CREATE DATABASE school;

-- Use the database
USE school;

-- Create a table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

-- Insert data
INSERT INTO students (name, age)
VALUES ('Manqoba', 21);

-- Display all records
SELECT * FROM students;

| CRUD  | SQL      | What it does         |
| ----- | -------- | -------------------- |
| **C** | `INSERT` | Create new data      |
| **R** | `SELECT` | Read data            |
| **U** | `UPDATE` | Change existing data |
| **D** | `DELETE` | Remove data          |

| Action | Method |
| ------ | ------ |
| Read   | GET    |
| Create | POST   |
| Update | PUT    |
| Delete | DELETE |
