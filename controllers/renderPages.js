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
    const userFriends = await Users.findOne({ where: { email: userEmail }});

    const friendsID = userFriends.friends;
    let friendsIDs = JSON.parse(friendsID); 
    console.log(friendsIDs);
    let listFriends = await Users.findAll({ where: { id: friendsIDs }});
    res.render('friendPage', {listUsers: listUsers, listFriends: listFriends, userID, userEmail, userName, userPhone});
};
exports.renderProfilePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;
    const userAge = req.session.userAge;

    const userDate = await Users.findOne({ where: { email: userEmail }});
    res.render('profilePage', {userDate:userDate ,userEmail, userPhone, userName, userAge});
};
exports.renderChatPage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;

    const userFriends = await Users.findOne({ where: { email: userEmail }});

    const friendsID = userFriends.friends;
    let friendsIDs = JSON.parse(friendsID); 

    let listFriends = await Users.findAll({ where: { id: friendsIDs }});
    res.render('messagesPage', {listFriends: listFriends, userFriends:userFriends, userEmail, userName, userPhone});
};
exports.renderMessangePage = function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;
    res.render('chatPage', {userEmail, userName, userPhone});
};