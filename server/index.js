var express = require("express");

// import { axios } from "axios";
var cors = require("cors");
var app = express();

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const jwt_decode = require("jwt-decode");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const tokenSignIn = "Login-new-rict-v1";
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const mysql = require("mysql");
const multer = require("multer");
const PORT = 3030;

const sqlConnect = mysql.createConnection({
  // timeout:100,
  host: "6cb.h.filess.io",
  user: "millproject_childgift",
  password: "b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3",
  database: "millproject_childgift",
  port: "3307",
  localAddress:
    "mysql://millproject_childgift:b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3@6cb.h.filess.io:3307/millproject_childgift",
});

// const sqlConnect = mysql.createConnection({
//   host: "us-east.connect.psdb.cloud",
//   user: "0uocyc7rjyedqjonkgee",
//   password: "pscale_pw_nsrVevuHV9KLonqur2G4a8oTnYVGozyMS6yHLAZ4LzA",
//   database: "new-mill",
//   localAddress:
//     'mysql://0uocyc7rjyedqjonkgee:pscale_pw_nsrVevuHV9KLonqur2G4a8oTnYVGozyMS6yHLAZ4LzA@us-east.connect.psdb.cloud/new-mill?ssl={"rejectUnauthorized":true}',
// });

// img storage confing
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/src/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `pdf-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isPDF = (req, file, callback) => {
  if (file.mimetype.startsWith("pdf")) {
    callback(null, true);
  } else {
    callback(null, Error("only pdf is allowd"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isPDF,
});

app.use(cors());

// -------------- login-----------------------------

app.post("/signUp", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    sqlConnect.query(
      "INSERT INTO Users (uid,name,phone,password,type,memberNum) VALUES (?,?,?,?,?,?)",
      [
        req.body.uid,
        req.body.name,
        req.body.phone,
        hash,
        req.body.type,
        req.body.memberNum,
      ],
      (err, result, fields) => {
        if (err) {
          res.json({ status: "error", message: err });
        } else {
          res.json({ status: "sucess" });
        }
      }
    );
    // Store hash in your password DB.
  });
});

app.post("/signIn", jsonParser, function (req, res, next) {
  sqlConnect.query(
    "SELECT * FROM `Users` WHERE phone=?",
    [req.body.phone],
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
              var token = jwt.sign(
                {
                  phone: users[0].phone,
                  uid: users[0].uid,
                },
                tokenSignIn
              );
              // alert(`this user id : ${users[0].uid}`)
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

app.post("/user", jsonParser, (req, res, next) => {
  if (req.body.userType != null) {
    sqlConnect.query(
      "SELECT * FROM Users  WHERE type=?",
      req.body.userType,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (req.body.phone != null) {
    sqlConnect.query(
      "SELECT * FROM Users  WHERE phone=?",
      req.body.phone,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    sqlConnect.query("SELECT * FROM Users", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});

app.post("/user/my-rice", jsonParser, (req, res, next) => {
  sqlConnect.query(
    "SELECT * FROM Users  WHERE uid=?",
    req.body.uid,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/rice/my-rice", jsonParser, (req, res) => {
  sqlConnect.query(
    "SELECT * FROM Rice WHERE RiceDepositor=?",
    req.body.RiceDepositor,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
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

app.post("/rice/temp", jsonParser, (req, res) => {
  sqlConnect.query(
    "SELECT * FROM Temp  WHERE RiceID=?",
    [req.body.RiceID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add-rice", jsonParser, function (req, res, next) {
  sqlConnect.query(
    "INSERT INTO Rice (RiceID,RiceDepositor,RiceCategory,RiceQuantity,RiceReturn,RiceEntryDate,RiceIssueDate) VALUES (?,?,?,?,?,?,?)",
    [
      req.body.RiceID,
      req.body.RiceDepositor,
      req.body.RiceCategory,
      req.body.RiceQuantity,
      req.body.RiceReturn,
      req.body.RiceEntryDate,
      null,
    ],
    (err, result, fields) => {
      if (err) {
        return res.json({ status: "error", message: err });
      } else {
        res.json({ status: "add ok" });
      }
    }
  );
});

app.post("/update-temp-rice", upload.single("RiceURL"), (req, res) => {
  const { filename } = req.file;

  // if (!RicePDF) {
  //   res.status(422).json({ status: 422, message: "fill all the details" });
  // }

  try {
    sqlConnect.query(
      "INSERT INTO Temp SET ?",
      {
        RiceID: req.body.RiceID,
        RiceDayCheck: req.body.RiceDayCheck,
        RiceO2: req.body.RiceO2,
        RiceMoisture: req.body.RiceMoisture,
        RiceURL: filename,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // res.send(result);
          res.json({ status: "UPDATE temp ok" });
        }
      }
    );
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
});

app.post("/rice/update", jsonParser, (req, res, next) => {
  sqlConnect.query(
    "SELECT * FROM `Rice` WHERE RiceID=?",
    [req.body.RiceID],
    (err, rice, fields) => {
      // console.log(req.body.RiceID);
      if (err) return res.json({ status: "error", message: err });
      else if (rice.length == 0)
        return res.json({ status: "error", messagee: "no users" });
      else {
        res.send(rice[0]);
      }
    }
  );
});

app.get("/search/user-admin", jsonParser, (req, res) => {
  sqlConnect.query(
    "SELECT uid,phone,memberNum,name FROM Users WHERE type='User'",
    (err, result) => {
      if (err) {
        res.send("search Err");
      } else {
        res.send(result);
      }
    }
  );
});

/////////////////////////////////////////////////////
app.get("/showrice", jsonParser, (req, res) => {
  sqlConnect.query(
    "SELECT COUNT(RiceReturn) 'AllRice',COUNT(IF(RiceReturn = 0,1,NULL)) 'onStock',COUNT(IF(RiceReturn = 1,1,NULL)) 'Returned' FROM Rice;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        // This result after query mysql.
        //   {
        //     "AllRice": 10,
        //     "onStock": 9,
        //     "Returned": 1
        // }
      }
    }
  );
});

app.get("/searchriceadmin", jsonParser, (req, res) => {
  sqlConnect.query("SELECT RiceID,RiceCategory FROM Rice", (err, result) => {
    if (err) {
      res.send("search Err");
    } else {
      res.send(result);
    }
  });
});

app.post("/login", jsonParser, (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  sqlConnect.query(
    "SELECT * FROM Users WHERE phone = ? AND password = ?",
    [phone, password],
    (err, result) => {
      if (err) {
        res.send("something wrong please check phone number or password");
      } else {
        res.send(result);
      }
    }
  );
});

// app.get('/decode', jsonParser, (req, res) => {
//   const decode = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAwMDAxIiwidWlkIjoieGFXRjdYbWxKZHl2NzU5TiIsImlhdCI6MTY3MDQ5MDA5NX0.jhFrujR8xDl7gyVNa-gdKj0tGO7IYajj6WPDVrZIMDk')
//   res.send(decode.uid)
//   console.log('dev = ' + decode)

// })

app.post("/searchriceuser", jsonParser, (req, res) => {
  const token = req.body.uid;
  const decode = jwt_decode(token);
  const uid = decode.uid;
  // res.send(decode.uid)
  sqlConnect.query(
    "SELECT * FROM Rice WHERE RiceDepositor LIKE ?",
    [uid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/////////////////////////////////////////////////////

app.listen(PORT, () =>
  console.log("CORS-enabled web server listening on port", PORT)
);
