const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

// Increment count for a specific machine ID and date
app.post('/increment', (req, res) => {
    const { machine_id, date } = req.body;
    const queryString = 'INSERT INTO counts (machine_id, date, count) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE count = count + 1';
    db.query(queryString, [machine_id, date], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
