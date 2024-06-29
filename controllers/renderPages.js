const {Users} = require("../models/database_controller");
const {Message} = require("../models/database_controller");
const { Op } = require('sequelize');

exports.renderHomePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    let userDate;
    if(userEmail && userName) {
        userDate = await Users.findOne({where: { email: userEmail} });
    }
    
    res.render('homePage', {userDate: userDate, userEmail, userName});
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

    const userDate = await Users.findOne({ where: { email: userEmail }});
    const listUsers = await Users.findAll();
    const userFriends = await Users.findOne({ where: { email: userEmail }});

    const friendsID = userFriends.friends;
    let friendsIDs = JSON.parse(friendsID); 
    console.log(friendsIDs);

    let listFriends = await Users.findAll({ where: { id: friendsIDs }});
    res.render('friendPage', {listUsers: listUsers, listFriends: listFriends, userDate: userDate, userEmail, userName});
};
exports.renderProfilePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userAge = req.session.userAge;

    const userDate = await Users.findOne({ where: { email: userEmail }});
    res.render('profilePage', {userDate:userDate, userEmail, userName, userAge});
};
exports.renderEditDataUser = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userAge = req.session.userAge;

    const userDate = await Users.findOne({ where: { email: userEmail }});
    res.render('editProfilePage', {userDate:userDate, userEmail, userName, userAge});
};
exports.renderProfileContactPage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;

    const contactID = req.body.contactID;

    const contactDate = await Users.findOne({ where: { id: contactID }});
    const userDate = await Users.findOne({where: { email: userEmail} });

    res.render('profileContactPage', {userDate: userDate, contactDate:contactDate, userEmail, userName});
};
exports.renderChatPage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;

    const userFriends = await Users.findOne({ where: { email: userEmail }});
    const userDate = await Users.findOne({where: { email: userEmail} });

    const friendsID = userFriends.friends;
    let friendsIDs = JSON.parse(friendsID); 

    let listFriends = await Users.findAll({ where: { id: friendsIDs }});
    res.render('messagesPage', {userDate: userDate, listFriends: listFriends, userFriends:userFriends, userEmail, userName});
};
exports.renderMessangePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;

    try {
        const friendEmail = req.session.contactEmail;
        const contactEmail = req.body.contactEmail !== undefined ? req.body.contactEmail : friendEmail;
        
        const userDate = await Users.findOne({where: { email: userEmail} });
        const contactData = await Users.findOne({where: { email: contactEmail}});
        const chatMessage = await Message.findAll({  
            where: {
            [Op.or]: [
              { sender: userEmail, recipient: contactEmail },
              { sender: contactEmail, recipient: userEmail }
            ]
          }
        });

        res.render('chatPage', {chatMessage: chatMessage, userDate, contactData, userEmail, userName});   
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");   
    }
};
exports.renderEditMessagePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const messageID = req.body.messageID;

    const userDate = await Users.findOne({where: { email: userEmail} });
    
    const messageData = await Message.findOne({where: { id: messageID} });

    res.render('editMessage', {userDate: userDate, messageData: messageData, userEmail, userName});
};