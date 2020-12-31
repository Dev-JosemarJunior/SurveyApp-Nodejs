// Production keys here. Those variables are configured on Heroku.
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENTE_ID,
    googleClientSecret: process.env.GOOGLE_CLIENTE_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}