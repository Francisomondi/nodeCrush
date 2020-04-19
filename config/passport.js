const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (passport)=>{

// implement local strategy
    passport.use(new 
        LocalStrategy({username: 'email'}, (email, password, done) =>{

            const querry = { email: email }; 
            User.findOne(querry, (err, User)=> {
                if (err) {
                     throw err;  
                    }
                if (!User) {
                   return done(null, false, { message: 'Incorrect email.' });
                }

                //match password
                bcrypt.compare(password, User.password, (err,isMatch)=>{
                    if(err)
                    throw err;
                    if(isMatch){
                      return done(null, User);
                    }else{
                        return done(null, false, { message: 'wrong password' });

                    }
                });
                
            });
        }
    ));
    passport.serializeUser( (User, done)=> {
        done(null, User.id);
    });

    passport.deserializeUser( (id, done)=> {
        User.findById(id, (err, User)=> {
            done(err, User);
        });
    });

}