const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const PORT = 3030;

app.use(cors(
));
app.use(express.json());



// const SqlDB = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "mill_project",
// });

const SqlDB = mysql.createConnection({
  host: '6cb.h.filess.io',
  // host: 'localhost',
  user: 'millproject_childgift',
  password: 'b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3',
  database: 'millproject_childgift',
  port: '3307',
  localAddress: 'mysql://millproject_childgift:b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3@6cb.h.filess.io:3307/millproject_childgift'
});

// SqlDB.connect((err) => {
//   if (err) throw err;
//   console.log("Connecte");
//   SqlDB.query((err, result)=> {
//     if (err) throw err;
//     console.log("Result: " + result);
//   });
// });

app.get("/rice", (req, res) => {
  SqlDB.query("SELECT * FROM Rice", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/", (req, res) => {
  res.send("start");
});

app.post('/admin/addrice', (req, res) => {
  category = req.body.category;
  res.send(`category => ${category}`);
  console.log(category)
})

// app.post('user/regis')

// app.post("/create", (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;

//   SqlDB.query(
//     "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   SqlDB.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   SqlDB.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Yey, your server is running on port ${PORT}`);
});