const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Open the database
const db = new sqlite3.Database(path.join(__dirname, 'products.db'));

// Create the table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price TEXT NOT NULL,
            category TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `);

    // Insert product data if the table is empty
    const stmt = db.prepare(`
        INSERT INTO products (name, description, price, category, image) 
        VALUES (?, ?, ?, ?, ?)
    `);

    // Products for Books
    stmt.run("Programming Book", "Learn how to code with this book.", "$29", "books", "book1.jpg");
    stmt.run("Thriller Novel", "A page-turning mystery thriller.", "$19", "books", "book2.jpg");

    // Products for Electronics
    stmt.run("Smartphone", "A high-end smartphone with a great camera.", "$699", "electronics", "smartphone.jpg");
    stmt.run("Laptop", "A powerful laptop for work and gaming.", "$999", "electronics", "laptop.jpg");

    // Products for Clothing
    stmt.run("Jacket", "A warm, stylish jacket.", "$50", "clothing", "jacket.jpg");
    stmt.run("T-Shirt", "A cool graphic t-shirt.", "$20", "clothing", "tshirt.jpg");

    // Products for Furniture
    stmt.run("Sofa", "A comfortable, modern sofa.", "$499", "furniture", "sofa.jpg");
    stmt.run("Dining Table", "A stylish dining table for your home.", "$300", "furniture", "table.jpg");

    stmt.finalize();
});

// Close the database
db.close();
