const { download } = require("express/lib/response");
const {Users} = require("../models/database_controller");
const bcrypt = require("bcrypt");

async function authentificate(dataIsForm, cb) {
    try {
      const user = await Users.findOne({ where: { email: dataIsForm.email } }); 
      if (!user) return cb();
      
      const passwordMatch = await bcrypt.compare(dataIsForm.password, user.password);
      if (passwordMatch) {
        return cb(null, user);
      } else {
        return cb();
      }
    } catch (err) {
      return cb(err);
    }
}
exports.loginUser = (req, res, next) => {
    authentificate(req.body, (error, data) => {
        if (error) return next(error);
        if (!data) {
            res.render("partials/errorPages/errorDateUserLoginPage");
        } else {
            const id = data.id;
            const name = data.username;
            const email = data.email;
            const role = data.role;
            const telephone = data.telephone;
            const age = data.age;
            const surname = data.usersurname;
            const User = {
                userID: id,
                userName: name,
                userEmail: email,
                userRole: role,
                userPhone: telephone,
                userAge: age,
                userSurname: surname
            }
            // Session
            req.session.userID = User.userID;
            req.session.userEmail = User.userEmail;
            req.session.userName = User.userName;
            req.session.userPhone = User.userPhone;
            req.session.userAge = User.userAge;
            req.session.userSurname = User.userSurname;
            console.log("Получили данные от пользователя " + User.userName + " с его почты " + User.userEmail + " и ролью " + User.userRole);
            console.log(req.session.userEmail + " Сессия создана");
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                console.log("Сессия сохранена");
                res.redirect(302, '/');
            });
        }
    });
}; 
exports.logout = function (req, res, next) {
    req.session.destroy((err) => {
      if (err) return next(err);
      console.log("Сессия удалена");
      res.redirect("/");
    });
};