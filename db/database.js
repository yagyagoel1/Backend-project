const mongoose = require("mongoose");
const {connectionString} = require("../config.js");
//connecting to my mongodb database
mongoose.connect(connectionString);
const Userschema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
});
const usermodel = mongoose.model("User",Userschema);
module.exports = {
    usermodel
}