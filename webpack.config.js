const path = require('path');

module.exports = {
    entry: ['./src/firestore.js', './src/index.js', './src/leaflet.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }
};