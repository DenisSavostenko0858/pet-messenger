exports.renderHomePage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    res.render('homePage', {userEmail, userName});
};