const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');

//user model
 const user = require('../models/user');

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
         res.render('register', {
             errors: errors
         });
         
     }else{
         const newUser = new user({
             name : name,
             username: username,
             email: email,
             password: password
             
         });

         bcrypt = genSalt(10 , (err, salt)=>{
             bcrypt.hash(newUser.password, salt, (err, hash)=>{
                 if(err){
                   console.log(err);
                 }
                 else{
                     newUser.password = hash;
                     newUser.save((err)=>{
                         if(err){
                             console.log(err);
                             return;
                         }
                         else{
                             req.flash('success', 'successfully registered, please log in');
                             res.redirect('/user/login');
                         }

                     });

                 }

             });

         });
         
     }
 });

 router.get('/login', (req,res)=>{
     res.render('./user/login')
 });
 module.exports = router;