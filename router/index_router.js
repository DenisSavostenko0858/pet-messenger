const express = require('express');
const rout = express();
const renderPageController = require('../controllers/renderPages');
const controllerRegister = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const friendController = require('../controllers/friendsController');

rout.get('/', renderPageController.renderHomePage);

rout.get('/register', renderPageController.renderRegisterPage);
rout.post('/register', controllerRegister.registerUsers);

rout.get('/login', renderPageController.renderLoginPage);
rout.post('/login', loginController.loginUser);
rout.get('/logout', loginController.logout);

rout.get('/friend', renderPageController.renderFriendsPage);
rout.post('/addfriend', friendController.addFriends);
rout.post('/dellfriend', friendController.dellFriends);

rout.get('/profile', renderPageController.renderProfilePage);

rout.get('/chat', renderPageController.renderChatPage);

module.exports = rout;