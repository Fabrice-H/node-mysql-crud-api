const express = require("express");
const mysql = require('mysql');
const app = express();

app.use(express.json());

/***************/
/*   DATABASE  */
/***************/

// CREATE DB CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud_api'
});

// CONNECT DB
db.connect(err => {
    if (err) throw err;
    console.log('Database is connected !');
});

/***************/
/*   ROUTES  */
/***************/

// CREATE PRODUCT

app.post('/create', (req, res) => {
    try {
        const { title, price, description, category } = req.body;

        db.query('INSERT INTO products (title, price, description, category) VALUES (?,?,?,?)', [title, price, description, category], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({message: 'Product has created'})
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// GET ALL PRODUCTS

app.get('/products', (req, res) => {
    try {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.send(results)
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// GET PRODUCT BY ID

app.get('/products/:id', (req, res) => {
    try {
        const id = req.params.id;

        db.query(`SELECT * FROM products WHERE id=${id}`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// UPDATE PRODUCT BY ID

app.put('/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category } = req.body;

        db.query(`UPDATE products SET title='${title}', price='${price}', description='${description}', category='${category}' WHERE id=${id}`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// DELETE PRODUCT BY ID

app.delete('/products/:id', (req, res) => {
    try {
        const { id } = req.params;

        db.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({message: 'Product has deleted'})
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
})

const PORT = 8080;
app.listen(PORT, () => console.log('Started on port', PORT))