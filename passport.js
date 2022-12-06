const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {User} = require("./models/userModel");


require('dotenv').config()
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, callback) => {
      const userExists = await User.findOne({id:profile.id})

      if (userExists) {
        return callback(null, {...userExists});
      }
      const newUser = await User.create({
        id: profile.id,
        email: profile.emails[0].value,
      });

      return callback(null, {...newUser});

     
    }
  )
);
module.exports = passport