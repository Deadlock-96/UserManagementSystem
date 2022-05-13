const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//handlebars templating engines
app.engine('hbs', exphbs.engine( { extname: '.hbs' }));
app.set('view engine', 'hbs');
// https://stackoverflow.com/questions/69959820/typeerror-exphbs-is-not-a-function

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
});

//connection to DB
pool.getConnection((err, connection) => {
    if(err) throw err; //not connected
    console.log('connection as ID ' + connection.threadId);
});

//router
const routes = require('./server/routes/user');
app.use('/', routes); //use route

// Create connection
app.listen(port, () => console.log(`Listening on port ${port}`));