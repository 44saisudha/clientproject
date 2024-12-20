const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { repeat } = require('rxjs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost', // Change to your DB host
    user: 'root',      // Change to your DB user
    password: 'root',      // Change to your DB password
    database: 'register' // Replace with your DB name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

// Secret for JWT
const JWT_SECRET = 'your_jwt_secret';

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, address, password, rep } = req.body;

    // Validate input
    if (!username || !email || !address || !password || !rep) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const query = 'INSERT INTO users (username, email, address, password, rep) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [username, email, address, hashedPassword, rep], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Username already exists.');
                }
                console.error(err);
                return res.status(500).send('Server error.');
            }

           // res.status(200).json({ message: 'User registered successfully' });
            res.status(200).send('User registered successfully.');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user.');
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    // Check if the user exists
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error.');
        }

        if (results.length === 0) {
            return res.status(400).send('Invalid username or password.');
        }

        const user = results[0];

        // Compare the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid username or password.');
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'Login successful.', token });
    });
});

// Fetch registered usernames (for testing)
app.get('/users', (req, res) => {
    const query = 'SELECT username FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error.');
        }
        res.send(results);
    });
});

// Start the server




app.post("/api/meetings", (req, res) => {
    const { topic, people, date, time } = req.body;
    const sql = "INSERT INTO meetings (topic, people, date, time) VALUES (?, ?, ?, ?)";
    db.query(sql, [topic, people, date, time], (err, result) => {
      if (err) throw err;
      res.send({ message: "Meeting scheduled successfully!" });
    });
  });
  app.get("/api/meetings", (req, res) => {
    const sql = "SELECT * FROM meetings";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });  


  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});