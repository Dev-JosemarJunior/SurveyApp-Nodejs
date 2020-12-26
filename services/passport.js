const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
//This 'require' here protect some important informations.
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
    //This information will subscribe others inside GoogleStrategy.Strategy objetc. 
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        }, 
        //acessToken = string(i think) containing a token to Google identify this service e authorize us to acess.
        //refreshToken = is something similar to acessToken, however refreshs a solicitation to not broken our service.
        //profile = object returned from Google's server containing informations like first and last name, e-mail e more others. 
        (acessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                //The passport flow is a asynchronous javascript process, it means we need to use then and catch functions. Then() is a function we use when this asynchronous process was well done. Catch() is for cases when we get some error in process. 
                //existingUser is a return variable from findOne function. If there is no user in database, this value will be null, otherwise will be the user object itself.
                .then((existingUser) => {
                    if(existingUser){
                        console.log("server: This user is already created!");
                        //done function is from passport. It reports to the process that after get acessToken, refresh... and profile we will be done, we can close process. Is necessary to call it at the end of this process.
                        done(null, existingUser);
                    } else{
                        //no user with this id, so we can creat a new user in database.
                        new User({ googleId: profile.id})
                        //save is another asynchronous process, so we use catch function to handle with this return sending the value to a objetc called user, that is other instance of User(mongoose model).
                        .save()
                        .then(user => done(null, user));
                    }
                })
        }
    )
);