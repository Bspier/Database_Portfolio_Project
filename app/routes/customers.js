const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/customers', function(req, res)
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
router.post('/add-customer-ajax', function(req, res)
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
router.delete('/delete-customer-ajax', function(req,res,next){
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
router.put('/put-customer-ajax', function(req,res,next){
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