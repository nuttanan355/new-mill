const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const sqlDB = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:'',

});