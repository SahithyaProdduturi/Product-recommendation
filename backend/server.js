const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create an express app
const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Database setup
const db = new sqlite3.Database(path.join(__dirname, 'products.db'), (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return;
    }
    console.log("Database connected!");
});

// Route for Books category
app.get('/books', (req, res) => {
    db.all('SELECT * FROM products WHERE category = "books"', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(rows);  // Send the fetched products as a JSON response
    });
});

// Route for Electronics category
app.get('/electronics', (req, res) => {
    db.all('SELECT * FROM products WHERE category = "electronics"', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(rows);
    });
});

// Route for Clothing category
app.get('/clothing', (req, res) => {
    db.all('SELECT * FROM products WHERE category = "clothing"', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(rows);
    });
});

// Route for Furniture category
app.get('/furniture', (req, res) => {
    db.all('SELECT * FROM products WHERE category = "furniture"', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(rows);
    });
});

// Serve the index.html page when no specific route is matched
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
