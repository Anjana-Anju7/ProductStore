import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/api/products',async(req, res)=>{
    console.log(process.env.MONGO_URI);
   const product = req.body;

   if(!product.name || !product.price || !product.image){
    return res.status(400).json({message:"Please fill all the fields"});
   }
const newProduct = new Product(product);
try {
    await newProduct.save();
    res.status(201).json({sucess:true ,data:newProduct});
} catch (error) {
    console.error("Error in create product:",error.message);
    res.status(500).json({sucess:false,message:"Internal server error"});
}

})


app.listen(5000,()=>{
    connectDB();
    console.log("Server is running on  5000"); 
})
