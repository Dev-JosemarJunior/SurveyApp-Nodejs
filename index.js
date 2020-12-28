const express = require('express');
// Mongoose is make more easy to work with MongoDB with javascript.
const mongoose = require('mongoose');
// CookieSession is for enable a possibility to use cookie to identify an user.
const cookieSession = require('cookie-session');
// We need to call passport again to 'him' understand we need to work with cookieSession together.
const passport = require('passport');
// These keys require is for keep some information proteced. This file is specified in .gitignore
const keys = require('./config/keys');
// This 'user require' is to use mongoose and mongoDB as our database. All setup and format of collections will be running in this file.
require('./models/User');
// This 'require' bellow just executes the code inside this file. Is not necessary to use a variable to handle it because we will use intere file, like a module.
require('./services/passport');

// Function to connect mongoose with our database on cloud. Important to specify that a token necessary is protected in keys file.
mongoose.connect(keys.mongoURI);

// This is a kind of heart of our application. Express is responsible to comunicate with user by HTTP protocols.
const app = express();

// Here we are instructing Express to use cookie. Maxage specify how much time the cookie will be available. Keys use some keys (in keys file) to generate a encripted cookie.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// Thoose functions are to initialize and authenticates requests telling passport to use cookies to this process. While initialize() begins the process, session() is part of deserializeUser process.
app.use(passport.initialize());
app.use(passport.session());

// This 'require' returns a function inside this file. Just because have only one function, immediately calling this argument (app) means the function will runs with this argument.
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
