const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const subjectController=require('../controllers/subjectController')

router.post("/create-subject",body("name").notEmpty(),body("subject_code").notEmpty(),subjectController.createSubject);
module.exports=router;