-- Customers CRUD

    -- Create
INSERT INTO Customers (c_name, c_email)
VALUES (:input_c_name, :input_c_email);

    -- Read
SELECT * FROM Customers;
SELECT v_id, c_name, c_email FROM Customers
LEFT JOIN Customer_Vehicle ON Customers.c_id = Customer_Vehicle.c_id
WHERE Customers.c_id = :input_c_id;

    -- Update
UPDATE Customers SET c_name = :input_c_name, c_email = :input_c_email
Where c_id = :customer_id;

    -- Delete
DELETE FROM Customers WHERE c_id = :customer_id;


-- Vehicles CRUD

    -- Create
 INSERT INTO Vehicles (make, model, color, year)
 VALUES (:make, :model, :color, :year);

    -- Read
SELECT * FROM Vehicles;
SELECT c_id, make, model, color, year FROM Vehicles
LEFT JOIN Customer_Vehicle ON Vehicles.v_id = Customer_Vehicle.v_id
WHERE Vehicles.v_id = :input_v_id;

    -- Update
 UPDATE Vehicles SET make = :inputMake, model = :inputModel, color = :inputColor, year = :inputYear
 WHERE v_id = :vehicle_id;

    -- Delete 
DELETE FROM Vehicles WHERE v_id = :vehicle_id;


-- Employees CRUD

    -- Create
INSERT INTO Employees (e_name, e_email)
VALUES (:input_e_name, :input_e_email);

    -- Read
SELECT * FROM Employees;
SELECT e_name FROM Employees WHERE e_id = :employee_id;
SELECT e_email FROM Employees WHERE e_id = :employee_id;

    -- Update
UPDATE Employees SET e_name = :input_e_name, e_email = :input_e_email
WHERE e_id = :employee_id;

    -- Delete   
DELETE FROM Employees WHERE e_id = :employee_id;


-- Repairs CRUD

    --Create
INSERT INTO Repairs(task)
VALUES (:task_text);

    --Read
SELECT * FROM Repairs;
SELECT r_id, task FROM Repairs WHERE r_id = :repair_id;

    --Update
UPDATE Repairs SET task = :task_text
WHERE r_id = :repair_id;

    --Delete
DELETE FROM Repairs WHERE r_id = :repair_id;


-- Transactions DRUD

    -- Create
INSERT INTO Transactions(t_amount, t_date, t_v_id, t_r_id, t_e_id)
VALUES (:input_amount, :input_date, :input_v_id, :input_r_id, :input_e_id);

    -- Read
SELECT t_id, t_amount, t_date, t_v_id, t_r_id, t_e_id FROM Transactions WHERE t_id = :input_t_id;






