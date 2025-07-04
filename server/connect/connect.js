const mongoose = require("mongoose")
async function connect(){
    try{
        await mongoose.connect("mongodb://localhost:27017/testDB")
        console.log("connecting to the database is successfull")
    }catch(err){
        console.log("something went wrong when connecting to the database " , err)
    }
}

module.exports = connect