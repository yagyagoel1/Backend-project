const express = require("express");
const app = express();
const user = require("routes/auth.js")
const task = require
app.use(express.json());
//listening to any user req routes
app.use("/user",user);
 //listening to any task req routes
app.use("/tasks",task);

//error handling 
app.use(async(err,req,res,next)=>{
    const result  = await  errormodel.updateOne({
        errorlog : err
    },
    {
        $inc : {
            count : 1
        }
    });
    if(!result)
    {
        await errormodel.create({
            username : jwt.decode(req.headers.authorization).username,
            errorlog : err,
            count : 1
        })
    }
    res.status(500).json({
        msg : "something went wrong"
    });
})
const PORT = process.env.PORT||3000
app.listen(PORT,()=>
{
    console.log("listening on port ${PORT}");
})
