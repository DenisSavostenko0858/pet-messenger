const {Users} = require("../models/database_controller");
const {Message} = require("../models/database_controller");
const { Op } = require('sequelize');

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
exports.renderProfileContactPage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;

    const contactID = req.body.contactID;

    const contactDate = await Users.findOne({ where: { id: contactID }});
    res.render('profileContactPage', {contactDate:contactDate, userEmail, userPhone, userName});
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
exports.renderMessangePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;

    try {
        const friendEmail = req.session.contactEmail;
        const contactEmail = req.body.contactEmail !== undefined ? req.body.contactEmail : friendEmail;
        
        const userData = await Users.findOne({where: { email: userEmail} });
        const contactData = await Users.findOne({where: { email: contactEmail}});
        const chatMessage = await Message.findAll({  
            where: {
            [Op.or]: [
              { sender: userEmail, recipient: contactEmail },
              { sender: contactEmail, recipient: userEmail }
            ]
          }
        });

        res.render('chatPage', {chatMessage: chatMessage, userData, contactData, userEmail, userName, userPhone});   
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка сервера");   
    }
};
exports.renderEditMessagePage = async function(req, res) {
    const userEmail = req.session.userEmail;
    const userName = req.session.userName;
    const userPhone = req.session.userPhone;

    const messageID = req.body.messageID;
    const messageData = await Message.findOne({where: { id: messageID} });

    res.render('editMessage', {messageData: messageData, userEmail, userName, userPhone});
};