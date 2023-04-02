const express = require('express');
const app = express();
const port = 8002;
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');

const db  = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "scandi-products",
  Port: 3306
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/add-product", (req, res) => {
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
    console.log(req.body);
    const { sku, name, price, size, weight, dimensions } = req.body
    const sqlInsert = "INSERT INTO products (sku, name, price, size, weight, dimensions) VALUES (?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [sku, name, price, size, weight, dimensions], (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("1 record inserted");
    });
    res.send('DB working')
  })

});


app.listen(port, () => {
  console.log('listening...');
});

