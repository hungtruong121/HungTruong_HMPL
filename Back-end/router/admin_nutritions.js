const express = require('express');
const router = express.Router();
const controller = require('../controller/admin_nutritions');

router.route('/').get(controller.getNutritions).post(controller.addNutrition);
router.route('/:id').put(controller.updateNutrition).delete(controller.deleteNutrition);
router.route('/test').get(controller.test);

module.exports = router;