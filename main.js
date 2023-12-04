// ------------------------------------------------- ACCESS JS LIBARIES
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// Hej
// ------------------------------------------------- CREATE CONNECTION
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

//  Host, user, password, database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '****', // WRITE YOUR OWN LOCAL PASSWORD <<------------------
    database: "world_of_pictures"
});

// ------------------------------------------------- USER ID
// SELECT USER TO SEE DATA FOR THAT USER <<-----------------------
// Supposedly, the user that is logged in should only see their own photos
const userID = 1;


// ------------------------------------------------- GET REQUESTS
// -------------------------------------------- GET ALL PICTURES FROM USER
app.get('/pictures', (req, res) => {
    let query = `SELECT * FROM pictures WHERE user_id = ${userID}`;

    if (req.query) {
        let queryParameters = lookupQueryParameters(req.query)
        if (queryParameters.includes('Error')) {
            return res.send(queryParameters);
        }
        else {
            query += queryParameters;
        }
    }


    console.log(query)
    connection.query(query,(reportError,  results) => {
        if (results.length > 0) {
            return res.send(results);
        }
        else {
            return res.send('Error 404: No pictures found');
        }
    });
});
// -------------------------------------------- GET PICTURE WITH SPECIFIC ID
app.get('/pictures/:pictureID', (req, res) => {
    const parameterFromClient = errorChecker(req.params.pictureID, 'number');

    if (parameterFromClient.includes('Error')) {
        return res.send(parameterFromClient);
    }

    let query = `SELECT * FROM pictures WHERE user_id = ${userID} AND picture_id = ?`
    console.log(query)
    connection.query(query, [parameterFromClient], (reportError,  results) => {
        if (results.length > 0) {
            return res.send(results);
        }
        else {
            return res.send('Error 404: Requested picture id does not exist');
        }
    });
});
// -------------------------------------------- GET ALL ALBUMS FROM USER
app.get('/albums', (req, res) => {
    let query = `SELECT * FROM albums WHERE user_id = ${userID}`
    console.log(query)
    connection.query(query,(reportError,  results) => {
        if (results.length > 0) {
            return res.send(results);
        }
        else {
            return res.send('Error 404: No albums exist');
        }
    });
});
// -------------------------------------------- GET ALL PICTURES FROM SPECIFIC ALBUM
// Example: http://localhost:3000/albums/going-merry
app.get('/albums/:albumName', (req, res) => {
    let parameterFromClient = errorChecker(req.params.albumName, 'string');

    if (parameterFromClient.includes('Error')) {
        return res.send(parameterFromClient);
    }

    let query = `SELECT * FROM pictures INNER JOIN albums USING (album_id) WHERE albums.user_id = ${userID} AND album_name = "${parameterFromClient}"`

    if (req.query) {
        let queryParameters = lookupQueryParameters(req.query)
        if (queryParameters.includes('Error')) {
            return res.send(queryParameters);
        }
        else {
            query += queryParameters;
        }
    }
    
    console.log(query)
    connection.query(query, (reportError,  results) => {
        if (results.length > 0) {
            return res.send(results);
        }
        else {
            return res.send('Error 404: Requested album name does not exist or is empty');
        }
    });
});
// -------------------------------------------- GET ALL FAVOURITE PICTURES
app.get('/favourites', (req, res) => {
    let query = `SELECT * FROM pictures WHERE user_id = ${userID} AND favourite = true`

    if (req.query) {
        let queryParameters = lookupQueryParameters(req.query)
        if (queryParameters.includes('Error')) {
            return res.send(queryParameters);
        }
        else {
            query += queryParameters;
        }
    }

    console.log(query)
    connection.query(query, (reportError, results) => {
        if (results.length > 0) {
            return res.send(results);
        }
        else {
            return res.send('Error 404: No favourites found');
        }
    });
});

// ------------------------------------------------- POST
// -------------------------------------------- CREATE NEW ALBUM
app.post('/new-album', (req, res) => {
    const albumName = errorChecker(req.body.album_name, 'string');

    if (albumName.includes('Error')) {
        return res.send(albumName);
    }

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let keys = ['album_name', 'date_created', 'user_id'];
    let values = [albumName, date, userID];

    let query = `SELECT album_name FROM albums WHERE user_id = ${userID};`
    console.log(query);
    connection.query(query, (err, result) => {
        let names = [];
        result.forEach(name => {
            names.push(Object.values(name).toString().toLowerCase());
        })

        if (names.includes(albumName.toLowerCase())) {
            return res.send('Error: Unsuccessfull POST request. Album already exists');
        }
        else {
            query = `INSERT INTO albums (${keys.join(", ")}) VALUES (${values.map(v => `'${v}'`).join(", ")})`;
            console.log(query);
            connection.query(query, (err, result) => {
                console.log(result);
                return res.send("Successful POST request");
            });
        }
    });

});
// -------------------------------------------- ADD NEW PICTURES
app.post('/new-pictures', (req, res) => {
    let keys = ['img_name', 'img_path', 'date_created', 'alt_text', 'tags', 'city', 'country', 'album_id', 'favourite', 'user_id'];
    let values = errorChecker(req.body, 'new-pictures', keys.length - 1);

    if (values.includes('Error')) {
        return res.send(values);
    }

    let query = `INSERT INTO pictures (${keys.join(", ")}) VALUES ${values}`;
    console.log(query)

    connection.query(query, (err, result) => {
        if (result) {
            console.log(result);
            return res.send("Successful POST request");
        }
        else {
            return res.send('Error: Unsuccessfull POST request');
        }
    });
});
// -------------------------------------------- ADD PICTURE TO FAVOURITES
app.post('/add-favourite', (req, res) => {
    let pictureID = errorChecker(req.body.picture_id.toString(), 'number');

    if (pictureID.includes('Error')) {
        return res.send(pictureID);
    }

    let query = `SELECT IF((SELECT user_id FROM pictures WHERE picture_id = ${pictureID}) = ${userID}, true, false) as valid;`
    console.log(query);
    connection.query(query, (err, result) => {
        if (result[0].valid === 1) {
            query = `UPDATE pictures SET favourite = true WHERE picture_id = ${pictureID};`
            console.log(query);
            connection.query(query, (err, result) => {
                console.log(result);
                return res.send("Successful POST request");
            });
        }
        else {
            return res.send('Error: Unsuccessfull POST request');
        }
    });
});
// -------------------------------------------- REMOVE PICTURE FROM FAVOURITES
app.post('/remove-favourite', (req, res) => {
    let pictureID = errorChecker(req.body.picture_id.toString(), 'number');

    if (pictureID.includes('Error')) {
        return res.send(pictureID);
    }

    let query = `SELECT IF((SELECT user_id FROM pictures WHERE picture_id = ${pictureID}) = ${userID}, true, false) as valid;`
    console.log(query);
    connection.query(query, (err, result) => {
        if (result[0].valid === 1) {
            query = `UPDATE pictures SET favourite = false WHERE picture_id = ${pictureID};`
            console.log(query);
            connection.query(query, (err, result) => {
                console.log(result);
                return res.send("Successful POST request");
            });
        }
        else {
            return res.send('Error: Unsuccessfull POST request');
        }
    });
});
// -------------------------------------------- MOVE PICTURE TO ANOTHER ALBUM
app.post('/move-picture', (req, res) => {
    let pictureID = errorChecker(req.body.picture_id.toString(), 'number');

    if (pictureID.includes('Error')) {
        return res.send(pictureID);
    }

    let albumName = errorChecker(req.body.album_name.toString(), 'string');

    if (albumName.includes('Error')) {
        return res.send(albumName);
    }

    let query = `SELECT IF((SELECT user_id FROM pictures WHERE picture_id = ${pictureID}) = ${userID}, true, false) as valid;`
    console.log(query);
    connection.query(query, (err, result) => {
        if (result[0].valid === 1) {
            query = `UPDATE pictures SET album_id = (SELECT album_id FROM albums WHERE album_name = "${albumName}" AND user_id = ${userID}) WHERE picture_id = ${pictureID};`
            console.log(query);
            connection.query(query, (err, result) => {
                console.log(result);
                return res.send("Successful POST request");
            });
        }
        else {
            return res.send('Error: Unsuccessfull POST request');
        }
    });
});
// -------------------------------------------- RENAME ALBUM
app.post('/rename-album', (req, res) => {
    let albumName = errorChecker(req.body.album_name, 'string');

    if (albumName.includes('Error')) {
        return res.send(albumName);
    }
    let newName = errorChecker(req.body.new_name, 'string');

    if (newName.includes('Error')) {
        return res.send(newName);
    }

    // let query = `SELECT IF("${albumName}" IN (SELECT album_name FROM albums WHERE user_id = ${userID}), , false) as valid;`
    let query = `SELECT album_name FROM albums WHERE user_id = ${userID};`
    console.log(query);
    connection.query(query, (err, result) => {
        let names = [];
        result.forEach(name => {
            names.push(Object.values(name).toString().toLowerCase());
        })
        console.log(names)
        console.log(names.includes(newName.toLowerCase()))
        if (names.includes(albumName.toLowerCase()) === false) {
            return res.send('Error: Unsuccessfull POST request. Album does not exists');
        }
        else if (names.includes(newName.toLowerCase())) {
            return res.send('Error: Unsuccessfull POST request. Album name already exists');
        }
        else {
            query = `UPDATE albums SET album_name = "${newName}" WHERE album_name = "${albumName}" AND user_id = ${userID};`
            console.log(query);
            connection.query(query, (err, result) => {
                console.log(result);
                return res.send("Successful POST request");
            });
        }

    });
});

// ------------------------------------------------- 404
// -------------------------------------------- ALL OTHER ROUTES
app.get('*', (req, res) => {
    return res.send('Error 404: Page not found');
});

// ------------------------------------------------- FUNCTIONS
// -------------------------------------------- ARRAY ERROR CHECKER
// Makes sure that the array/object fits with the db table
function arrayErrorChecker(data, keysAmount) {
    if (data.constructor === Array && data.length !== keysAmount) {
        if (data[0]) {
            data = data[0];
            arrayErrorChecker(data, keysAmount);
        }
        return 'error';
    }
    else if (data.constructor === Object && Object.keys(data).length !== keysAmount) {
        return 'error';
    }
    else {
        return formatObject(data);
    }
}
// -------------------------------------------- ERROR CHECKER
// Checks the client parameter to make sure it fits with the query
function errorChecker(clientParameter, type, arrayLength) {
    // Checks if the id is a number
    if (type === 'number') {
        if (!!clientParameter.match(/^\d+/)) {
            return clientParameter.match(/^\d+/)[0];
        }
        else {
            return 'Error 404: Requested id does not exist';
        }
    }
    else if (type === 'string') {
        if (typeof clientParameter === type) {
            return formatString(clientParameter);
        }
        else {
            return 'Error 404: Requested item does not exist';
        }
    }
    else if (type === 'year') {
        if (typeof clientParameter === 'string' && isValidYear(clientParameter)) {
            return clientParameter;
        }
        else {
            return `Error 404: Requested ${type} has no pictures`;
        }
    }
    else if (type === 'month') {
        if (clientParameter.length < 2) {
            clientParameter = '0' + clientParameter;
        }

        if (typeof clientParameter === 'string' && isValidMonth(clientParameter)) {
            return clientParameter;
        }
        else {
            return `Error 404: Requested ${type} has no pictures`;
        }
    }
    else if (type === 'day') {
        if (clientParameter.length < 2) {
            clientParameter = '0' + clientParameter;
        }

        if (typeof clientParameter === 'string' && isValidDay(clientParameter)) {
            return clientParameter;
        }
        else {
            return `Error 404: Requested ${type} has no pictures`;
        }
    }
    else if (type === 'new-pictures') {
        // https://www.w3schools.com/js/js_typeof.asp
        if (clientParameter.constructor === Array) {
            let values = []
            clientParameter.forEach(picture => {
                const object = arrayErrorChecker(picture, arrayLength);
                if (object === 'error') {
                    return 'Error 404: Input does not have the right amount of values';
                }
                else {
                    values.push(object);
                }
            });
            return values.join(', ');
        }
    }
}

function isValidYear(year) {
    // The double exclamation operator converts an Object to Boolean.
    // This happens such that “falsy” objects become false and “truthy” objects become true.
    return !!year.match(/^\d{4}$/g &&  parseInt(year) > 0);
}
function isValidMonth(month) {
    // The double exclamation operator converts an Object to Boolean.
    // This happens such that “falsy” objects become false and “truthy” objects become true.
    return !!(month.match(/^\d{2}$/g) && parseInt(month) < 12 && parseInt(month) > 0);
}
function isValidDay(day) {
    // The double exclamation operator converts an Object to Boolean.
    // This happens such that “falsy” objects become false and “truthy” objects become true.
    return !!(day.match(/^\d{2}$/g) && parseInt(day) < 31 && parseInt(day) > 0);
}

function formatString(string) {
    return string.replaceAll('-', ' ');
}

function formatObject(picture) {
    let string = '(';
    for (let key in picture) {
        if (typeof picture[key] === 'string') {
            string += `\"${picture[key]}\",`
        } else {
            string += `${picture[key]},`
        }

    }
    string += `${userID},`
    string = string.slice(0, -1) + ')';

    return string;
}

function lookupQueryParameters(query) {
    let addToQuery = '';

    if (query.city) {
        const q = errorChecker(query.city, 'string');
        if (q.includes('Error')) {
            return q;
        }
        else {
            addToQuery += ` AND city = '${q}'`;
        }
    }
    if (query.country) {
        const q = errorChecker(query.country, 'string');
        if (q.includes('Error')) {
            return q;
        }
        else {
            addToQuery += ` AND country = '${q}'`;
        }
    }
    if (query.tag) {
        const q = errorChecker(query.tag, 'string');
        if (q.includes('Error')) {
            return q;
        }
        else {
            addToQuery += ` AND tags LIKE ('%${q}%')`;
        }
    }
    if (query.year) {
        const q = errorChecker(query.year, 'year');
        if (q.includes('Error')) {
            return q;
        }
        else {
            addToQuery += ` AND YEAR(date_created) = ${q}`;
        }
    }
    if (query.month) {
        let q = errorChecker(query.month, 'month');
        if (q.includes('Error')) {
            return q;
        }
        else {
            addToQuery += ` AND MONTH(date_created) = ${q}`;
        }
    }
    if (query.day) {
        const q = errorChecker(query.day, 'day');
        if (q.includes('Error')) {
            return q;
        }
        else {
            addToQuery += ` AND DAY(date_created) = ${q}`;
        }
    }
    return addToQuery;
}
