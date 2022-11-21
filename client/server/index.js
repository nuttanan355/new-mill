var express = require("express");
var cors = require("cors");
var app = express();

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const tokenSignIn = "Login-new-rict-v1";
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const mysql = require("mysql");
const PORT = 3030;

const sqlConnect = mysql.createConnection({
  host: "6cb.h.filess.io",
  // host: 'localhost',
  user: "millproject_childgift",
  password: "b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3",
  database: "millproject_childgift",
  port: "3307",
  localAddress:
    "mysql://millproject_childgift:b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3@6cb.h.filess.io:3307/millproject_childgift",
});

app.use(cors());

// -------------- login-----------------------------

app.post("/signUp", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    sqlConnect.query(
      "INSERT INTO Users (uid,name,phone,password,type) VALUES (?,?,?,?,?)",
      [req.body.uid, req.body.name, req.body.phone, hash, req.body.type],
      (err, result, fields) => {
        if (err) {
          return res.json({ status: "error", message: err });
        } else {
          res.json({ status: "Sign Up ok" });
        }
      }
    );
    // Store hash in your password DB.
  });
});

app.post("/signIn", jsonParser, function (req, res, next) {
  sqlConnect.query(
    "SELECT * FROM `Users` WHERE phone=?",[req.body.phone],
    (err, users, fields) => {
      if (err) return res.json({ status: "error", message: err });
      else if (users.length == 0)
        return res.json({ status: "error", messagee: "no users" });
      else {
        bcrypt.compare(
          req.body.password,
          users[0].password,
          (err, isSignIn) => {
            if (isSignIn) {
              var token = jwt.sign({ phone: users[0].phone }, tokenSignIn);
              res.json({
                status: "ok",
                message: "Sign In Success",
                token,
                type: users[0].type,
              });
            } else {
              res.json({ status: "ERROR", message: "Error Sign In" });
            }
          }
        );
      }
    }
  );
});

app.post("/authen", jsonParser, (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, tokenSignIn);
    res.json({ status: "ok", message: decoded });
  } catch (err) {
    res.json({ status: "Error", message: message.err });
  }
});

app.get("/user", jsonParser, (req, res, next) => {
  sqlConnect.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/rice", jsonParser, (req, res) => {
  sqlConnect.query("SELECT * FROM Rice", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/type", jsonParser, (req, res) => {
  sqlConnect.query("SELECT * FROM Type", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add-rice", jsonParser, function (req, res, next) {
  
  sqlConnect.query(
    "INSERT INTO Rice (RiceID,RiceDepositor,RiceCategory,RiceQuantity,RiceReturn,RiceTemp) VALUES (?,?,?,?,?,?)",
    [req.body.RiceID, req.body.RiceDepositor, req.body.RiceCategory, req.body.RiceQuantity, req.body.RiceReturn,null],
    (err, result, fields) => {
      if (err) {
        return res.json({ status: "error", message: err });
      } else {
        res.json({ status: "INSERT ok" });
      }
    }
  );
});

app.post("/update-temp-rice", jsonParser,(req, res) => {
  sqlConnect.query(
    "INSERT INTO Temp (RiceID,RiceDayCheck,RiceO2,RiceMoisture) VALUES (?,?,?,?)",
    [req.body.RiceID,req.body.RiceDayCheck,req.body.RiceO2,req.body.RiceMoisture],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send(result);
        res.json({ status: "UPDATE temp ok" });
      }
    }
  );
});


app.get("",jsonParser,(req,res,next)=>{
sqlConnect.query(
  ""
)
});

app.listen(PORT, () =>
  console.log("CORS-enabled web server listening on port", PORT)
);
