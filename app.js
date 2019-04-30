/* Imports */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Database connection */

let url = "mongodb://localhost:27017/fulstack"
mongoose.connect(url, {useNewUrlParser: true})

let ProductSchema = new mongoose.Schema({
    name: String
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
    });
})


app.post("/api/deleteOne", ( req , res )=>{
    
    let condition = {

    }
    ProductModel.findOneAndDelete(condition,()=>{
        console.log("Deleted all")
    });
})


app.post("/api/addOne", ( req , res )=>{
    
    let newObject = {

    }
    let newProduct = new ProductModel(newObject)

    newProduct.save((err, Product)=>{
        if (err) return console.error(err);
        res.send(Product);
    })
})


app.post("/api/all", ( req , res )=>{
    
    let newObject =

    ProductModel.find({},(err, records)=>{
        res.send(records)
    })
})

app.post("/api/findone", ( req , res )=>{
    
    let  id = req.body.id;

    ProductModel.findById(id, ()=>{
        console.log("Find One")
    });
})







/* Spin Server */

mongoose.connection.once("open",()=>{
    console.log("Data Base Connected")
    app.listen(3000,()=>{
        console.log("Running on port 3000")
    });

    const Cat = mongoose.model('Cat', { name: String });
    const kitty = new Cat({ name: 'Zildjian' });
    Cat.deleteMany({},()=>{
        console.log("Deleted all")
    });
    kitty.save().then(() => {
        Cat.find({},(err, Cname)=>{
            console.log(Cname);
        })


    });


})
/* MongoDB connection error */
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
















