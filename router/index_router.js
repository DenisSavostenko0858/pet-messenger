const express = require('express');
const rout = express();
const passport = require('passport');

const renderPageController = require('../controllers/renderPages');
const controllerRegister = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const friendController = require('../controllers/friendsController');
const messagesController = require('../controllers/messageController');
const dataUserController = require('../controllers/dataUserController');

rout.get('/', renderPageController.renderHomePage);

rout.get('/register', renderPageController.renderRegisterPage);
rout.post('/register', controllerRegister.registerUsers);

rout.get('/login', renderPageController.renderLoginPage);
rout.post('/login', loginController.loginUser);
rout.get('/logout', loginController.logout);

rout.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
rout.get("/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
);

rout.get('/auth/yandex', passport.authenticate('yandex'), function(req, res){});
rout.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

rout.get('/friend', renderPageController.renderFriendsPage);
rout.post('/addfriend', friendController.addFriends);
rout.post('/dellfriend', friendController.dellFriends);

rout.get('/profile', renderPageController.renderProfilePage);
rout.post('/profile', renderPageController.renderProfilePage);

rout.get('/profileedit', renderPageController.renderEditDataUser);
rout.post('/editdatauser', dataUserController.editDataUser)

rout.post('/profilecontact', renderPageController.renderProfileContactPage);
rout.get('/profilecontact', renderPageController.renderProfileContactPage)

rout.get('/chat', renderPageController.renderChatPage);

rout.post('/message', renderPageController.renderMessangePage);
rout.get('/message', renderPageController.renderMessangePage);

rout.post('/addmessage', messagesController.addMessage);
rout.post('/dellmessage', messagesController.dellMessage);
rout.post('/editmessage', messagesController.editMessage);
 
rout.post('/editpage', renderPageController.renderEditMessagePage);
rout.get('/editpage', renderPageController.renderEditMessagePage);

rout.get('/settings', renderPageController.renderSettingsPage);

module.exports = rout;