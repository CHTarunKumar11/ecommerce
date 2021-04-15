const exp = require("express");
const app = exp();
const mongodb = require("mongodb").MongoClient;
const path = require("path");

require("dotenv").config();

app.use(exp.static(path.join(__dirname,"./dist/ecommerceapp")));

app.use(exp.json());

const userApiObj = require("./APIs/userApi");
const productApiObj = require("./APIs/productApi");
const cartApiObj = require("./APIs/cartApi");

app.use("/user",userApiObj);
app.use("/product",productApiObj);
app.use("/cart",cartApiObj)

const dburl="mongodb+srv://project:project@cluster0.2o9tz.mongodb.net/MyAppDatabase?retryWrites=true&w=majority"

mongodb.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(
    client => {
        dbObj = client.db("MyAppDatabase");
        userCollectionObj = dbObj.collection("usercollection");
        productCollectionObj = dbObj.collection("productcollection");
        cartCollectionObj = dbObj.collection("cartcollection");

        app.set("userCollectionObj",userCollectionObj);
        app.set("productCollectionObj",productCollectionObj);
        app.set("cartCollectionObj",cartCollectionObj);
        
        console.log("connected to database");
    }
)
.catch(error => console.log("error in db connection",error));

app.use((req,res,next)=>{
    res.send({message:req.url+" is invalid"});
})

app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send({message:"error occured",reason:err.message});
})

const port = process.env.PORT;

app.listen(process.env.PORT,()=>console.log(`Server started on port ${port}`));
