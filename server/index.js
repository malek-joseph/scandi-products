const express = require('express');
const app = express();
const port = 8000;
const mysql = require('mysql');


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'scandi-products',
// });

var db = mysql.createConnection({

  host: "127.0.0.1",
  user: "root",
  password: "13101995",
  database: "scandi-products",
});

const sqlInsert = "INSERT INTO products (name, price) VALUES ('SQL COURSE', 15)"

app.get('/', (req, res) => {

  db.query(sqlInsert, (err, result) => {
    // if (err) throw err;
    console.log(err);
    res.send('DB working')
  })
  // res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`https://malek-joseph-supreme-guacamole-9wxvxvwq669cx655-${port}.preview.app.github.dev/`);
});