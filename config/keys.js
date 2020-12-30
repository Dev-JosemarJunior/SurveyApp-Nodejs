// FIle to control how our project will set up keys to prod and dev mode.
// Some logic to confirm we are in production or in dev ambient.
if (process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else{
    module.exports = require('./dev');
}