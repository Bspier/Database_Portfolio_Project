const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/', function(req, res)
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
router.post('/add-transaction-ajax', function(req, res)
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