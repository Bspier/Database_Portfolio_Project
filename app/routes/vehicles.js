const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/vehicles', function(req, res)
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
router.post('/add-vehicle-ajax', function(req, res)
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
router.delete('/delete-vehicle-ajax', function(req,res,next){
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
router.put('/put-vehicle-ajax', function(req,res,next){
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