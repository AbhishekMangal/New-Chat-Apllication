const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async()=> {
    try {
        // console.log("c");
        await mongoose.connect(process.env.mongo_url);
        console.log("Connected Succefully");
    } catch (error) {
        console.error(error.message)
    }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = connectToMongo;