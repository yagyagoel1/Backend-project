const express = require("express");
const app = express();
const bcrypt = require("bcrypt")
const {usermodel,errormodel} = require("../db/database.js");
const { jwtsecretkey } = require("../config.js");



app.post("/userRegistration",async(req,res,next)=>{
    const {username,password,email} = req.body;
    const result  =  await usermodel.findOne({
        username : username
    });
    if(result)
    {
        res.status(409).json({
            msg : "user already exist"
        });
    }
    else
    {
        bcrypt.hash(password,10,async (err,hashpass)=>
        {
            if(err)
            {
                res.status(400).json({msg : "something went wrong"});
            }
            else
            {
                await usermodel.create({
                    username : username,
                    email : email,
                    password : hashpass

                });
                
            }
        });
        const jwttoken = jwt.sign({
            username,email
        },jwtsecretkey);
        res.status(200).json({
            msg : " user created successfully",
            token : jwttoken
        });
    }

})


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

app.listen(3000,()=>{
    console.log("listening on port 3000")
});