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
const taskSchema =  new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean,
    user : [ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
})
//creating model
const usermodel = mongoose.model("User",Userschema);

const errormodel = mongoose.model("Error",errorSchema);
const taskmodel = mongoose.model("Task",taskSchema);

module.exports = {
    usermodel,
    errormodel,
    taskmodel
}
