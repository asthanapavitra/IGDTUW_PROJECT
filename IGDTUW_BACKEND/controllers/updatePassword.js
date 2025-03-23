const {validationResult} =require('express-validator');
const Student=require('../models/StudentModel');
const Faculty=require('../models/FacultyModel');
module.exports.checkEmail=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,user}=req.body;
        if(user==='student'){
            let student=await Student.findOne({email});
            if(!student){
                return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
            }
            return res.status(200).json({msg:"Email found",user:student});
        }
        else if(user==='faculty'){
            let faculty=await Faculty.findOne({
                email
            });
            if(!faculty){
                return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
            }
            return res.status(200).json({msg:"Email found",user:faculty});
        }
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}   

module.exports.checkSecurityQuestion=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,user,answer}=req.body;
        if(user==='student'){
            let student=await Student.findOne({email});
            if(!student){
                return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
            }
            if(student.securityQuestion.answer===answer){
                return res.status(200).json({msg:"Question matched"});
            }
            return res.status(400).json({errors:[{msg:"Question did not match"}]});
        }
        else if(user==='faculty'){
            let faculty=await Faculty.findOne({email});
            if(!faculty){
                return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
            }
            if(faculty.securityQuestion.answer===answer){
                return res.status(200).json({msg:"Question matched"});
            }
            return res.status(400).json({errors:[{msg:"Question did not match"}]});
        }
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}
module.exports.updatePassword=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const {email,user,newPassword}=req.body;
        if(user==='student'){
            let student=await Student.findOne({email}).select("+password");
            if(!student){
                return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
            }
            student.password=await Student.hashPassword(newPassword);
            student.save();
           
            return res.status(200).json({msg:"Password updated"});
        }
        else if(user==='faculty'){
            let faculty=await Faculty.findOne({email}).select('+password');
            if(!faculty){
                return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
            }
            faculty.password=await Faculty.hashPassword(password);
            faculty.save();
            return res.status(200).json({msg:"Password updated"});
        }
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}