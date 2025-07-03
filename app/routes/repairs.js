const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/repairs', function(req, res)
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
router.post('/add-repair-ajax', function(req, res)
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
router.delete('/delete-repair-ajax', function(req,res,next){
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
router.put('/put-repair-ajax', function(req,res,next){
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