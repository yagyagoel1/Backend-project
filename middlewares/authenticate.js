const {jwtsecretkey} = require("../config")
const jwt =require("jsonwebtoken")
function middleware(req,res,next)
{
try{
  const ver =   jwt.verify(req.headers.authorization,jwtsecretkey);
  if(ver.username)
  {
    next();
  }
  else
  {
    res.status(409).json({
        msg : "connot verify user"
    });
  }
}
catch(e)
{
    res.status(409).json({
        msg : "connot verify user"
    });
}
}



module.exports={
    middleware
}