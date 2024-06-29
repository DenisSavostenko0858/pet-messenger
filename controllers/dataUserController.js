const {Users} = require("../models/database_controller");
const bcrypt = require("bcrypt");

exports.editDataUser = async (req, res, next) => {
    if (!req.body || !req.body.userID || !req.body.name || !req.body.surname || !req.body.password || !req.body.email || !req.body.telephone) {
        return res.status(400).render("partials/errorPages/errorDataForm");
    }
    try {
        const user = await Users.findOne({ where: { id: req.body.userID } });

        const newDataUser = {
            username: req.body.name,
            usersurname: req.body.surname,
            password: req.body.password,
            email: req.body.email,
            telephone: req.body.telephone,
            about: req.body.about
        }

        user.username = newDataUser.username;
        user.usersurname = newDataUser.usersurname;
        user.password = await bcrypt.hash(newDataUser.password, 10);
        user.email = newDataUser.email;
        user.telephone = newDataUser.telephone;
        user.about = newDataUser.about;

        await user.save();

        console.log(newDataUser.email, ' данные обновлены');

        req.session.userName = newDataUser.username;
        req.session.userEmail = newDataUser.email; 
        req.session.userPhone = newDataUser.telephone; 

        res.redirect('/profile')
    } catch (error) {
        console.error(error);
        return res.status(500).render("partials/errorPages/errorServer");
    }
};