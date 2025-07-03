const express = require('express');
const app = express();
const path = require ('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//app.js
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
//app.use(express.static('back_end/public'));

// Import routes
const employeesRouter = require('./routes/employees');
const customersRouter = require('./routes/customers');
const repairsRouter = require('./routes/repairs');
const vehiclesRouter = require('./routes/vehicles');
const customerVehiclesRouter = require('./routes/customerVehicles');
const transactionsRouter = require('./routes/transactions');
const transactionDetailsRouter = require('./routes/transactionDetails');

// Use routes
app.use('/employees', employeesRouter);
app.use('/customers', customersRouter);
app.use('/repairs', repairsRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/customer_vehicle', customerVehiclesRouter);
app.use('/', transactionsRouter);
app.use('/transaction_details', transactionDetailsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('Server started on port: ' + PORT + '. Press CTRL+C to exit.')
})


//routes
// Eployees Entity CRUD
// return employee


// Customers Entity CRUD
// read customers



// Repairs Entity CRUD
// read repairs



// Vehicles Entity CRUD
// read vehicle



// Customer_Vehicle Table CRUD
// read customer_vehicle


// Transaction CR


// Transaction Details CR
