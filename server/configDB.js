//- MYSQL Module
const mysql_npm = require("mysql");

// db = mysql.createConnection({
//    user: process.env.USER_DB,
//    password: process.env.PASSWORD_DB,
//    host: process.env.HOST_DB,
//    database: process.env.DATABASE,
// });

//-
//- Connection configuration
//-

// var db_config = {
//    user: process.env.USER_DB,
//    password: process.env.PASSWORD_DB,
//    host: process.env.HOST_DB,
//    database: process.env.DATABASE,
// };

// var db_config = {
//    user: "root",
//    password: "",
//    host: "localhost",
//    database: "qacedkmutnb",
// };

var db_config = {
    host: "6cb.h.filess.io",
    // host:'localhost',
    port: "3307",
    user: "millproject_childgift",
    password: "b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3",
    database: "millproject_childgift",
    localAddress:
      "mysql://millproject_childgift:b6864e2d23b4e4aa8fdc0c0cf88dbf7b868f55f3@6cb.h.filess.io:3307/millproject_childgift",
};

//-
//- Create the connection variable
//-
db = mysql_npm.createPool(db_config);

//-
//- Establish a new connection
//-
db.getConnection(function (err) {
   if (err) {
      // mysqlErrorHandling(connection, err);
      console.log("\n\t *** Cannot establish a connection with the database. ***");

      db = reconnect(db);
   } else {
      console.log("\n\t *** New connection established with the database. ***");
   }
});

//-
//- Reconnection function
//-
function reconnect(db) {
   console.log("\n New connection tentative...");

   //- Create a new one
   db = mysql_npm.createPool(db_config);

   //- Try to reconnect
   db.getConnection(function (err) {
      if (err) {
         //- Try to connect every 2 seconds.
         setTimeout(reconnect(db), 2000);
      } else {
         console.log("\n\t *** New connection established with the database. ***");
         return db;
      }
   });
}

//-
//- Error listener
//-
db.on("error", function (err) {
   //-
   //- The server close the connection.
   //-
   if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return reconnect(db);
   } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
      console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return reconnect(db);
   } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return reconnect(db);
   } else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
      console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
   } else {
      console.log("/!\\ Cannot establish a connection with the database. /!\\ (" + err.code + ")");
      return reconnect(db);
   }
});

//-
//- Export
//-
module.exports = db;