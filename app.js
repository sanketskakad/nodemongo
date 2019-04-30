/* Imports */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/* CORS */

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

app.use(allowCrossDomain);

/* Database connection */

let url = "mongodb://localhost:27017/fulstack"
mongoose.connect(url, {useNewUrlParser: true})

let ProductSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const ProductModel = mongoose.model('ProductModel', ProductSchema);



/* GET Routes Handling */
app.get("/", function(req, res){

    res.send("<h1>Hello World </h1>")

})


/* POST Routes Handling */


app.post("/api/deleteAll", (req,res)=>{
    ProductModel.deleteMany({},()=>{
        console.log("Deleted all")
        res.end();
    });
})


app.post("/api/deleteOne", ( req , res )=>{
    
    let condition = {
        _id : req.body.id,
    }
    //console.log(condition)
    ProductModel.findOneAndDelete(condition,(err, Product)=>{
        if (err) return console.error(err);
        res.send(Product);
        console.log(Product)
    });
})


app.post("/api/addOne", ( req , res )=>{
    
    let newObject = JSON.parse(JSON.stringify(req.body));
    console.log(newObject)
    let newProduct = new ProductModel(newObject)
    console.log(newProduct)
    newProduct.save((err, Product)=>{
        if (err) return console.error(err);
        res.send(Product);
    })
})


app.post("/api/all", ( req , res )=>{
    
    //let newObject =

    ProductModel.find({},(err, records)=>{
        res.send(records)
    })
})

app.post("/api/findone", ( req , res )=>{
    
    let  id = req.body.id;

    ProductModel.findById(id, (err, Product)=>{
        if (err) return console.error(err);
        res.send(Product);
    });
})







/* Db Connection Test */

mongoose.connection.once("open",()=>{
    console.log("Data Base Connected")

    /* Spin Server */
    app.listen(3000,()=>{
        console.log("Running on port 3000")
    });
})



/* MongoDB connection error */
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
















