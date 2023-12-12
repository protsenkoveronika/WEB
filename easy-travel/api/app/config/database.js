const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://127.0.0.1:27017/EasyTravel";

db.mongoose.connect(db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

module.exports = db;