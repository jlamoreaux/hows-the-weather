const express = require('express');
const mainController = require('./controllers/mainController');

const router = express.Router();

router.get('/', mainController.getHomepage);

router.post('/weather', mainController.getWeather);

module.exports = router;
