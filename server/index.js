const express = require('express');
const app = express();
const port = 8002;
const mysql = require('mysql');
const cors = require("cors");
const productRoutes = require("./routes/product-routes");
const bodyParser = require('body-parser');

var db  = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "scandi-products",
  Port: 3306
});
console.log()
const corsOptions = {
  origin: '*',
  // credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", productRoutes);


app.listen(port, () => {
  console.log('listening...');
});

module.exports = db;
