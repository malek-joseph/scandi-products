const express = require('express');
const app = express();
const port = 8002;
const mysql = require('mysql');


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'scandi-products',
// });

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "password",
//   database: "CRUDDatabase",
//   Port: 3306
// });
var db = mysql.createConnection({

  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "scandi-products",
  Port: 3306
});


app.get('/', (req, res) => {



  db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
// const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie')"
const sqlInsert = "INSERT INTO products (name, price) VALUES ('SQL COURSE', 15)"

    db.query(sqlInsert, function (err, result) {  
if (err) throw err;  
console.log("1 record inserted");  
});  
    res.send('DB working')
  })
  // res.send('Hello World!');
});





app.listen(port, () => {
  console.log(`https://malek-joseph-supreme-guacamole-9wxvxvwq669cx655-${port}.preview.app.github.dev/`);
});