const {Users} = require("../models/database_controller");
exports.renderHomePage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;
    res.render('homePage', {userEmail, userName, userPhone});
};
exports.renderRegisterPage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    res.render('registerPage', {userEmail, userName});
};
exports.renderLoginPage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    res.render('loginPage', {userEmail, userName});
};
exports.renderFriendsPage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;
    const userID = req.session.userID;
    const listUsers = await Users.findAll();
    res.render('friendPage', {listUsers:listUsers, userID, userEmail, userName, userPhone});
};
exports.renderProfilePage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;
    const userAge = req.session.userAge;
    const userSurname = req.session.userSurname;
    const userStatus = req.session.userStatus;
    res.render('profilePage', {userEmail, userName, userPhone, userAge, userSurname, userStatus});
};