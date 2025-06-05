INSERT INTO Customers(c_name, c_email)
VALUES ('Charle Day', 'cday@hello.com'),
('Jim Smith', 'jsmith@hello.com'),
('Tom Brown', 'tombrown68@hello.com');

INSERT INTO Vehicles(make, model, color, year)
VALUES ('Toyota', 'Tacoma', 'white', 1997-01-01),
('Honda', 'Accord', 'gold', 2003-01-01),
('Subaru', 'BRZ', 'blue', 2013-01-01);

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

INSERT INTO Transactions(t_amount, t_date, t_v_id, t_e_id)
VALUES 
(50, '2023-01-29', (SELECT v_id FROM Vehicles WHERE v_id = 1), (SELECT e_id FROM Employees WHERE e_id = 3)),
(200, '2022-10-15', (SELECT v_id FROM Vehicles WHERE v_id = 3), (SELECT e_id FROM Employees WHERE e_id = 1)),
(350, '2022-02-05', (SELECT v_id FROM Vehicles WHERE v_id = 2), (SELECT e_id FROM Employees WHERE e_id = 2));

INSERT INTO TransactionDetails(transactionsID ,repairID, repairCost)
VALUES (1, 1, (SELECT cost FROM Repairs WHERE r_id = 1)), 
(2, 3, (SELECT cost FROM Repairs WHERE r_id = 3));
SELECT * FROM Customers;
SELECT * FROM Vehicles;
SELECT * FROM Customer_Vehicle;
SELECT * FROM Employees;
SELECT * FROM Repairs;
SELECT * FROM Transactions;