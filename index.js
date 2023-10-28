const express = require('express');
require('./config');
const Product = require('./product');

const app = express();
app.use(express.json());

app.post("/create", async (req, res) => {
    try {
        const data = new Product(req.body);
        const result = await data.save();
        res.send('result');
        console.log(result);
    }
    catch (error) {
        res.status(500).send('Error saving data: ' + error.message);
    }
});

app.get("/list", async (req, res)=>{
    try{
        const data = await Product.find();
        res.send(data);
        console.log(data);
    }
    catch(error){
        res.status(500).send('Error saving data: ' + error.message);
    }
});

app.delete("/delete/:_id", async (req, res)=>{
    try{
        const data = await Product.deleteOne(req.params);
        res.send(data);
        console.log(req.params);
    }
    catch(error){
        res.status(500).send('Error saving data: ' + error.message);
    }
});

app.put('/update/:_id',async(req, res)=>{
    try{
        console.log(req.params);
        const data = await Product.updateOne(
            req.params,
            {
                $set:req.body
            }
        );
        res.send('updated');
        console.log('updated');
    }
    catch(error){
        res.status(500).send('Error saving data: ' + error.message);
    }
})
app.listen('5000');
