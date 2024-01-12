const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const {usermodel,errormodel} = require("../db/database.js");
const { jwtsecretkey } = require("../config.js");




router.post("/userRegistration",async(req,res,next)=>{
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
        

        res.status(200).json({
            msg : " user created successfully",
            
        });
    }

})
router.post("/userlogin",async(req,res,next)=>{
await bycrypt.hash(req.body.password,10,async(err,hashedpass)=>{
    if(!err)
    {
        const check = await usermodel.findOne({
            username : req.body.username,
            password : hashedpass
        });
        if(check)
        {
           const token= await jwt.sign({username: req.body.username,email : req.body.email},jwtsecretkey);
           if(token)
           {
            req.status(200).json({
                msg : "successfully logged in",
                token : token
            });
           }
           else
           {
            req.status(500).json({
                msg : "oops! something went wrong"
            });
           }
        }
        else
        {
            req.status(409).json({
                msg : "wrong username or password"
            });
        }
    }
    else{
    req.status(500).json({
        msg : "oops! something went wrong"
    });}
})
   
})




module.exports = router;
