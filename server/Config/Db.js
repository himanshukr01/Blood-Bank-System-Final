require('dotenv').config();  // Load environment variables
const mysql = require('mysql');

// Establish connection with MySQL database
const connectDb = () => {
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,     // Fixed environment variable
            password: process.env.PASSWORD, // Fixed environment variable
            database: process.env.DBNAME
        });

        // Connect the database
        db.connect((err) => {
            if (err) {
                console.error(`Failed to connect to MySQL database!`, err);
                reject(err);
            } else {
                console.log(`Blood-Bank-System successfully connected to MySQL server`.bgGreen.white);
                resolve(db);
            }
        });
    });
};

module.exports = connectDb;
