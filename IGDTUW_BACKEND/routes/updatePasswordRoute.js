const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const updatePassword=require('../controllers/updatePassword');
router.get('/',(req,res)=>{
    res.send("From update Password");
})
router.post('/check-email',
    body('email').isEmail().withMessage("Invalid email"),
    body('user').isIn(['student','faculty']).withMessage("Invalid user"),
    updatePassword.checkEmail
)

router.post('/check-security-question',
    body('email').isEmail().withMessage("Invalid email"),
    body('user').isIn(['student','faculty']).withMessage("Invalid user"),
    body('answer').isLength({min:1}).withMessage("Must not be empty"),
    updatePassword.checkSecurityQuestion
)
router.post('/new-password',
    body('email').isEmail().withMessage("Invalid email"),
    body('user').isIn(['student','faculty']).withMessage("Invalid user"),
    body('newPassword').isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    updatePassword.updatePassword
)
module.exports=router;