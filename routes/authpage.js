const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const User=require('../models/user');
const passport=require('passport');


router.get('/',(req,res)=>{
    res.render('users/authpage');
});
module.exports=router;