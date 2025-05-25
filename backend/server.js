import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/products",async(req,res)=>{
  try {
    const products = await Product.find({});
    res.status(200).json({success:true, data:products});
  } catch (error) {
    console.log("error fetching products",error.message);
    res.status(500).json({success:false, message:"Server Error"});
  }
})

app.post('/api/products',async(req, res)=>{
     
  const product = req.body;
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success: false, message:"Please provide all the fields"});
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({success: true,data:newProduct});
  } catch (error) {
    console.error("Error in create Product", error.message);
    res.status(500).json({success:false, message:"Server Error"});
  }
})
 
app.delete("/api/products/:id",async(req, res)=>{
  const {id} = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true, message:"Product deleted"});
  } catch (error) {
    console.log("error in deleting product",error.message);
    res.status(404).json({success:false, message:"Product not found"});
  }
})

app.listen(5000,()=>{
    connectDB();
    console.log("Server is running on  5000"); 
})
