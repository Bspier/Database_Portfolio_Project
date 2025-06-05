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

INSERT INTO Customers(c_name, c_email)
VALUES ('Charle Day', 'cday@hello.com'),
('Jim Smith', 'jsmith@hello.com'),
('Tom Brown', 'tombrown68@hello.com');

INSERT INTO Vehicles(make, model, color, year)
VALUES ('Toyota', 'Tacoma', 'white', '1997-01-01'),
('Honda', 'Accord', 'gold', '2003-01-01'),
('Subaru', 'BRZ', 'blue', '2013-01-01');

INSERT INTO Customer_Vehicle (c_id, v_id)
VALUES ((SELECT c_id FROM Customers WHERE c_id = 1), (SELECT v_id FROM Vehicles WHERE v_id = 2)),
((SELECT c_id FROM Customers WHERE c_id = 2), (SELECT v_id FROM Vehicles WHERE v_id = 1)),
((SELECT c_id FROM Customers WHERE c_id = 3), (SELECT v_id FROM Vehicles WHERE v_id = 3));

INSERT INTO Employees (e_name, e_email)
VALUES ('Jim Bob', 'jimmybob@hello.com'),
('Al Turnator', 'alturnator@hello.com'),
('Stephen Duga', 'dugaduga@hello.com');

INSERT INTO Repairs (task, cost)
VALUES ('Oil Change', 50), ('Brake Change', 200), ('Tune Up', 350);

INSERT INTO TransactionDetails(transactionsID ,repairID, repairCost)
VALUES (1, 1, (SELECT cost FROM Repairs WHERE r_id = 1)), 
(2, 3, (SELECT cost FROM Repairs WHERE r_id = 3));

INSERT INTO Transactions(t_amount, t_date, t_v_id, t_e_id)
VALUES(50, '2023-01-29', (SELECT v_id FROM Vehicles WHERE v_id = 1), (SELECT e_id FROM Employees WHERE e_id = 3)),
(200, '2022-10-15', (SELECT v_id FROM Vehicles WHERE v_id = 3), (SELECT e_id FROM Employees WHERE e_id = 1)),
(350, '2022-02-05', (SELECT v_id FROM Vehicles WHERE v_id = 2), (SELECT e_id FROM Employees WHERE e_id = 2));

SELECT * FROM Customers;
SELECT * FROM Vehicles;
SELECT * FROM Customer_Vehicle;
SELECT * FROM Employees;
SELECT * FROM Repairs;
SELECT * FROM Transactions;
