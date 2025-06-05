var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
const path = require('path');
//database
var db = require('./db-connector');

//app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
//app.use(express.static('back_end/public'));

//routes
// Eployees Entity CRUD
// return employee


app.get('/employees', function(req, res)
{
    //Query1
    let query1;

    if (req.query.e_id === undefined)
    {
        query1 = "SELECT * FROM Employees;"
    }

    else 
    {
        query1 = `SELECT * FROM Employees WHERE e_id LIKE "${req.query.e_id}%";`;
        
    }

    db.pool.query(query1, function(error, rows, fields){
        
        res.render('employees', {data: rows})
    })
});

// add employee
app.post('/add-employee-ajax', function(req, res)
{
    let data = req.body;

    let query1 = `INSERT INTO Employees (e_name, e_email) VALUES (?, ?)`;
    let inserts = [data.e_name, data.e_email];
    db.pool.query(query1, inserts, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

//delete employee
app.delete('/delete-employee-ajax', function(req,res,next){
    let data = req.body;
    let e_id = parseInt(data.e_id);
    let deleteEmployee = `DELETE FROM Employees WHERE e_id = ?;`;

    db.pool.query(deleteEmployee, [e_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })
});

// update employee
app.put('/put-employee-ajax', function(req,res,next){
    let data = req.body;
    let e_id = parseInt(data.e_id);
    let e_email = data.e_email;
    let queryUpdateEmployee = `UPDATE Employees SET e_email = ? WHERE e_id = ?;`;
    let selectNewEmail = `SELECT e_email FROM Employees WHERE e_id = ?;`;

    console.log(data)

    db.pool.query(queryUpdateEmployee, [e_email, e_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectNewEmail, [e_id], function(error, rows, fields) {
                
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })  
        }
    })
});

// Customers Entity CRUD
// read customers
app.get('/customers', function(req, res)
{
    //Query1
    let query1;

    if (req.query.c_id === undefined)
    {
        query1 = "SELECT * FROM Customers;"
    }
    else 
    {
        query1 = `SELECT * FROM Customers WHERE c_id LIKE "${req.query.c_id}%";`;
    }

    db.pool.query(query1, function(error, rows, fields){
        
        res.render('customers', {data: rows})
    });

});

// add customer
app.post('/add-customer-ajax', function(req, res)
{
    let data = req.body;

    let c_id = parseInt(data.c_id);
    if(isNaN(c_id))
    {
        c_id = 'NULL'
    }

    query1 = `INSERT INTO Customers (c_name, c_email)
    VALUES ('${data.c_name}', '${data.c_email}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// delete customer
app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let c_id = parseInt(data.c_id);
    let deleteCustomer = `DELETE FROM Customers WHERE c_id = ?;`;

    db.pool.query(deleteCustomer, [c_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })
});

// update customer
app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
    let c_id = parseInt(data.c_id);
    let c_email = data.c_email;
    let queryUpdateCustomer = `UPDATE Customers SET c_email = ? WHERE c_id = ?;`;
    let selectNewEmail = `SELECT c_email FROM Customers WHERE c_id = ?;`;

    console.log(data)

    db.pool.query(queryUpdateCustomer, [c_email, c_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectNewEmail, [c_id], function(error, rows, fields) {
                
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// Repairs Entity CRUD
// read repairs
app.get('/repairs', function(req, res)
{
    //Query1
    let query1;

    if (req.query.r_id === undefined)
    {
        query1 = "SELECT * FROM Repairs;"
    }

    else 
    {
        query1 = `SELECT * FROM Repairs WHERE r_id LIKE "${req.query.r_id}%";`;
        
    }

    db.pool.query(query1, function(error, rows, fields){
        
        res.render('repairs', {data: rows})
    })

});

// add repair
app.post('/add-repair-ajax', function(req, res)
{
    let data = req.body;

    let r_id = parseInt(data.r_id);
    if(isNaN(r_id))
    {
        r_id = 'NULL'
    }

    query1 = `INSERT INTO Repairs (task, cost)
    VALUES ('${data.task}', '${data.cost}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Repairs;`;
            db.pool.query(query2, function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// delete repair
app.delete('/delete-repair-ajax', function(req,res,next){
    let data = req.body;
    let r_id = parseInt(data.r_id);
    let deleteRepair = `DELETE FROM Repairs WHERE r_id = ?;`;

    db.pool.query(deleteRepair, [r_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })
});

// update repair
app.put('/put-repair-ajax', function(req,res,next){
    let data = req.body;
    let r_id = parseInt(data.r_id);
    let task = data.task;
    let cost = data.cost;
    let queryUpdateRepair = `UPDATE Repairs SET task = ?, cost = ? WHERE r_id = ?;`;
    let selectNewTask = `SELECT task, cost FROM Repairs WHERE r_id = ?;`;

    console.log('put request')

    db.pool.query(queryUpdateRepair, [task, cost, r_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            console.log('query1 sucessful')
            db.pool.query(selectNewTask, [r_id], function(error, rows, fields) {
                
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// Vehicles Entity CRUD
// read vehicle
app.get('/vehicles', function(req, res)
{
    //Query1
    let query1;

    if (req.query.v_id === undefined)
    {
        query1 = "SELECT * FROM Vehicles;"
    }

    else 
    {
        query1 = `SELECT * FROM Vehicles WHERE v_id LIKE "${req.query.v_id}%";`;
        
    }

    db.pool.query(query1, function(error, rows, fields){
        
        res.render('vehicles', {data: rows})
    })

});

// add vehicle
app.post('/add-vehicle-ajax', function(req, res)
{
    let data = req.body;

    let v_id = parseInt(data.v_id);
    if(isNaN(v_id))
    {
        v_id = 'NULL'
    }

    query1 = `INSERT INTO Vehicles (make, model, color, year)
    VALUES ('${data.make}', '${data.model}', '${data.color}', '${data.year}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Vehicles;`;
            db.pool.query(query2, function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// delete vehicle
app.delete('/delete-vehicle-ajax', function(req,res,next){
    let data = req.body;
    let v_id = parseInt(data.v_id);
    let deleteVehicle = `DELETE FROM Vehicles WHERE v_id = ?;`;

    db.pool.query(deleteVehicle, [v_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })
});

// update vehicle
app.put('/put-vehicle-ajax', function(req,res,next){
    let data = req.body;
    let v_id = parseInt(data.v_id);
    let make = data.make;
    let model = data.model;
    let color = data.color;
    let year = parseInt(data.year);
    let queryUpdateVehicle = `UPDATE Vehicles SET make = ?, model = ?, color = ?, year = ? WHERE v_id = ?;`;
    let selectNewEmail = `SELECT make, model, color, year FROM Vehicles WHERE v_id = ?;`;

    console.log(data)

    db.pool.query(queryUpdateVehicle, [make, model, color, year, v_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectNewEmail, [v_id], function(error, rows, fields) {
                
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// Customer_Vehicle Table CRUD
// read customer_vehicle
app.get('/customer_vehicle', function(req, res)
{
    //Query1
    let query1;

    if (req.query.intersect_id === undefined)
    {
        query1 = "SELECT * FROM Customer_Vehicle;"
    }

    else 
    {
        query1 = `SELECT * FROM Customer_Vehicles WHERE intersect_id LIKE "${req.query.intersect_id}%";`;
        
    }
    let query2 = `SELECT * FROM Customers;`
    let query3 = "SELECT CONCAT(v_id,'. ', year,' ', make,' ', model) as Vehicle, v_id FROM Vehicles;";

    db.pool.query(query1, function(error, rows, fields){
        let table = rows;

        db.pool.query(query2, function(error, rows, fields){
            let customers = rows;

            db.pool.query(query3, function(error, rows, fields){
                let vehicles = rows;

                res.render('customer_vehicle', {data: table, customers: customers, vehicles: vehicles});
            })
        })
    })
});

// add customer_vehicle
app.post('/add-intersect-ajax', function(req, res)
{
    let data = req.body;

    let intersect_id = parseInt(data.intersect_id);
    if(isNaN(intersect_id))
    {
        intersect_id = 'NULL'
    }

    query1 = `INSERT INTO Customer_Vehicle (c_id, v_id)
    VALUES ('${data.c_id}', '${data.v_id}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Customer_Vehicle;`;
            db.pool.query(query2, function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// delete customer_vehicle
app.delete('/delete-intersect-ajax', function(req,res,next){
    let data = req.body;
    let intersect_id = parseInt(data.intersect_id);
    let deleteIntersect = `DELETE FROM Customer_Vehicle WHERE intersect_id = ?;`;

    db.pool.query(deleteIntersect, [intersect_id], function(error, rows, fields){
        if(error){
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })
});

// Transaction CR
app.get('/', function(req, res)
{
    let query1;

    if (req.query.t_id === undefined)
    {
        query1 = "SELECT * FROM Transactions;"
    }
    else 
    {
        query1 = `SELECT * FROM Transactions WHERE t_id LIKE "${req.query.t_id}%";`;        
    }

    let query2 = "SELECT CONCAT(v_id,'. ', year,' ', make,' ', model) as Vehicle, v_id FROM Vehicles;";
    let query3 = "SELECT * FROM Transaction_details;";
    let query4 = "SELECT * FROM Employees;";

    db.pool.query(query1, function(error, rows, fields){
        let transactions = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let vehicles = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let details = rows;

                db.pool.query(query4, (error, rows, fields) => {
                    let employees = rows;

                    res.render('transactions', {data: transactions, vehicles: vehicles, details: details, employees: employees});
                });
            });
        });
    })
});

// Transaction create
app.post('/add-transaction-ajax', function(req, res)
{
    let data = req.body;

    let v_id = parseInt(data.v_id);
    if(isNaN(v_id))
    {
        v_id = 'NULL'
    }

    let e_id = parseInt(data.e_id);
    if(isNaN(e_id))
    {
        e_id = 'NULL'
    }

    query1 = `INSERT INTO Transactions (t_amount, t_date, t_v_id, t_e_id)
    VALUE ('${data.t_amount}', '${data.t_date}', '${data.t_v_id}', '${data.t_e_id}');`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) 
        {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on transaction_details
            let query2 = `SELECT * FROM Transactions;`;
            db.pool.query(query2, function(error, rows, fields){
                //let transactionDetails = rows;

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Transaction Details CR
app.get('/transaction_details', function(req, res)
{
    let query1;
    
    if (req.query.transactionsID === undefined)
    {
        query1 = "SELECT * FROM TransactionDetails;"
    }
    else 
    {
        query1 = `SELECT * FROM TransactionDetails WHERE transactionsID LIKE "${req.query.transactionsID}%";`;
    }
    let query2 = "SELECT * FROM Transactions;";
    let query3 = "SELECT CONCAT(r_id, '. ', task) as Repair, r_id FROM Repairs;";

    db.pool.query(query1, function(error, rows, fields){
        let details = rows;

        db.pool.query(query2, (error, rows, fields) => {    
            let transactions = rows;
        
            db.pool.query(query3, (error, rows, fields) => {
                let repairs = rows;
            
                res.render('transaction_details', {data: details, transactions: transactions, repairs: repairs})
            });
        });
    })
});

// add transaction details
app.post('/add-transaction-detail-ajax', function(req, res)
{
    let data = req.body;

    let transactionID = parseInt(data.transactionID);
    if(isNaN(transactionID))
    {
        transactionID = 'NULL'
    }
    
    let repairID = parseInt(data.repairID);
    if (isNaN(repairID))
    {
        repairID = 'NULL'
    }

    query1 = `INSERT INTO TransactionDetails (transactionsID, repairID, repairCost)
    VALUES ('${data.transactionID}', '${data.repairID}',(SELECT cost FROM Repairs WHERE r_id=${data.repairID}));`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) 
        {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on transaction_details
            let query2 = `SELECT * FROM TransactionDetails;`;
            db.pool.query(query2, function(error, rows, fields){
                //let transactionDetails = rows;

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })    
        }
    })
});


app.listen(PORT, function(){
    console.log('Server started on port: ' + PORT + '. Press CTRL+C to exit.')
})
