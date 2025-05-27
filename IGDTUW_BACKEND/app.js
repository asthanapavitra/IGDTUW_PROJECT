const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const app=express();


const db=require('./config/mongoose-config');
const cors=require('cors');
const cookie=require('cookie-parser');
const session = require("express-session");
const flash = require("connect-flash");
const studentRouter=require('./routes/studentRouter')
const updatePasswordRouter=require('./routes/updatePasswordRoute')
const facultyRouter=require('./routes/facultyRouter')
const adminRouter=require('./routes/adminRouter')
const subjectRouter=require('./routes/subjectRouter')
const port=process.env.PORT||5000;


app.use(cookie());
app.use(express.json());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies/auth headers
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if using HTTPS
}));
app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use('/student',studentRouter);
app.use('/update-password',updatePasswordRouter);
app.use('/faculty',facultyRouter);
app.use('/admin',adminRouter);
app.use("/subject",subjectRouter);
app.listen(port,()=>{
    console.log("Server is running on port ",port);
})