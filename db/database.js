const mongoose = require("mongoose");
const {connectionString} = require("../config.js");
//connecting to my mongodb database
mongoose.connect(connectionString);
//creating schema for user and my error log
const Userschema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
});
const errorSchema = new mongoose.Schema({
    username : String,
    
    errorlog : String, 
    count : Number
})
//creating model
const usermodel = mongoose.model("User",Userschema);

const errormodel = mongoose.model("Error",errorSchema);


module.exports = {
    usermodel,
    errormodel
}
