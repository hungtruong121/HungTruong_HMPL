const express = require('express');
const router = express.Router();
const controller = require('../controller/dish');

router.route('/:id').get(controller.increaseView);

module.exports = router;