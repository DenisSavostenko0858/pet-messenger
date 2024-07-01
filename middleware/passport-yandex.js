const {Users} = require("../models/database_controller");
const YandexStrategy = require("passport-yandex").Strategy;
require('dotenv').config();

function passportFunctionYandex(passport){
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
        });

        req.session.userName = newUser.username;
        req.session.userEmail = newUser.email;
        
        done(null, newUser);
        console.log("Google serializing user");
    }
  });

  passport.deserializeUser(function(obj, done) {
      done(null, obj);
  });

  passport.use(
    new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:80/auth/yandex/callback"
    },
    function(accessToken, refreshToken, profile, done){
        console.log("Получили профиль от Яндекса: " + profile.displayName);
        return done(null, profile);
    })
  );
}

module.exports = passportFunctionYandex;