
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Vehicles;
DROP TABLE IF EXISTS Customer_Vehicle;
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Repairs;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS TransactionDetails;

CREATE TABLE Customers (
    c_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    c_name VARCHAR(50) NOT NULL,
    c_email VARCHAR(50) NOT NULL,
    PRIMARY KEY (c_id)
);

CREATE TABLE Vehicles(
    v_id INT UNIQUE AUTO_INCREMENT,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (v_id)
);

CREATE TABLE Customer_Vehicle (
    intersect_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    c_id INT NOT NULL,
    v_id INT,
    PRIMARY KEY (intersect_id),
    CONSTRAINT FOREIGN KEY (c_id) REFERENCES Customers (c_id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (v_id) REFERENCES Vehicles (v_id) ON DELETE CASCADE
);

CREATE TABLE Employees ( 
    e_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    e_name VARCHAR(50) NOT NULL,
    e_email VARCHAR(50) NOT NULL,
    PRIMARY KEY (e_id)
);

CREATE TABLE Repairs (
    r_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    task TEXT,
    cost DECIMAL(10, 2),
    PRIMARY KEY (r_id)
);

CREATE TABLE TransactionDetails (
    transactionDetailsID INT NOT NULL AUTO_INCREMENT,
    transactionsID int,
    repairID int,
    repairCost DECIMAL(10,2),
    PRIMARY KEY (transactionDetailsID),
    CONSTRAINT FOREIGN KEY (transactionsID) REFERENCES Transactions (t_id),
    CONSTRAINT FOREIGN KEY (repairID) REFERENCES Repairs (r_id)
);

CREATE TABLE Transactions(
    t_id INT UNIQUE AUTO_INCREMENT,
    t_amount INT NOT NULL,
    t_date DATE NOT NULL,
    t_v_id INT NOT NULL,
    t_e_id INT NOT NULL,
    PRIMARY KEY (t_id),
    CONSTRAINT FOREIGN KEY (t_v_id) REFERENCES Vehicles (v_id) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (t_e_id) REFERENCES Employees (e_id) ON DELETE CASCADE
);

DESCRIBE Customers;
DESCRIBE Vehicles;
DESCRIBE Customer_Vehicle;
DESCRIBE Employees;
DESCRIBE Repairs;
DESCRIBE Transactions;
DESCRIBE TransactionDetails;
