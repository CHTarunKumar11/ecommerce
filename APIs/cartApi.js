const exp = require("express");
const asynchandler = require("express-async-handler");

cartApiObj = exp.Router();


cartApiObj.post("/add",asynchandler(async(req,res,next)=>{

    cartCollectionObj = req.app.get("cartCollectionObj");

    obj = req.body;

    cartObj = await cartCollectionObj.findOne({$and:[{id:obj.id},{username:obj.username}]} );
    if(cartObj == null)
    {
        await cartCollectionObj.insertOne(obj);
        res.send({message:"Added to cart"});
    }
    else{
        res.send({message:"Item is already in the cart"});
    }
}))

cartApiObj.get("/useritems/:username",asynchandler(async(req,res,next)=>{

    cartCollectionObj = req.app.get("cartCollectionObj");

    objects = await cartCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:objects});
}))

cartApiObj.delete("/delete/:id",asynchandler(async(req,res,next)=>{

    cartCollectionObj = req.app.get("cartCollectionObj");
    
    objects = await cartCollectionObj.removeOne({id:req.params.id});
    res.send({message:"Item deleted successfully"});
}))



module.exports = cartApiObj;