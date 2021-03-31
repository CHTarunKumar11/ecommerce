const exp = require("express");
const bcryptjs = require("bcryptjs");
const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userApiObj = exp.Router();


/*userApiObj.get("/getusers",asynchandler(async(req,res,next)=>{

    userCollectionObj = req.app.get("userCollectionObj");
    
    users = await userCollectionObj.find().toArray();
     res.send({message:users});
}))

userApiObj.get("/getuser/:username",verifyToken,asynchandler(async(req,res,next)=>{
    
    userCollectionObj = req.app.get("userCollectionObj");


    user = await userCollectionObj.findOne({username:req.params.username});
    res.send({message:"success",user:user});
}))*/


userApiObj.post("/register",asynchandler(async(req,res,next)=>{

    userCollectionObj = req.app.get("userCollectionObj");

    userObj = req.body;
    

    user = await userCollectionObj.findOne({username:userObj.username});
    if(user == null)
    {
        hashedpwd = await bcryptjs.hash(userObj.password,5);
        userObj.password = hashedpwd;

        await userCollectionObj.insertOne(userObj);
        res.send({message:"user successfully inserted"});
    }
    else{
        res.send({message:"user already existed"});
    }
}))

userApiObj.post("/login",asynchandler( async (req,res,next)=>{

    
    userCollectionObj = req.app.get("userCollectionObj");

    userCredObj = req.body;

    user = await userCollectionObj.findOne({username:userCredObj.username});

    if(user == null)
    {
        res.send({message:"Invalid Username"})
    }
    else
    {
        status = await bcryptjs.compare(userCredObj.password,user.password);
        if(status)
        {
            token = await jwt.sign({username:user.username},"abcd",{expiresIn:1000});
            res.send({message:"success",signedToken:token,username:user.username});
        }
        else{
            res.send({message:"Invalid Password"});
        }
    }
    

}))



/*userApiObj.put("/updateuser",upload.single('photo'),asynchandler(async(req,res,next)=>{

    userCollectionObj = req.app.get("userCollectionObj");

    userObj = JSON.parse(req.body.userObj);

    userObj.userImgLink = req.file.path;

    await userCollectionObj.update({username:userObj.username},{$set:{
        firstname:userObj.firstname,
        lastname:userObj.lastname,
        email:userObj.email,
        address:userObj.address,
        city:userObj.city,
        state:userObj.state,
        pincode:userObj.pincode,
        userImgLink:userObj.userImgLink
    }})
    res.send({message:"user successfully updated"});
}))

userApiObj.delete("/deleteuser/:username",asynchandler(async(req,res,next)=>{

    userCollectionObj = req.app.get("userCollectionObj");

    await userCollectionObj.remove({username:req.params.username});
    res.send({message:"user successfully deleted"});
}))

userApiObj.put("/resetPassword",asynchandler(async(req,res,next)=>{
    
    userCollectionObj = req.app.get("userCollectionObj");

    object = req.body;
    hashedpwd = await bcryptjs.hash(object.password1,5);

    await userCollectionObj.updateOne({username:object.username},{$set:{
        password:hashedpwd
    }});
    res.send({message:"success"});

}))*/






module.exports = userApiObj;