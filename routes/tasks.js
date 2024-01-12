const express  = require("express");

const router = express.Router();
const bcrypt = require("bcrypt")
const {taskmodel,errormodel, usermodel} = require("../db/database.js");
const { jwtsecretkey } = require("../config.js");
const { authenticateMiddleware } = require("../middlewares/authenticate.js");

router.post("/create",authenticateMiddleware,async(req,res,next)=>{
    const users = req.body.users;
    //here i have assumed users is the array of users 
    //that are associated with the tasks
    let userids;
    users.forEach(async (user) => {
        userids.push(usermodel.findOne({
            username : user
        })._id);

    });
    await taskmodel.create({
        title : req.body.title,
        description : req.body.description,
        completed : false,
        user : userids
    });
    res.status(200).json({
        msg : "task added successfully"
    })
})

router.post("/update/:taskid",authenticateMiddleware,async(req,res,next)=>{
    try{
        await req.params.taskid;
        const update = taskmodel.findByIdAndUpdate(
        taskid,
        {
            title : req.body.title,
            description : req.body.description
        });
        res.status(200).json({
            msg : "task updated successfully"
        });
    }
    catch(e){
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
    }
});
router.get("/fetch",authenticateMiddleware,async(req,res,next)=>{
    
    try{
        const task = await taskmodel.findOne({title :req.body.title});
        //to get the username of all the user assigned to it
       let username = task.user.forEach(userid=>{
            return usermodel.findById(userid).username;
        })
        res.status.json({
            title: task.title,
            description : task.description,
            completed  : task.completed,
            users : username
        })
    } 
    catch(e)
    {
        console.log("error");
    }
});
router.post("/delete",authenticateMiddleware,async(req,res,next)=>{
    const title = req.body.title;
    taskmodel.deleteOne({
        title : title
    });
    res.status.json({
        msg : "task deleted successfully"
    })
})











//error handling 




module.exports = router;