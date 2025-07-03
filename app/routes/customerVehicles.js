const express = require('express');
const router = express.Router();
const db = require('../db-connector');

router.get('/customer_vehicle', function(req, res)
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
router.post('/add-intersect-ajax', function(req, res)
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
router.delete('/delete-intersect-ajax', function(req,res,next){
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