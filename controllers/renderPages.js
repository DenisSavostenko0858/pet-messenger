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