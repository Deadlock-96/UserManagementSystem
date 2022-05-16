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
                let removedUser = req.query.removed
                res.render('home', { rows, removedUser });
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


exports.form = (req, res) => {
    res.render('addUser');
}

//add user
exports.createUser = (req, res) => {
    const { first_name, last_name, email, phone, comments} = req.body; //destructuring
     //connection to DB
     pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connection as ID ' + connection.threadId);
        //user connection
        connection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email, phone, comments], (err, rows) => {
            //when done with connection release it
            connection.release();
            if (!err) {
                res.render('addUser', {alert: 'User created successfully'});
            } else {
                console.log(err);
            }
            console.log('The data from table is: \n', rows);
        });
    });

}

//edit user
exports.editUser = (req, res) => {
        //connection to DB
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected
            console.log('connection as ID ' + connection.threadId);
            //user connection
            connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
                //when done with connection release it
                connection.release();
                if (!err) {
                    res.render('editUser', { rows });
                } else {
                    console.log(err);
                }
                console.log('The data from table is: \n', rows);
            });
        });
}

//update user
exports.updateUser = (req, res) => {
    const { first_name, last_name, email, phone, comments} = req.body; //destructuring
    //connection to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connection as ID ' + connection.threadId);
        //user connection
        connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',[first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            //when done with connection release it
            connection.release();
            if (!err) {
           //connection to DB
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected
            console.log('connection as ID ' + connection.threadId);
            //user connection
            connection.query('SELECT * FROM users WHERE id = ?',[req.params.id], (err, rows) => {
                //when done with connection release it
                connection.release();
                if (!err) {
                    res.render('editUser', { alert: 'User updated successfully', rows });
                } else {
                    console.log(err);
                }
                console.log('The data from table is: \n', rows);
            });
        });
            } else {
                console.log(err);
            }
            console.log('The data from table is: \n', rows);
        });
    });
}


//delete user
exports.deleteUser = (req, res) => {
    // //connection to DB
    // pool.getConnection((err, connection) => {
    //     if (err) throw err; //not connected
    //     console.log('connection as ID ' + connection.threadId);
    //     //user connection
    //     connection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows) => {
    //         //when done with connection release it
    //         connection.release();
    //         if (!err) {
    //             res.redirect('/');
    //         } else {
    //             console.log(err);
    //         }
    //         console.log('The data from table is: \n', rows);
    //     });
    // });

        //connection to DB
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected
            console.log('connection as ID ' + connection.threadId);
            //user connection
            connection.query('UPDATE users SET status = ? WHERE id = ?',['removed', req.params.id], (err, rows) => {
                //when done with connection release it
                connection.release();
                if (!err) {
                let removedUser = encodeURIComponent('User removed successfully');
                    res.redirect('/?removed=' + removedUser); 
                } else {
                    console.log(err);
                }
                console.log('The data from table is: \n', rows);
            });
        });
}


//view All users
exports.viewAllUsers = (req, res) => {
    //connection to DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connection as ID ' + connection.threadId);
        //user connection
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection release it
            connection.release();
            if (!err) {
                res.render('viewUser', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from table is: \n', rows);
        });
    });
}