const exp = require("express");
const asynchandler = require("express-async-handler");

productApiObj = exp.Router();

const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: "dqxtqhler",
    api_key: "215412722941721",
    api_secret: "E8EosYg2ofVz5BVgig_xHrnXzBk"

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "eCommerce",
        format: async (req,file) => 'png',
        public_id: (req,file) => file.fieldname + '-' + Date.now()
    }
});

var upload = multer({storage: storage});


productApiObj.post("/addproduct",upload.single('photo'),asynchandler(async(req,res,next)=>{

    productCollectionObj = req.app.get("productCollectionObj");

    productObj = JSON.parse(req.body.productObj);
    
    productObj.ImgLink = req.file.path;

    await productCollectionObj.insertOne(productObj);
    res.send({message:"product is added"});
}))

productApiObj.get("/getproducts",asynchandler(async(req,res,next)=>{

    productCollectionObj = req.app.get("productCollectionObj");

    products = await productCollectionObj.find().toArray();

    res.send({message : products});
}))

productApiObj.get("/getproductbyid/:id",asynchandler(async(req,res,next)=>{

    productCollectionObj = req.app.get("productCollectionObj");
    
    product = await productCollectionObj.findOne({id:req.params.id});
    res.send({message:"success",product:product});
}))


productApiObj.put("/updateproduct",upload.single('photo'),asynchandler(async(req,res,next)=>{

    productCollectionObj = req.app.get("productCollectionObj");

    productObj = JSON.parse(req.body.productObj);

    productObj.ImgLink = req.file.path;

    await productCollectionObj.update({id:productObj.id},{$set:{
        productname:productObj.productname,
        modelno:productObj.modelno,
        description:productObj.description,
        brandName:productObj.brandName,
        price:productObj.price,
        ImgLink:productObj.ImgLink
    }})
    res.send({message:"product successfully updated"});
}))

productApiObj.delete("/deleteproduct/:id",asynchandler(async(req,res,next)=>{

    productCollectionObj = req.app.get("productCollectionObj");
    
    await productCollectionObj.removeOne({id:req.params.id});
    res.send({message:"product deleted successfully"});
}))



module.exports = productApiObj;