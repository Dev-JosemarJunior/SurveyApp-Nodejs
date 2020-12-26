const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//This 'user require' is to use mongoose and mongoDB as our database. All setup and format of collections will be running in this file.
require('./models/User');
//This 'require' bellow just executes the code inside this file. Is not necessary to use a variable to handle it because we will use intere file, like a module.
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

//This 'require' returns a function inside this file. Just because have only one function, immediately calling this argument (app) means the function will runs with this argument.
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
