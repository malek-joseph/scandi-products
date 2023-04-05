const express = require('express');
const app = express();
const port = 8002;
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');
const router = express.Router();


const db  = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "scandi-products",
  Port: 3306
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/get-products', (req, res) => {
  db.connect((err) => {
    if (err) throw err;
    console.log("DB Connected");
    const sqlSelect = "SELECT * FROM products";
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
})
db.connect(function (err) {
  if (err) throw err

});

app.post("/api/add-product", (req, res) => {
  const { sku, name, price, size, weight, dimensions } = req.body;
  const sqlInsert =
    "INSERT INTO products (sku, name, price, size, weight, dimensions) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [sku, name, price, size, weight, dimensions],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(400).send("SKU already exists");
        } else {
          console.error(err);
          res.status(500).send("Internal server error");
        }
      } else {
        res.status(201).send(result);
      }
    }
  );
});


app.get("/api/", (req, res) => {
  // console.log("body", req.body);
  console.log("DB Connected");
  const sqlSelect = "SELECT * FROM products";
  db.query(sqlSelect, (err, result) => {
    if (err) throw err;
    console.log("retrieved data");
    res.send(result);
  });

});

app.delete('/api/delete', (req, res) => {
  console.log(req.skus);
  const { skus } = req.body;

  if (!Array.isArray(skus)) {
    res.status(400).send('Invalid input: skus must be an array');
    return;
  }

  const sqlDelete = "DELETE FROM products WHERE sku IN (?)";
  db.query(sqlDelete, [skus], (err, result) => {
    if (err) {
      res.status(500).send(`Error deleting products: ${err.message}`);
      return;
    }

    res.send(`Deleted ${result.affectedRows} products`);
  });
});


app.listen(port, () => {
  console.log('listening...');
});


