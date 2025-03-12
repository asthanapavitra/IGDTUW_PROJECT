const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const app=express();


const db=require('./config/mongoose-config');
const cors=require('cors');
const cookie=require('cookie-parser');
const studentRouter=require('./routes/studentRouter')


const port=process.env.PORT||5000;


app.use(cookie());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/student',studentRouter);
app.listen(port,()=>{
    console.log("Server is running on port ",port);
})