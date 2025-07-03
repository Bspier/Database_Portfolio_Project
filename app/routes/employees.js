const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/employees', function(req, res)
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
        console.log(rows); //error checking
    })
});

// add employee
router.post('/add-employee-ajax', function(req, res) {
    let data = req.body;

    console.log("Received data:", data);

    const query1 = `INSERT INTO Employees (e_name, e_email) VALUES (?, ?);`;
    const query2 = `SELECT * FROM Employees;`;

    db.pool.query(query1, [data.e_name, data.e_email], function(error, _insertResult) {
        if (error) {
            console.log("Insert error:", error);
            res.sendStatus(400);
        } else {
            db.pool.query(query2, function(error, selectRows, fields) {
                if (error) {
                    console.log("Select error:", error);
                    res.sendStatus(400);
                } else {
                    res.send(selectRows);
                }
            });
        }
    });
});

//delete employee
router.delete('/delete-employee-ajax', function(req,res,next){
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
router.put('/put-employee-ajax', function(req,res,next){
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