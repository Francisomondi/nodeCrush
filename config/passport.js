const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = (passport)=>{

// implement local strategy
    passport.use(new LocalStrategy(
         (username, password, done) =>{

            const querry = { username: username } 
            User.findOne(querry, (err, user)=> {
                if (err) {
                     return done(err); 
                    }
                if (!user) {
                   return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}