const { append } = require('express/lib/response');
const mysql = require('mysql');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//view users
exports.view = (req, res) => {
    //connection to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connection as ID ' + connection.threadId);
        //user connection
        connection.query('SELECT * FROM users WHERE status = "active" ', (err, rows) => {
            //when done with connection release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from table is: \n', rows);
        });
    });
}

//find user by search
exports.find = (req, res) => {
        //connection to DB
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected
            console.log('connection as ID ' + connection.threadId);
            let searchTerm = req.body.search;
            //user connection
            connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
                //when done with connection release it
                connection.release();
                if (!err) {
                    res.render('home', { rows });
                } else {
                    console.log(err);
                }
                console.log('The data from table is: \n', rows);
            });
        });
}


//add user
exports.addUser = (req, res) => {
    res.render('addUser');
}


        // connection.query('SELECT * FROM users WHERE first_name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {