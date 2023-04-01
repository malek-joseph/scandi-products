const express = require("express");
const router = express.Router(); 

const db = require('../index')

// const {
//   create, list
// } = require("../controllers/product-controllers");


router.post("/add-product", (req, res, next) => {
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
    const { sku, name, price, size, weight, dimensions } = req.body
    const sqlInsert = "INSERT INTO products (sku, name, price, size, weight, dimensions) VALUES (?, ?, ?, ?, ?,?)"
    db.query(sqlInsert, [sku, name, price, size, size, weight, dimensions], (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("1 record inserted");
    });
    res.send('DB working')
  })

});



module.exports = router;