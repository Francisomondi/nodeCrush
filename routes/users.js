const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
 const User = require('../models/user');

 //get from form
 router.get('/register', (req, res)=>{
     res.render('./user/register');

 });

 //register user
 router.post('/register', (req,res)=>{
     const name = req.body.name;
     const username = req.body.username;
     const email = req.body.email;
     const password = req.body.password; 
     const password2 = req.body.password2;

     req.checkBody('name', 'Name is required').notEmpty();
     req.checkBody('email', 'Email is required').notEmpty();
     req.checkBody('email', 'Email is not valid').isEmail();
     req.checkBody('username', 'Username is required').notEmpty();
     req.checkBody('password', 'Password is required').notEmpty();
     req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

     const errors = req.validationErrors();
     if(errors){
         console.log(errors);

         res.render('./user/register', {
             errors,
             name,
             email,
             username,
             password,
             password2
         });
         
     }else{
         const newUser = new User({
             name,
             username,
             email,
             password
             
         });
      //hash password 
         bcrypt.genSalt(10 , (error, salt)=>{
             bcrypt.hash(newUser.password, salt, (error, hash)=>{
                 if(error){
                   throw error;
                 } 
                 else{
                     newUser.password = hash;
                     newUser.save((error)=>{
                         if(error){
                             console.log(error);
                             return;
                         }
                         else{
                             console.log(req.body);
                             req.flash('success', 'successfully registered, please log in');
                             res.redirect('/users/login');
                         }

                     });

                 }

             });

         });
         
     }
 });

 //user login
 router.get('/login', (req,res)=>{
     res.render('./user/login');
 });

router.post('/login',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
}   
);
 module.exports = router;