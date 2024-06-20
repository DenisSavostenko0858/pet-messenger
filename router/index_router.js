const express = require('express');
const rout = express();
const renderPageController = require('../controllers/renderPages');
rout.get('/', renderPageController.renderHomePage);

module.exports = rout;