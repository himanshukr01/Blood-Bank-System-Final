const connectDb = require('./db'); // Import the function

(async () => {
    try {
        const db = await connectDb();

        // Example query
        db.query('SELECT 1', (err, result) => {
            if (err) {
                console.error('Error running query:', err);
            } else {
                console.log('Query result:', result);
            }
        });

        // Close connection when done
        db.end();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();
