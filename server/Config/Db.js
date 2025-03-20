const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',  // or 'localhost'
    user: 'root',       // Change if you use a different username
    password: 'himanshu@123',       // Add your MySQL Workbench password
    database: 'testdb' // Replace with your actual database name
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL Workbench database');
});

module.exports = connection;
