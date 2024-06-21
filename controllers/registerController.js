const {Users} = require("../models/database_controller");
const bcrypt = require("bcrypt");

exports.registerUsers = async (req, res, next) => {
    if (!req.body ||!req.body.username || !req.body.usersurname || !req.body.telephone || !req.body.email || !req.body.password || !req.body.age) {
        // Error user data is not valid
        return res.status(400).render("partials/errorPages/errorValidRegister");
      }
    try {
        const existingUser = await Users.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            // Error the user is already registered
          return res.render("partials/errorPages/errorDateUserRegister");
        } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const role = "user";
          const newUser = await Users.create({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            usersurname: req.body.usersurname,
            telephone: req.body.telephone,
            age: req.body.age,
            role: role,
          });
          req.session.userEmail = req.body.email;
          req.session.userName = req.body.username;
          console.log("Пользователь создан");
          if (req.session.userEmail && req.session.userName) {
            res.redirect("/");
          } else {
            return res.status(500).send("Ошибка при установке данных в сессию, попробуйте <a href='/login'>войти</a>");
          }
        }
      } catch (error) {
        console.error(error);
        // Error server
        return res.render("partials/errorPages/errorServerRegister");
      }      
};