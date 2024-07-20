const mongooose = require('mongoose');
require('dotenv').config();
mongooose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connection Successfull...")
})
.catch((err)=>{
    console.log("We Got An error i.e :")
    console.log(err)
})

const db = mongooose.connection;
module.exports = db