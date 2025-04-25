const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const subjectController=require('../controllers/subjectController')

router.post("/create-subject",body("name").notEmpty(),body("subject_code").notEmpty(),subjectController.createSubject);
router.get('/all-subjects',subjectController.getAllSubjects);
router.get('/all-departments',subjectController.getAllDepartments);
router.get("/get-subjects/:department/:semNo",subjectController.getSubjects);
module.exports=router;