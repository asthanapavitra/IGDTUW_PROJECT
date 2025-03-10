const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const db=require('./config/mongoose-config');
const cors=require('cors');
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log("Server is running on port ",port);
})