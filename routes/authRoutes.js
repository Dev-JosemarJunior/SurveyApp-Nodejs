const passport = require('passport');

//This handles executes passport logic sending a user to Google page, when will be required from user a authorization to use his Google account information.
module.exports = app =>{
    //First handle send a user to Google page.
    app.get(
        '/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        }
    ))
    
    //Second one returns his information to our server.
    app.get('/auth/google/callback', passport.authenticate('google'));
};
