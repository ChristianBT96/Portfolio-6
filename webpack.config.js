const path = require('path');

module.exports = {
    entry: {
        home: ['./src/leaflet.js', './src/firestore.js', './src/index.js', "./src/db.js"],
        login: ['./src/firestore.js','./src/login.js', './src/index.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    }
};