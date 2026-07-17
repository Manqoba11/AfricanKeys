-- ============================================
-- African Keys Database
-- Created by: Manqoba
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS africankeys;

USE africankeys;

-- ============================================
-- USERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ORDERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ============================================
-- SHOW TABLES
-- ============================================

SHOW TABLES;

-- ============================================
-- VIEW USERS
-- ============================================

SELECT * FROM users;

-- ============================================
-- VIEW ORDERS
-- ============================================

SELECT * FROM orders;

-- ============================================
-- VIEW ORDER ITEMS
-- ============================================

SELECT * FROM order_items;