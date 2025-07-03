const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/transaction_details', function(req, res)
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
router.post('/add-transaction-detail-ajax', function(req, res)
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