const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const User=require('../models/user');
const passport=require('passport');


router.get('/register',(req,res)=>{
    res.render('users/register');
});
router.post('/register',async(req,res)=>{
    try{
    const{email,username,password}=req.body;
    const user=new User({email,username});
    const registeredUser=await User.register(user,password);
    req.flash('success','Welecome to AuthSite');
    res.redirect('/authpage');
    }catch(e){
        req.flash('error',e.message);
        res.render('/register');
    }
})
router.get('/login',(req,res)=>{
    res.render('users/login');

})
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
    req.flash('success','Welcome back!');
    res.redirect('/authpage');

})
function scheduleLogout(req, res, next) {
    const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
    const lastActive = req.session.lastActive || Date.now();
  
    if (Date.now() - lastActive >= maxSessionAge) {
      req.logout(); // Logout the user
      return res.redirect('/login');
    }
  
    req.session.lastActive = Date.now();
    next();
  }
router.get('/logout',(req,res)=>{
    req.logout(req.user,err=>{
        if(err) return next(err);
        req.flash('success',"GoodBye!!")
        res.redirect('/authpage');
    })
})
router.use(scheduleLogout);
module.exports =router;
