const {validationResult}=require('express-validator');
const Subject=require('../models/Subject')
module.exports.createSubject=async(req,res)=>{
 try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {name,subject_code}=req.body;
    const subject=await Subject.create({
        name:name,
        subject_code:subject_code
    });
    return res.status(200).json({message:"Subject created successfully",subject});
 }catch(err){
    console.log(err);
    return res.status(500).json({message:"Internal server error"});
 }
}