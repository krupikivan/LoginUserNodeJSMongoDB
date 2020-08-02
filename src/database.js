const mongoose = require("mongoose");

const { MongoClient } = require('mongodb');

require('dotenv').config();
// mongoose.set('useFindAndModify', false);
mongoose.connect(
    process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}
)
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));