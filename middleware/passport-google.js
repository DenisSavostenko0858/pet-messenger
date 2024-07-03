const {Users} = require("../models/database_controller");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
function passportFunctionGoogle (passport) {
    passport.serializeUser(async function (req, user, done) {

        const existingUser = await Users.findOne({ where: { email: user.emails[0].value} });
        
        if (existingUser) {
                req.session.userName = existingUser.username;
                req.session.userEmail = existingUser.email;
                
                done(null, existingUser);
        } else {
            const newUser = await Users.create({
                email: user.emails[0].value,
                password: ' ',
                username: user.displayName,
                usersurname: ' ',
                telephone: ' ',
                age: ' ',
                role: "user",
                friends: '[]'
            });

            req.session.userName = newUser.username;
            req.session.userEmail = newUser.email;
            
            done(null, newUser);
            console.log("Google serializing user");
        }
    });
    
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:80/auth/google/callback",
          passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
          console.log(`Получили профиль от Google ${profile.displayName}`);
          return done(null, profile);
        }
      )
    );
  }

module.exports = passportFunctionGoogle;