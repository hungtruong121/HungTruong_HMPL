const express = require('express');
const router = express.Router();
const controller = require('../controller/admin_lotte');

router.route('/').get(controller.checkFoodsFromLotte).post(controller.createFood).put(controller.updateFoods);
router.route('/:id').put(controller.updateFoodWithID).delete(controller.deleteFoodWithID);
router.route('/test').get(controller.test);

module.exports = router;