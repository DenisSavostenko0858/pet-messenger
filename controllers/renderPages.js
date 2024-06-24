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
exports.renderFriendsPage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;
    res.render('friendPage', {userEmail, userName, userPhone});
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