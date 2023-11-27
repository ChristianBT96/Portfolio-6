//This is the boilerplate code to write a simple web-server with the express.js framework
const express = require('express');
// npm install mysql2 --save
const mysql = require('mysql2');
// npm install cors --save
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//  Host, user, password, database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'Detgrey432123',
    database: "pokemon"
});

const error404 = '404 not found'

// A) /all
// Create an end point that displays all data of all pokemon
app.get('/all', (req, res) => {
    connection.query('select * from pokemon',(reportError,  results) => {
        res.send(results);
    });
});
