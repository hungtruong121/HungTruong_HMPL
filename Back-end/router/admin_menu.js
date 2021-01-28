const express = require('express');
const router = express.Router();
const controller = require('../controller/admin_menu');

router.route('/test').get(controller.test);


module.exports = router;