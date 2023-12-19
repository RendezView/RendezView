const express = require('express');

const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/', eventController.addEvent);

module.exports = router;
