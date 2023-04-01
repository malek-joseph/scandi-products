
const db = '../index.js'

exports.create = (req, res, next) => {
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
    const { sku, name, price, productType, productTypeValue, size, height, width, length, weight } = req.body
    const sqlInsert = "INSERT INTO products (sku, name, price, productType, productTypeValue, size, height, width, length, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [sku, name, price, productType, productTypeValue, size, height, width, length, weight ], (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("1 record inserted");
    });
    res.send('DB working')
  })
  
};
