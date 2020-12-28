const passport = require('passport');

// This handles executes passport logic sending a user to Google page, when will be required from user a authorization to use his Google account information.
module.exports = app =>{
    // First handle send a user to Google page.
    app.get(
        '/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    // Second one returns his information to our server.
    app.get('/auth/google/callback', passport.authenticate('google'));
    
    // This rout is responsible to logout user. When is called the user is no more login. Is possible checkout acessing '/api/current_user" and if is blank means that the app shut you down.
    app.get('/api/logout', (req, res) =>{
        req.logout();
        res.send(req.user);
    })

    // Just a test function to we can see some user information from database. If we have information is because the user is logged in. If not he just logged out.
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};
